import Headings from "@/components/headings";

const AboutPage = () => {
  return (
    <div className="h-screen  p-8 max-w-4xl mx-auto">
      <Headings title="About Us" description="Learn more about our mission." />
      <div className="mt-8 flex items-center justify-centertext-lg text-muted-foreground space-y-4">
        <p>
          AI Mock Interview was founded with the mission to help job seekers
          around the world prepare for their interviews with confidence. We
          leverage cutting-edge artificial intelligence to simulate real-world
          interview scenarios, providing a safe and effective platform for
          practice and improvement.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
