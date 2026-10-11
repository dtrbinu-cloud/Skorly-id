import Hero from '../components/landing/Hero';
import StatsBar from '../components/landing/StatsBar';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import WorkflowPreview from '../components/landing/WorkflowPreview';
import CtaBanner from '../components/landing/CtaBanner';

export default function Landing() {
  return (
    <div className="landing-page flex flex-col w-full">
      <Hero />
      <StatsBar />
      <WorkflowPreview />
      <HowItWorks />
      <Features />
      <CtaBanner />
    </div>
  );
}
