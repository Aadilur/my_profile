import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, MessageCircle, MapPin, ArrowRight, Github } from "lucide-react";
import { logContactClick } from "../lib/analytics";

const handleWhatsAppClick = () => {
  logContactClick("whatsapp");
  window.open("https://wa.me/8801874427853", "_blank");
};

const handleEmailClick = () => {
  logContactClick("email");
  window.location.href = "mailto:adolrashid73@gmail.com";
};

const handleGithubClick = () => {
  logContactClick("github");
  window.open("https://github.com/Aadilur", "_blank");
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
            and create something amazing together.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
          {/* Email Card */}
          <Card
            className="bg-card border border-border hover:shadow-lg transition-all duration-300 group h-full flex flex-col cursor-pointer hover:border-primary/30"
            onClick={handleEmailClick}
            title="Click to send email"
          >
            <CardHeader className="flex-shrink-0 pb-4 pt-8">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <CardTitle className="text-center">Email</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center text-center pb-8">
              <p className="text-muted-foreground mb-3">Send me a message</p>
              <p
                className="font-medium text-foreground break-all cursor-pointer hover:text-primary transition-colors duration-200 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEmailClick();
                }}
                title="Click to send email"
              >
                adolrashid73@gmail.com
              </p>
            </CardContent>
          </Card>

          {/* WhatsApp Card */}
          <Card
            className="bg-card border border-border hover:shadow-lg transition-all duration-300 group h-full flex flex-col cursor-pointer hover:border-primary/30"
            onClick={handleWhatsAppClick}
            title="Click to open WhatsApp"
          >
            <CardHeader className="flex-shrink-0 pb-4 pt-8">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <MessageCircle size={24} />
              </div>
              <CardTitle className="text-center">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center text-center pb-8">
              <p className="text-muted-foreground mb-3">
                Quick response guaranteed
              </p>
              <p
                className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors duration-200 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWhatsAppClick();
                }}
                title="Click to open WhatsApp"
              >
                +8801874427853
              </p>
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm justify-center">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                Highly Active
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="bg-card border border-border hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
            <CardHeader className="flex-shrink-0 pb-4 pt-8">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <CardTitle className="text-center">Location</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center text-center pb-8">
              <p className="text-muted-foreground mb-3">Based in</p>
              <p className="font-medium text-foreground">Dhamrai, Dhaka</p>
              <p className="font-medium text-foreground">Bangladesh</p>
            </CardContent>
          </Card>

          {/* GitHub Card */}
          <Card
            className="bg-card border border-border hover:shadow-lg transition-all duration-300 group h-full flex flex-col cursor-pointer hover:border-primary/30"
            onClick={handleGithubClick}
            title="Click to visit GitHub Profile"
          >
            <CardHeader className="flex-shrink-0 pb-4 pt-8">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <Github size={24} />
              </div>
              <CardTitle className="text-center">GitHub</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center text-center pb-8">
              <p className="text-muted-foreground mb-3">Check my open source</p>
              <p
                className="font-medium text-foreground break-all cursor-pointer hover:text-primary transition-colors duration-200 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGithubClick();
                }}
                title="Click to open GitHub"
              >
                github.com/Aadilur
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group px-8"
            >
              <MessageCircle className="mr-2" size={20} />
              Start Conversation
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>

            <span className="text-muted-foreground hidden sm:block">or</span>

            <Button
              variant="outline"
              size="lg"
              onClick={handleEmailClick}
              className="border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 group px-8"
            >
              <Mail className="mr-2" size={20} />
              Send Email
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            © 2025 Md. Adilur Rashid. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
