import Headings from "@/components/headings";

const ServicesPage = () => {
  return (
    <div className="h-screen p-8 max-w-4xl mx-auto">
      <Headings title="Our Services" description="What we offer." />
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold">AI-Powered Mock Interviews</h3>
          <p className="text-lg text-muted-foreground mt-2">
            Practice your interview skills with our advanced AI that provides
            realistic questions and instant, actionable feedback.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Personalized Feedback</h3>
          <p className="text-lg text-muted-foreground mt-2">
            Receive detailed analysis on your answers, communication style, and
            overall performance to identify areas for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
