import { useState } from "react";
import type { Interview, JobDescription } from "@/types";
import { Button } from "./ui/button";
import { Plus, FileText, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";
// import FormJd from "./form-jd";
import { Badge } from "./ui/badge";
import FormJd from "./form-jd";

interface JdSelectorProps {
  interviews: Interview[];
  loading: boolean;
  onSelectFromInterview: (interview: Interview) => void;
  onCreateManual: (jdData: {
    title: string;
    description: string;
    techStack: string;
    experience: number;
  }) => void;
  selectedJD: JobDescription | null;
}

const JdSelector = ({
  interviews,
  loading,
  onSelectFromInterview,
  onCreateManual,
  selectedJD,
}: JdSelectorProps) => {
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);
  const [showManualDialog, setShowManualDialog] = useState(false);

  const handleInterviewSelect = (interview: Interview) => {
    onSelectFromInterview(interview);
    setShowInterviewDialog(false);
  };

  const handleManualCreate = (jdData: {
    title: string;
    description: string;
    techStack: string;
    experience: number;
  }) => {
    onCreateManual(jdData);
    setShowManualDialog(false);
  };

  return (
    <>
      {/* Compact Action Buttons for top-right placement */}
      <div className="flex gap-2">
        {/* Select from Interviews */}
        <Dialog
          open={showInterviewDialog}
          onOpenChange={setShowInterviewDialog}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Select from Interviews
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select from Existing Interviews</DialogTitle>
              <DialogDescription>
                Choose an interview to use as the job description for your
                roadmap
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 w-full" />
                ))
              ) : interviews.length > 0 ? (
                interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer bg-card"
                    onClick={() => handleInterviewSelect(interview)}
                  >
                    <h4 className="font-semibold text-lg mb-2">
                      {interview.position}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {interview.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{interview.techStack}</Badge>
                      <Badge variant="outline">
                        {interview.experience} years
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>
                    No interviews found. Create one in the Mock Interview
                    section first.
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Manual JD */}
        <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New JD
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Description</DialogTitle>
              <DialogDescription>
                Enter the job description details to generate a personalized
                roadmap
              </DialogDescription>
            </DialogHeader>

            <FormJd
              onSubmit={handleManualCreate}
              onCancel={() => setShowManualDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default JdSelector;
