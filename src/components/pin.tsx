import type { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tool-tip-button";
import { Eye, Newspaper, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

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

  return (
    <>
      <Card className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-100 transition-all flex flex-col h-[260px]">
        <div className="flex-shrink-0">
          <CardTitle className="text-lg mb-1.5">
            {interview?.position}
          </CardTitle>
        </div>
        <div className="flex-grow min-h-0 mb-2">
          <CardDescription
            className="line-clamp-3 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {interview?.description}
          </CardDescription>
        </div>
        <div className="flex-shrink-0 w-full flex items-center gap-2 flex-wrap mb-2">
          {interview?.techStack.split(",").map((word, index) => (
            <Badge
              key={index}
              variant={"outline"}
              className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
            >
              {word}
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
              { dateStyle: "long" },
            )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
              "en-US",
              { timeStyle: "short" },
            )}`}
          </p>

          {!onMockPage && (
            <div className="flex items-center justify-center">
              <TooltipButton
                content="View"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/generate/${interview?.id}`);
                }}
                disbaled={false}
                buttonClassName="hover:text-sky-500"
                icon={<Eye />}
                loading={false}
              />

              <TooltipButton
                content="Feedback"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/generate/feedback/${interview?.id}`);
                }}
                disbaled={false}
                buttonClassName="hover:text-yellow-500"
                icon={<Newspaper />}
                loading={false}
              />

              <TooltipButton
                content="Start"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/generate/interview/${interview?.id}`);
                }}
                disbaled={false}
                buttonClassName="hover:text-sky-500"
                icon={<Sparkles />}
                loading={false}
              />
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
