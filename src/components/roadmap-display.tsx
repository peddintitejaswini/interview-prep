import type { Roadmap } from "@/types";
import {
  Clock,
  Calendar,
  BookOpen,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface RoadmapDisplayProps {
  roadmap: Roadmap;
}

const priorityConfig = {
  high: { color: "bg-red-500", label: "High Priority", icon: TrendingUp },
  medium: { color: "bg-yellow-500", label: "Medium Priority", icon: BookOpen },
  low: { color: "bg-green-500", label: "Low Priority", icon: CheckCircle2 },
};

const RoadmapDisplay = ({ roadmap }: RoadmapDisplayProps) => {
  // Group roadmap items by week if they have week numbers
  const itemsByWeek = roadmap.roadmapItems.reduce(
    (acc, item) => {
      const week = item.week || 0;
      if (!acc[week]) {
        acc[week] = [];
      }
      acc[week].push(item);
      return acc;
    },
    {} as Record<number, typeof roadmap.roadmapItems>,
  );

  const weeks = Object.keys(itemsByWeek)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* Roadmap Header */}
      <div className="p-6 rounded-lg border bg-gradient-to-r from-primary/10 via-primary/5 to-background shadow-md">
        <h3 className="text-2xl font-bold mb-4">{roadmap.jobTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-semibold">{roadmap.totalWeeks} weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Days:</span>
            <span className="font-semibold">{roadmap.timeRemaining} days</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Topics:</span>
            <span className="font-semibold">{roadmap.roadmapItems.length}</span>
          </div>
        </div>
      </div>

      {/* Week-by-Week Breakdown */}
      <div className="space-y-4">
        {weeks.map((weekNum) => {
          const items = itemsByWeek[weekNum];
          const totalHours = items.reduce(
            (sum, item) => sum + item.estimatedHours,
            0,
          );

          return (
            <div
              key={weekNum}
              className="border rounded-lg overflow-hidden shadow-sm bg-card"
            >
              {/* Week Header */}
              <div className="bg-muted/50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">
                    {weekNum === 0 ? "General Topics" : `Week ${weekNum}`}
                  </h4>
                  <Badge variant="secondary">
                    {totalHours} {totalHours === 1 ? "hour" : "hours"}
                  </Badge>
                </div>
              </div>

              {/* Topics */}
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => {
                  const priorityInfo = priorityConfig[item.priority];
                  const Icon = priorityInfo.icon;

                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${weekNum}-${index}`}
                    >
                      <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/30">
                        <div className="flex items-center gap-3 w-full text-left">
                          <div
                            className={`h-2 w-2 rounded-full ${priorityInfo.color}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{item.topic}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-auto mr-4">
                            {item.estimatedHours}h
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-4 pt-2">
                          {/* Subtopics */}
                          {item.subtopics && item.subtopics.length > 0 && (
                            <div>
                              <h5 className="text-sm font-semibold text-muted-foreground mb-2">
                                What to Learn:
                              </h5>
                              <ul className="space-y-1">
                                {item.subtopics.map((subtopic, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-start gap-2"
                                  >
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{subtopic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Resources */}
                          {item.resources && item.resources.length > 0 && (
                            <div>
                              <h5 className="text-sm font-semibold text-muted-foreground mb-2">
                                Resources:
                              </h5>
                              <ul className="space-y-1">
                                {item.resources.map((resource, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-start gap-2"
                                  >
                                    <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span>{resource}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Priority Badge */}
                          <div className="pt-2">
                            <Badge variant="secondary" className="text-xs">
                              {priorityInfo.label}
                            </Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapDisplay;
