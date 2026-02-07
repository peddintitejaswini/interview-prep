import Headings from "@/components/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former tech recruiter with 10+ years of experience helping candidates land their dream jobs. Passionate about leveraging AI to democratize interview preparation.",
      image: "/assets/img/team/member1.jpg",
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@aimockinterview.com",
      },
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "AI/ML engineer with expertise in natural language processing. Previously worked at leading tech companies building conversational AI systems.",
      image: "/assets/img/team/member2.jpg",
      social: {
        linkedin: "#",
        github: "#",
        email: "michael@aimockinterview.com",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      bio: "Career coach and interview expert who has trained thousands of professionals. Specializes in behavioral interviews and communication strategies.",
      image: "/assets/img/team/member3.jpg",
      social: {
        linkedin: "#",
        github: "#",
        email: "emily@aimockinterview.com",
      },
    },
    {
      name: "David Kim",
      role: "Lead Product Designer",
      bio: "UX designer focused on creating intuitive, beautiful experiences. Believes great design should be accessible to everyone preparing for interviews.",
      image: "/assets/img/team/member4.jpg",
      social: {
        linkedin: "#",
        github: "#",
        email: "david@aimockinterview.com",
      },
    },
  ];

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <Headings
        title="About Us"
        description="Meet the team behind AI Mock Interview and learn about our mission."
      />

      {/* Mission Section */}
      <div className="mt-8 mb-12">
        <Card className="">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI Mock Interview was founded with a simple yet powerful mission:
              to help job seekers around the world prepare for their interviews
              with confidence and succeed in landing their dream jobs.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We leverage cutting-edge artificial intelligence to simulate
              real-world interview scenarios, providing a safe, effective, and
              accessible platform for practice and improvement. Our platform has
              helped thousands of candidates across various industries ace their
              interviews and advance their careers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {member.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <a
                    href={member.social.linkedin}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors group/link"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-gray-600 group-hover/link:text-blue-600" />
                  </a>
                  <a
                    href={member.social.github}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors group/link"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4 text-gray-600 group-hover/link:text-gray-900" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 rounded-lg hover:bg-emerald-50 transition-colors group/link"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 text-gray-600 group-hover/link:text-emerald-600" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-1">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">
                Innovation
              </h3>
              <p className="text-sm text-blue-800">
                We continuously push the boundaries of AI technology to create
                the most effective interview preparation tools.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-1">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 text-emerald-900">
                Accessibility
              </h3>
              <p className="text-sm text-emerald-800">
                Everyone deserves access to quality interview preparation,
                regardless of their background or resources.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-1">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 text-purple-900">
                Excellence
              </h3>
              <p className="text-sm text-purple-800">
                We're committed to delivering the highest quality experience and
                helping every user achieve their career goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
