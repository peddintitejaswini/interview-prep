import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import type { Interview, JobDescription, Roadmap } from "@/types";
import Headings from "@/components/headings";
import { Separator } from "@/components/ui/separator";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import RoadmapCard from "@/components/roadmap-card";
import { Skeleton } from "@/components/ui/skeleton";
import RoadmapCard from "@/components/roadmap-card";
import JdSelector from "@/components/jd-selector";

const JdRoadmapPage = () => {
  const { userId } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedJD, setSelectedJD] = useState<JobDescription | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(30);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(true);

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
    techStack: string;
    experience: number;
  }) => {
    try {
      const jdId = await createJD({
        ...jdData,
        source: "manual",
        userId: userId!,
      });

      setSelectedJD({
        id: jdId,
        ...jdData,
        source: "manual",
        userId: userId!,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
      });

      toast.success("Job description created");
    } catch (error) {
      console.error("Error creating JD:", error);
      toast.error("Failed to create job description");
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!selectedJD || !userId) return;

    try {
      setLoading(true);
      toast.loading("Generating roadmap...", { id: "roadmap-gen" });

      // Generate roadmap using AI
      const roadmapItems = await generateRoadmap(selectedJD, daysRemaining);

      // Calculate total weeks
      const totalWeeks = Math.ceil(daysRemaining / 7);

      // Save to Firebase
      const roadmapId = await createRoadmap({
        jdId: selectedJD.id,
        userId,
        totalWeeks,
        timeRemaining: daysRemaining,
        roadmapItems,
        jobTitle: selectedJD.title,
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
      <div className="flex w-full items-center justify-between">
        <Headings
          title="JD to Roadmap"
          description="Generate personalized learning roadmaps from job descriptions"
        />
      </div>
      <Separator className="my-8" />

      {/* JD Selection Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Step 1: Select or Create Job Description
        </h2>
        <JdSelector
          interviews={interviews}
          loading={loadingInterviews}
          onSelectFromInterview={handleSelectFromInterview}
          onCreateManual={handleCreateManualJD}
          selectedJD={selectedJD}
        />
      </div>

      {/* Time Input & Generate Section */}
      {selectedJD && (
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
        <h2 className="text-xl font-semibold mb-4">Your Roadmaps</h2>
        {loadingRoadmaps ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : roadmaps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmaps.map((roadmap) => (
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
