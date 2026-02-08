import { FileText, Construction } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillGapPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Skill Gap Analysis
        </h2>
        <p className="text-muted-foreground mt-2">
          Compare your resume with job descriptions to identify skill gaps
        </p>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-amber-500" />
            <CardTitle>Feature Under Development</CardTitle>
          </div>
          <CardDescription>
            This feature is currently being developed and will be available
            soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground max-w-md mb-4">
              Upload your resume and job descriptions to get personalized skill
              gap analysis and improvement suggestions.
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Badge variant="secondary">Resume Analysis</Badge>
              <Badge variant="secondary">Skill Matching</Badge>
              <Badge variant="secondary">Gap Identification</Badge>
              <Badge variant="secondary">Improvement Tips</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillGapPage;
