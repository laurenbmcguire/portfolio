import EmailCapture from "./EmailCapture";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import CTA from "./CTA";

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <CTA showWhatsIncluded={false} />
      <EmailCapture />
      <Footer />
    </>
  );
}

export default LandingPage;
