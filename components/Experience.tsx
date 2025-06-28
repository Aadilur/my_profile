import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building, Calendar, TrendingUp } from "lucide-react";

export default function Experience() {
  const achievements = [
    "Solely designed UI/UX of an app for non-tech-savvy users, resulting in 1.5 crore BDT sales within 3 months",
    "Helped secure USD 1.1M investment by designing impactful user-first products and working closely with the founders",
    "Led design and development teams under high-pressure environments",
    "Conducted extensive UX research with B2B customers",
    "Revamped Fashol website using AI technology in just 6 days"
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Experience</h2>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Building size={20} />
                    UI/UX Designer & Developer
                  </CardTitle>
                  <p className="text-lg text-primary">Fashol DotCom Limited</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar size={14} />
                  Jul 2023 - Present
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Leading UI/UX design and development initiatives at Bangladesh's growing B2B 
                e-commerce platform. Responsible for end-to-end product development from 
                ideation to deployment.
              </p>
              
              <h4 className="mb-4 flex items-center gap-2">
                <TrendingUp size={18} />
                Key Achievements
              </h4>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building size={20} />
                Freelance Mobile App Developer
              </CardTitle>
              <p className="text-muted-foreground">Various Marketplaces</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Started my career as a freelance mobile application developer, working across 
                various platforms and building applications for diverse clients. This experience 
                laid the foundation for my transition into UI/UX design and product development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}