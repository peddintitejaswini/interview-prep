import type { JobDescription, RoadmapItem } from "@/types";
import { chatSession } from ".";

export const generateRoadmapPrompt = (
  jd: JobDescription,
  daysRemaining: number,
) => {
  const weeks = Math.ceil(daysRemaining / 7);

  return `
As an expert career advisor and technical mentor, create a detailed learning roadmap for the following job position.

Job Details:
- Position: ${jd.title}
- Job Description: ${jd.description}
- Required Tech Stack: ${jd.techStack}
- Experience Required: ${jd.experience || "Not specified"} years

Available Time: ${daysRemaining} days (approximately ${weeks} weeks)

Generate a JSON array of learning milestones structured as follows:
[
  {
    "week": 1,
    "topic": "Topic name",
    "subtopics": ["subtopic1", "subtopic2", "subtopic3"],
    "estimatedHours": 10,
    "priority": "high",
    "resources": ["general recommendation 1", "general recommendation 2"]
  },
  ...
]

Requirements:
1. Prioritize skills mentioned in the job description
2. Distribute learning logically across ${weeks} weeks
3. Start with fundamentals, progress to advanced topics
4. Include practical projects/exercises as topics
5. Allocate realistic time estimates (consider 10-15 hours per week)
6. Mark critical skills from the JD as "high" priority
7. Mark nice-to-have skills as "medium" or "low" priority
8. Include at least 2-3 resources per topic (books, courses, documentation)
9. Ensure each week has manageable content

Return ONLY the JSON array without code blocks, markdown formatting, or additional text.
  `.trim();
};

export const parseRoadmapResponse = (response: string): RoadmapItem[] => {
  // Clean the AI response similar to mock interview question parsing
  let cleanText = response.trim();

  // Remove any occurrences of "json" or code block symbols
  cleanText = cleanText.replace(/(json|```|`)/g, "");

  // Extract JSON array by capturing text between square brackets
  const jsonArrayMatch = cleanText.match(/\[.*\]/s);
  if (!jsonArrayMatch) {
    throw new Error("No JSON array found in AI response");
  }

  cleanText = jsonArrayMatch[0];

  // Parse the clean JSON text into an array of objects
  try {
    const parsed = JSON.parse(cleanText);

    // Validate the structure
    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array");
    }

    // Basic validation for each item
    parsed.forEach((item, index) => {
      if (
        !item.topic ||
        !item.subtopics ||
        !item.estimatedHours ||
        !item.priority
      ) {
        throw new Error(
          `Invalid roadmap item at index ${index}: missing required fields`,
        );
      }
    });

    return parsed as RoadmapItem[];
  } catch (error) {
    throw new Error("Invalid JSON format: " + (error as Error)?.message);
  }
};

export const generateRoadmap = async (
  jd: JobDescription,
  daysRemaining: number,
): Promise<RoadmapItem[]> => {
  const prompt = generateRoadmapPrompt(jd, daysRemaining);
  const aiResult = await chatSession.sendMessage(prompt);
  const cleanedResponse = parseRoadmapResponse(aiResult.response.text());
  return cleanedResponse;
};
