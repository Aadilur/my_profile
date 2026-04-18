import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export default function About() {
  const skills = [
    "UI/UX Design",
    "Mobile App Development",
    "Product Strategy",
    "Team Leadership",
    "Customer Research",
    "Rapid Prototyping",
    "React",
    "React Native",
    "Node.js",
    "AI Chatbot",
    "AI API Integration",
    "Messenger Chat Automation",
    "Figma",
    "Adobe Creative Suite",
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl mb-4">Quick, Adaptive and Execute</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm passionate about building tech products from their ideation
                stage to serving real users. My journey includes ideation,
                research, prototyping, design, development, testing, deployment,
                feedback collection, and continuous improvement.
              </p>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Fashol DotCom Limited, I've had the opportunity to work
                directly with customers, conduct in-depth interviews, and
                analyze pain points to create solutions that generate real
                business value. I solely designed the UI/UX of an app for
                non-tech-savvy users, which resulted in 1.5 crore BDT in sales
                within just 3 months.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My ultimate goal is to build SOSSS (School of Science Sports and
                Safety) - a true tech-based university that will revolutionize
                education.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg mb-4">Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
