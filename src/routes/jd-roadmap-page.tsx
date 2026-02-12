import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import type { Interview, JobDescription, Roadmap } from "@/types";
import Headings from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";
// import JdSelector from "@/components/jd-selector";
// import RoadmapDisplay from "@/components/roadmap-display";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { createJD } from "@/handlers/jd-operations";
import {
  createRoadmap,
  fetchUserRoadmaps,
} from "@/handlers/roadmap-operations";
import { generateRoadmap } from "@/scripts/roadmap-generator";
import { extractTechStack } from "@/scripts/tech-stack-extractor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import RoadmapCard from "@/components/roadmap-card";
import { Skeleton } from "@/components/ui/skeleton";
import RoadmapCard from "@/components/roadmap-card";
import JdSelector from "@/components/jd-selector";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JdRoadmapPage = () => {
  const { userId } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedJD, setSelectedJD] = useState<JobDescription | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(30);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(true);
  const [sortBy, setSortBy] = useState<string>("recent");

  // Fetch user's interviews
  useEffect(() => {
    if (!userId) return;

    setLoadingInterviews(true);
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId),
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Interview[];
        setInterviews(interviewList);
        setLoadingInterviews(false);
      },
      (error) => {
        console.error("Error fetching interviews:", error);
        toast.error("Error loading interviews");
        setLoadingInterviews(false);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  // Fetch user's roadmaps
  useEffect(() => {
    if (!userId) return;

    setLoadingRoadmaps(true);
    const unsubscribe = fetchUserRoadmaps(
      userId,
      (roadmapList) => {
        setRoadmaps(roadmapList);
        setLoadingRoadmaps(false);
      },
      (error) => {
        toast.error("Error loading roadmaps");
        console.log(error.message);
        setLoadingRoadmaps(false);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  // Sort roadmaps based on selected option
  const sortedRoadmaps = useMemo(() => {
    const sorted = [...roadmaps];

    switch (sortBy) {
      case "recent":
        return sorted.sort((a, b) => {
          const aTime = a.createdAt as any;
          const bTime = b.createdAt as any;
          return (bTime?.seconds || 0) - (aTime?.seconds || 0);
        });
      case "time-asc":
        return sorted.sort((a, b) => a.timeRemaining - b.timeRemaining);
      case "time-desc":
        return sorted.sort((a, b) => b.timeRemaining - a.timeRemaining);
      case "alpha":
        return sorted.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      default:
        return sorted;
    }
  }, [roadmaps, sortBy]);

  const handleSelectFromInterview = async (interview: Interview) => {
    try {
      // Create a new JD from the selected interview
      const jdId = await createJD({
        title: interview.position,
        description: interview.description,
        techStack: interview.techStack,
        experience: interview.experience,
        source: "interview",
        interviewId: interview.id,
        userId: userId!,
      });

      setSelectedJD({
        id: jdId,
        title: interview.position,
        description: interview.description,
        techStack: interview.techStack,
        experience: interview.experience,
        source: "interview",
        interviewId: interview.id,
        userId: userId!,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      });

      toast.success("Job description selected");
    } catch (error) {
      console.error("Error creating JD:", error);
      toast.error("Failed to select job description");
    }
  };

  const handleCreateManualJD = async (jdData: {
    title: string;
    description: string;
    experience: number;
    daysRemaining: number;
  }) => {
    try {
      setLoading(true);
      toast.loading("Extracting tech stack from job description...", {
        id: "extract-tech",
      });

      // Extract tech stack from description using AI
      const techStack = await extractTechStack(jdData.description);

      toast.success("Tech stack extracted successfully!", {
        id: "extract-tech",
      });

      const jdId = await createJD({
        title: jdData.title,
        description: jdData.description,
        techStack: techStack,
        experience: jdData.experience,
        source: "manual",
        userId: userId!,
      });

      const newJD: JobDescription = {
        id: jdId,
        title: jdData.title,
        description: jdData.description,
        techStack: techStack,
        experience: jdData.experience,
        source: "manual",
        userId: userId!,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      };

      setSelectedJD(newJD);
      setDaysRemaining(jdData.daysRemaining);

      toast.success("Job description created");

      // Auto-generate roadmap after JD creation
      await handleGenerateRoadmapWithJD(newJD, jdData.daysRemaining);
    } catch (error) {
      console.error("Error creating JD:", error);
      toast.error("Failed to create job description");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!selectedJD || !userId) return;
    await handleGenerateRoadmapWithJD(selectedJD, daysRemaining);
  };

  const handleGenerateRoadmapWithJD = async (
    jd: JobDescription,
    days: number,
  ) => {
    if (!userId) return;

    try {
      setLoading(true);
      toast.loading("Generating roadmap...", { id: "roadmap-gen" });

      // Generate roadmap using AI
      const roadmapItems = await generateRoadmap(jd, days);

      // Calculate total weeks
      const totalWeeks = Math.ceil(days / 7);

      // Save to Firebase
      await createRoadmap({
        jdId: jd.id,
        userId,
        totalWeeks,
        timeRemaining: days,
        roadmapItems,
        jobTitle: jd.title,
      });

      toast.success("Roadmap generated successfully!", { id: "roadmap-gen" });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error("Failed to generate roadmap. Please try again.", {
        id: "roadmap-gen",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header with Actions */}
      <div className="flex w-full items-start justify-between gap-4">
        <Headings
          title="JD to Roadmap"
          description="Generate personalized learning roadmaps from job descriptions"
        />

        {/* Action Buttons - Top Right */}
        <div className="flex gap-2 pt-1">
          <JdSelector
            interviews={interviews}
            loading={loadingInterviews}
            onSelectFromInterview={handleSelectFromInterview}
            onCreateManual={handleCreateManualJD}
            selectedJD={selectedJD}
            generating={loading}
          />
        </div>
      </div>
      {/* <Separator className="my-8" /> */}

      {/* Selected JD Display - Only for Interview-selected JDs */}
      {selectedJD && selectedJD.source === "interview" && (
        <div className="mb-8 p-6 rounded-lg border bg-card shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{selectedJD.title}</h3>
            </div>
            <Badge variant="secondary">From Interview</Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">
                Description:{" "}
              </span>
              <p className="mt-1 text-foreground line-clamp-3">
                {selectedJD.description}
              </p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">
                Tech Stack:{" "}
              </span>
              <span className="text-foreground">{selectedJD.techStack}</span>
            </div>
            {selectedJD.experience > 0 && (
              <div>
                <span className="font-medium text-muted-foreground">
                  Experience:{" "}
                </span>
                <span className="text-foreground">
                  {selectedJD.experience} years
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Time Input & Generate Section - Only for Interview-selected JDs */}
      {selectedJD && selectedJD.source === "interview" && (
        <div className="mb-8 p-6 rounded-lg shadow-md border bg-card">
          <h2 className="text-xl font-semibold mb-4">
            Step 2: Set Timeline & Generate
          </h2>

          <div className="space-y-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="days-remaining">Time Available (Days)</Label>
              <Input
                id="days-remaining"
                type="number"
                min="7"
                max="365"
                value={daysRemaining}
                onChange={(e) => setDaysRemaining(Number(e.target.value))}
                placeholder="e.g., 60"
                className="h-12 mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Approximately {Math.ceil(daysRemaining / 7)} weeks
              </p>
            </div>

            <Button
              onClick={handleGenerateRoadmap}
              disabled={loading || !selectedJD}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Roadmap
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Previous Roadmaps */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Roadmaps</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="time-asc">Least Time Remaining</SelectItem>
                <SelectItem value="time-desc">Most Time Remaining</SelectItem>
                <SelectItem value="alpha">Alphabetical (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {loadingRoadmaps ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : sortedRoadmaps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <img
              src="/assets/svg/not-found.svg"
              className="w-32 h-32 object-contain mb-4"
              alt="No roadmaps"
            />
            <p className="text-muted-foreground">
              No roadmaps yet. Create your first one above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JdRoadmapPage;
