import { chatSession } from ".";

/**
 * Extracts tech stack from a job description using AI
 */
export const extractTechStack = async (
  jobDescription: string,
): Promise<string> => {
  const prompt = `
Extract all technical skills, programming languages, frameworks, tools, and technologies from the following job description.
Return them as a comma-separated list, without any additional text or formatting.

Job Description:
${jobDescription}

Requirements:
1. Include programming languages (e.g., JavaScript, Python, Java)
2. Include frameworks and libraries (e.g., React, Node.js, Django)
3. Include databases (e.g., PostgreSQL, MongoDB, MySQL)
4. Include tools and platforms (e.g., Docker, AWS, Git)
5. Include methodologies if mentioned (e.g., Agile, Scrum)
6. Return ONLY the comma-separated list
7. If no tech stack is found, return "General Software Development"

Example output format: React, TypeScript, Node.js, PostgreSQL, AWS, Docker, Git
  `.trim();

  try {
    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text();

    // Clean up the response
    const techStack = response
      .trim()
      .replace(/^["']|["']$/g, "") // Remove quotes if present
      .replace(/\n/g, ", ") // Replace newlines with commas
      .replace(/,\s*,/g, ",") // Remove double commas
      .trim();

    return techStack || "General Software Development";
  } catch (error) {
    console.error("Error extracting tech stack:", error);
    return "General Software Development";
  }
};
