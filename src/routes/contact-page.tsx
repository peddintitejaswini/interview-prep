import Headings from "@/components/headings";

const ContactPage = () => {
  return (
    <div className="h-screen p-8 max-w-4xl mx-auto">
      <Headings title="Contact Us" description="Get in touch with us." />
      <div className="mt-8">
        <p>
          If you have any questions, feedback, or partnership inquiries, please
          don't hesitate to reach out to us.
        </p>
        <p className="font-semibold mt-2">contact@aimockinterview.com</p>
      </div>
    </div>
  );
};

export default ContactPage;
