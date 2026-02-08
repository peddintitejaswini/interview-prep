import { Map, Construction } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoadmapPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Learning Roadmap
        </h2>
        <p className="text-muted-foreground mt-2">
          Get personalized learning paths to enhance your skills
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
            <Map className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground max-w-md mb-4">
              Receive customized learning roadmaps based on your current skills
              and career goals. Track your progress and achieve your
              professional objectives.
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Badge variant="secondary">Personalized Paths</Badge>
              <Badge variant="secondary">Progress Tracking</Badge>
              <Badge variant="secondary">Resource Recommendations</Badge>
              <Badge variant="secondary">Milestone Goals</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapPage;
