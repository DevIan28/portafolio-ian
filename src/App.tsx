import { HashRouter, Route, Routes } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Experience from "@/pages/Experience";
import Contact from "@/pages/Contact";
import BackgroundDecor from "@/components/BackgroundDecor";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import FloatingContact from "@/components/FloatingContact";

export default function App() {
  return (
    <HashRouter>
      <BackgroundDecor />
      <ScrollProgress />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <CommandPalette />
      <FloatingContact />
    </HashRouter>
  );
}
