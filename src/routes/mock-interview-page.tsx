/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoaderPage from "./loader-page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import CustomBreadCrumb from "@/components/custom-bread-crumb";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, XCircle } from "lucide-react";
import QuestionSection from "../components/question-section";
const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [showEndTestDialog, setShowEndTestDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  const handleEndTest = () => {
    setShowEndTestDialog(false);
    navigate(`/dashboard/generate/feedback/${interviewId}`);
  };

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (!interviewId) {
    navigate("/dashboard/generate", { replace: true });
  }

  if (!interview) {
    navigate("/dashboard/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumbItems={[
          { label: "Mock Interviews", link: "/dashboard/generate" },
          {
            label: interview?.position || "",
            link: `/dashboard/generate/interview/${interview?.id}`,
          },
        ]}
      />

      {/* End Test Button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowEndTestDialog(true)}
          className="gap-2"
        >
          <XCircle className="h-4 w-4" />
          End Test
        </Button>
      </div>

      <div className="w-full">
        <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-sky-600" />
          <div>
            <AlertTitle className="text-sky-800 font-semibold">
              Important Note
            </AlertTitle>
            <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
              Press "Record Answer" to begin answering the question. Once you
              finish the interview, you&apos;ll receive feedback comparing your
              responses with the ideal answers.
              <br />
              {/* <br /> */}
              <strong>Note:</strong>{" "}
              <span className="font-medium">Your video is never recorded.</span>{" "}
              You can disable the webcam anytime if preferred.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}

      {/* End Test Confirmation Dialog */}
      <AlertDialog open={showEndTestDialog} onOpenChange={setShowEndTestDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Test Early?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to end this test? You will be redirected
                to the feedback page.
              </p>
              <p className="text-amber-600 font-medium">
                ⚠️ Any unanswered questions will not be graded.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEndTest}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              End & View Feedback
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MockInterviewPage;
