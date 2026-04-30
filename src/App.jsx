import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import "./styles/style.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}