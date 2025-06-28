import { useState } from "react";
import { Button } from "./ui/button";
import { Download, Eye, Menu, X } from "lucide-react";
import { handlePreviewCV, handleDownloadCV } from "../lib/cv-generator";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMenuAction = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-medium">Md Adilur Rashid</div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#education" className="hover:text-primary transition-colors">Education</a>
        </nav>
        
        {/* Desktop CV Buttons */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMenu}
            className="relative z-50"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Dropdown Content */}
              <div className="absolute top-12 right-0 w-56 bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="p-3 space-y-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground border-b border-border/50">
                    CV Options
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => handleMenuAction(handlePreviewCV)}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <Eye size={16} className="text-primary" />
                    </div>
                    <span>Preview CV</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => handleMenuAction(handleDownloadCV)}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <Download size={16} className="text-primary" />
                    </div>
                    <span>Download CV</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}