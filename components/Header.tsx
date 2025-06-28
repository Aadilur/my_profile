import { Button } from "./ui/button";
import { Download, Eye } from "lucide-react";
import { handlePreviewCV, handleDownloadCV } from "../lib/cv-generator";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-medium">Md Adilur Rashid</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#education" className="hover:text-primary transition-colors">Education</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handlePreviewCV} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Eye size={16} />
            Preview CV
          </Button>
          <Button onClick={handleDownloadCV} className="flex items-center gap-2">
            <Download size={16} />
            Download CV
          </Button>
        </div>
      </div>
    </header>
  );
}