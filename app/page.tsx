import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import OnlineJudges from './components/OnlineJudges';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatPopup from './components/ChatPopup';

export default function Home() {
  return (
    <main className="bg-[#0A192F] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <OnlineJudges />
      <Education />
      <Contact />
      <Footer />
      <ChatPopup />
    </main>
  );
} 