import Headings from "@/components/headings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <Headings
        title="Contact Us"
        description="We'd love to hear from you. Get in touch with our team."
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Cards */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Have questions about our AI-powered interview platform? Need
              assistance with your account? We're here to help you succeed in
              your interview preparation journey.
            </p>
          </div>

          <Card className="">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get a response within 24 hours
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium text-gray-800">
                contact@aimockinterview.com
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Call Us</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mon-Fri from 9am to 6pm EST
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium text-gray-800">
                +1 (555) 123-4567
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Visit Us</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visits by appointment only
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium text-gray-800">
                123 AI Street, Tech Valley
                <br />
                San Francisco, CA 94102
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="">
          <CardHeader className="bg-gradient-to-br from-gray-50 to-white">
            <CardTitle className="text-lg">Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium mb-2 block"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium mb-2 block"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium mb-2 block"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="w-full min-h-[150px] resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2 relative overflow-hidden group h-11"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <Send className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-medium">Send Message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-1">
          <CardHeader>
            <CardTitle className="text-base">Support Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our support team is available Monday through Friday, 9am to 6pm
              EST.
            </p>
          </CardContent>
        </Card>

        <Card className="border-1">
          <CardHeader>
            <CardTitle className="text-base">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We typically respond to all inquiries within 24 hours during
              business days.
            </p>
          </CardContent>
        </Card>

        <Card className="border-1">
          <CardHeader>
            <CardTitle className="text-base">Schedule a Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contact us via email or phone to schedule a personalized demo of
              our platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
