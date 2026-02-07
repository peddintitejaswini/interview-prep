import Headings from "@/components/headings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  MessageSquare,
  TrendingUp,
  BookOpen,
  FileText,
  Sparkles,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      icon: Brain,
      title: "AI-Powered Mock Interviews",
      description:
        "Experience realistic interview scenarios powered by advanced artificial intelligence that adapts to your responses and skill level.",
      highlights: [
        "Real-time AI responses",
        "Industry-specific questions",
        "Adaptive difficulty",
      ],
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: MessageSquare,
      title: "Personalized Feedback & Analysis",
      description:
        "Receive comprehensive insights on your interview performance with detailed analysis of your answers, communication style, and areas for improvement.",
      highlights: [
        "Instant feedback",
        "Communication analysis",
        "Actionable tips",
      ],
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: BookOpen,
      title: "Extensive Question Bank",
      description:
        "Access thousands of curated interview questions across multiple domains, industries, and difficulty levels to prepare for any interview scenario.",
      highlights: [
        "10,000+ questions",
        "Multiple industries",
        "Regular updates",
      ],
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics & Tracking",
      description:
        "Monitor your progress with detailed analytics dashboards that track your improvement over time and compare against industry benchmarks.",
      highlights: [
        "Progress tracking",
        "Visual analytics",
        "Skill gap analysis",
      ],
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: FileText,
      title: "Resume Review & Career Tips",
      description:
        "Get expert guidance on optimizing your resume with AI-powered analysis, ATS compatibility checks, and industry-specific recommendations.",
      highlights: ["Resume scoring", "ATS optimization", "Career guidance"],
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <Headings
        title="Our Services"
        description="Comprehensive AI-powered tools to help you ace your next interview."
      />

      {/* Hero Stats Section */}
      <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">250k+</p>
                <p className="text-sm text-muted-foreground">Users Trained</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">1.2M+</p>
                <p className="text-sm text-muted-foreground">
                  Interviews Completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card
              key={index}
              className="rounded-xl bg-gradient-to-br from-gray-50 to-white"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`p-4 rounded-xl ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-sm">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.highlights.map((highlight, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs px-3 py-1"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Why Choose Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6" />
              <h3 className="text-lg font-semibold">24/7 Availability</h3>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed">
              Practice anytime, anywhere. Our AI interviewer is ready whenever
              you are, no scheduling required.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Privacy Focused</h3>
            </div>
            <p className="text-emerald-50 text-sm leading-relaxed">
              Your data is encrypted and secure. We never share your practice
              sessions or personal information.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Proven Results</h3>
            </div>
            <p className="text-purple-50 text-sm leading-relaxed">
              Join thousands of successful candidates who have landed their
              dream jobs using our platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesPage;
