import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Workbench from "./components/Workbench";

export default function Home() {
  return (
    <>
      {/* Site-wide ambient background — fixed, sits behind every section */}
      <Workbench />
      <ScrollProgress />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
