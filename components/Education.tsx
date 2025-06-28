import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Calendar, Target } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Education & Goals</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap size={20} />
                  Diploma in Computer Science & Engineering
                </CardTitle>
                <p className="text-primary">National Institute of Engineering and Technology</p>
                <Badge variant="outline" className="w-fit flex items-center gap-1">
                  <Calendar size={14} />
                  2016 - 2021
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Completed comprehensive diploma program focusing on computer science 
                  fundamentals, programming, and engineering principles.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap size={20} />
                  BSc in Computer Science & Engineering
                </CardTitle>
                <p className="text-primary">Northern University Bangladesh</p>
                <Badge variant="outline" className="w-fit">
                  5th/9th Semester (Hiatus)
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pursued bachelor's degree with focus on advanced computer science concepts. 
                  Currently on hiatus to focus on professional growth and real-world impact.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target size={20} />
                Future Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="text-lg mb-3">SOSSS - School of Science Sports and Safety</h4>
              <p className="text-muted-foreground leading-relaxed">
                My ultimate goal is to build a true tech-based university that revolutionizes 
                education by combining science, sports, and safety. This institution will 
                leverage cutting-edge technology to create an innovative learning environment 
                that prepares students for the future.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}