import type { Roadmap } from "@/types";
import { Calendar, Clock, Trash2, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./delete-modal";
import { deleteRoadmap } from "@/handlers/roadmap-operations";
import { toast } from "sonner";

interface RoadmapCardProps {
  roadmap: Roadmap;
}

const RoadmapCard = ({ roadmap }: RoadmapCardProps) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteRoadmap(roadmap.id);
      toast.success("Roadmap deleted successfully");
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      toast.error("Failed to delete roadmap");
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleViewRoadmap = () => {
    navigate(`/dashboard/jd-roadmap/${roadmap.id}`);
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <div className="p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-all hover:border-primary/50 relative group">
        {/* Delete Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg pr-8 line-clamp-2">
            {roadmap.jobTitle}
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Generated: {formatDate(roadmap.generatedDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {roadmap.totalWeeks} weeks ({roadmap.timeRemaining} days)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Badge variant="secondary">
              {roadmap.roadmapItems.length} topics
            </Badge>
          </div>
        </div>

        {/* View Button */}
        <Button
          onClick={handleViewRoadmap}
          className="w-full mt-4"
          variant="outline"
          size="sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Roadmap
        </Button>
      </div>
    </>
  );
};

export default RoadmapCard;
