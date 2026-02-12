import type { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tool-tip-button";
import { Pencil, Newspaper, Sparkles, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import DeleteModal from "./delete-modal";
import { deleteInterview } from "@/handlers/interview-operations";
import { toast } from "sonner";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteInterview(interview.id);
      toast.success("Interview deleted successfully");
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <Card className="p-6 rounded-xl border-2 border-gray-150 shadow-sm hover:shadow-md transition-all hover:border-primary/50 flex flex-col h-[280px] gap-3 relative group">
        {/* Delete Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>

        {/* Title */}
        <div className="flex-shrink-0 pr-8">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {interview?.position}
          </CardTitle>
        </div>

        {/* Description */}
        <div className="flex-grow min-h-0">
          <CardDescription
            className="line-clamp-3 cursor-pointer hover:text-gray-700 transition-colors text-sm leading-relaxed"
            onClick={() => setIsModalOpen(true)}
          >
            {interview?.description}
          </CardDescription>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex-shrink-0 w-full flex items-center gap-1.5 flex-wrap overflow-hidden max-h-[56px]">
          {interview?.techStack.split(",").map((word, index) => (
            <Badge
              key={index}
              variant={"outline"}
              className="text-xs px-2.5 py-0.5 text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
            >
              {word.trim()}
            </Badge>
          ))}
        </div>

        <CardFooter
          className={cn(
            "w-full flex items-center p-0 flex-shrink-0",
            onMockPage ? "justify-end" : "justify-between",
          )}
        >
          <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
            {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
              "en-US",
              { timeStyle: "short" },
            )}`}
          </p>

          {!onMockPage && (
            <div className="flex items-center gap-2">
              <TooltipButton
                content="Edit"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/dashboard/generate/${interview?.id}`);
                }}
                disbaled={false}
                buttonClassName="hover:bg-gray-100 hover:text-gray-700"
                icon={<Pencil className="w-4 h-4" />}
                loading={false}
              />

              <TooltipButton
                content="Feedback"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/dashboard/generate/feedback/${interview?.id}`);
                }}
                disbaled={false}
                buttonClassName="hover:bg-gray-100 hover:text-gray-700"
                icon={<Newspaper className="w-4 h-4" />}
                loading={false}
              />

              <Button
                size="sm"
                onClick={() => {
                  navigate(`/dashboard/generate/interview/${interview?.id}`);
                }}
                className="h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 text-xs gap-1.5 relative overflow-hidden group shadow-sm"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <Sparkles className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10 font-medium">Generate</span>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {interview?.position}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {`Created on ${new Date(
                interview?.createdAt.toDate(),
              ).toLocaleDateString("en-US", { dateStyle: "long" })}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {interview?.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tech Stack</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {interview?.techStack.split(",").map((word, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className="text-xs text-muted-foreground border-emerald-400 bg-emerald-50 text-emerald-900"
                  >
                    {word}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
