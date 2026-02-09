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
import FormJd from "./form-jd";
import { Badge } from "./ui/badge";

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
    <div className="space-y-4">
      {/* Selected JD Display */}
      {selectedJD && (
        <div className="p-6 rounded-lg border bg-card shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{selectedJD.title}</h3>
            </div>
            <Badge
              variant={selectedJD.source === "manual" ? "default" : "secondary"}
            >
              {selectedJD.source === "manual" ? "Manual" : "From Interview"}
            </Badge>
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

      {/* Selection Buttons */}
      <div className="flex flex-wrap gap-4">
        {/* Select from Interviews */}
        <Dialog
          open={showInterviewDialog}
          onOpenChange={setShowInterviewDialog}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="lg">
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
            <Button size="lg">
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
    </div>
  );
};

export default JdSelector;
