import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoadmapById } from "@/handlers/roadmap-operations";
import type { Roadmap } from "@/types";
import RoadmapDisplay from "@/components/roadmap-display";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { toast } from "sonner";

const RoadmapDetailPage = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!roadmapId) {
        toast.error("Invalid roadmap ID");
        navigate("/dashboard/jd-roadmap");
        return;
      }

      try {
        setLoading(true);
        const data = await getRoadmapById(roadmapId);

        if (!data) {
          toast.error("Roadmap not found");
          navigate("/dashboard/jd-roadmap");
          return;
        }

        setRoadmap(data);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        toast.error("Failed to load roadmap");
        navigate("/dashboard/jd-roadmap");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId, navigate]);

  const handleBack = () => {
    navigate("/dashboard/jd-roadmap");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={handleBack}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roadmaps
        </Button>
      </div>

      {/* Roadmap Display */}
      <RoadmapDisplay roadmap={roadmap} />
    </div>
  );
};

export default RoadmapDetailPage;
