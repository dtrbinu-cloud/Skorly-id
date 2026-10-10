import Hero from '../components/landing/Hero';
import StatsBar from '../components/landing/StatsBar';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import ExamPreview from '../components/landing/ExamPreview';
import CtaBanner from '../components/landing/CtaBanner';

export default function Landing() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <ExamPreview />
      <CtaBanner />
    </div>
  );
}
