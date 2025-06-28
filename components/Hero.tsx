import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import FloatingTechIcons from "./FloatingTechIcons";

const profileImage = '/adil_rounded_border.png';

export default function Hero() {
  // Function to smoothly scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to open WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = '8801874427853';
    const message = encodeURIComponent('Hi Adil! I found your portfolio and would like to discuss a potential project.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Tech Icons Background with Glass Overlay */}
      <FloatingTechIcons />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <ImageWithFallback
              src={profileImage}
              alt="Md. Adilur Rashid"
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl backdrop-blur-sm"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl mb-4 text-shadow-lg">
            Hi, I'm <span className="text-primary">Adil</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
            UI/UX Designer & Developer
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Building tech products from ideation to serving users. Currently crafting exceptional 
            digital experiences at Fashol DotCom Limited, with a passion for adaptive design and 
            rapid execution.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.open('https://www.linkedin.com/in/md-adilur-rashid-418a96171/?originalSubdomain=bd', '_blank')}
              className="transition-transform hover:scale-110 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <Linkedin size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.open('mailto:adolrashid73@gmail.com', '_blank')}
              className="transition-transform hover:scale-110 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <Mail size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={openWhatsApp}
              className="transition-transform hover:scale-110 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <MessageCircle size={20} />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 transition-transform hover:scale-105 shadow-xl"
              onClick={scrollToProjects}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 transition-transform hover:scale-105 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 shadow-xl"
              onClick={openWhatsApp}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}