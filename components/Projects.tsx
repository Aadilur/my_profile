import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ExternalLink,
  Globe,
  Settings,
  BarChart3,
} from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Projects() {
  // Mobile Apps with Play Store links (reordered by sales impact)
  const mobileApps = [
    {
      title: "Banijjo",
      description:
        "Digital marketplace bringing your shop to customers' fingertips. Easy product listing, smart networking, complete shop control, and instant updates through Fashol's digital platform.",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.fashol.banijjo&hl=en",
      iconUrl:
        "https://play-lh.googleusercontent.com/Qrn3VrfAxcFWITay2AV8dzKd2Kzo37o4Bljg0u4tsEL12oatrC4kitCsY2znxbQJ7g=w240-h480-rw",
      tags: [
        "Digital Marketplace",
        "Shop Management",
        "Customer Reach",
      ],
      impact: "1.5 Cr BDT Sales",
    },
    {
      title: "Jogaan",
      description:
        "Product sourcing and selling platform for farmers, providing market intelligence, real-time pricing, order management, and direct connection to buyers across Bangladesh's agricultural markets.",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.fashol.agent&hl=en",
      iconUrl:
        "https://play-lh.googleusercontent.com/n_VkbTVw9w_SgrpWzL1yI0xAaH2Ji7-nDESM3npeEADhkxGhhPYq6HGWdUrIm3LIP8U=w240-h480-rw",
      tags: [
        "Farmer Platform",
        "Product Sourcing",
        "Market Intelligence",
      ],
      impact: "Farmer Empowerment",
    },
    {
      title: "Fashol Retail",
      description:
        "B2B platform for retailers connecting directly with farmers, offering fresh produce at fair prices. Features direct sourcing, real-time pricing, flexible payments, and quality assurance.",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.fashol.business&hl=en",
      iconUrl:
        "https://play-lh.googleusercontent.com/rTMd7iS7JrwCJwvVOXC94FAzR_wgzWsrgatcqOv_WmEEvlIq-Y0YskM4brt_7WZ48f4=w240-h480-rw",
      tags: [
        "B2B Platform",
        "Retailer Tool",
        "Connecting Retailers",
      ],
      impact: "Retail Growth",
    },
  ];

  // Web Platforms
  const webPlatforms = [
    {
      title: "Fashol Website",
      description:
        "Main customer-facing platform showcasing our B2B ecosystem, connecting farmers and businesses through innovative technology solutions.",
      url: "https://fashol.com",
      icon: <Globe size={24} />,
      tags: ["Website", "Customer Portal", "B2B Ecosystem"],
      impact: "Digital Presence",
    },
    {
      title: "Fashol B2A Admin Panel",
      description:
        "Comprehensive admin interface managing all Fashol applications, providing centralized control over the entire platform ecosystem.",
      url: "https://b2a.fashol.com/login",
      icon: <Settings size={24} />,
      tags: [
        "Admin Panel",
        "Platform Control",
        "B2A Management",
      ],
      impact: "Operational Control",
    },
    {
      title: "Fashol ERP System",
      description:
        "Enterprise resource planning solution managing business operations, inventory, finances, and comprehensive reporting for the entire Fashol ecosystem.",
      url: "https://erp.fashol.com/login",
      icon: <BarChart3 size={24} />,
      tags: ["ERP System", "Business Management", "Analytics"],
      impact: "Core Business Tool",
    },
  ];

  const PlayStoreButton = ({
    url,
    iconUrl,
    appName,
  }: {
    url: string;
    iconUrl: string;
    appName: string;
  }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors group"
    >
      <ImageWithFallback
        src={iconUrl}
        alt={`${appName} icon`}
        className="w-8 h-8 rounded-lg"
      />
      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-300">GET IT ON</span>
        <span className="font-medium text-sm">Google Play</span>
      </div>
      <ExternalLink
        size={14}
        className="opacity-70 group-hover:opacity-100 transition-opacity"
      />
    </a>
  );

  const WebPlatformButton = ({
    url,
    title,
  }: {
    url: string;
    title: string;
  }) => (
    <Button variant="outline" asChild className="w-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <ExternalLink size={16} />
        Visit {title}
      </a>
    </Button>
  );

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Key applications and platforms I've designed and
            developed, contributing to significant business
            growth and the complete Fashol B2B ecosystem.
          </p>

          {/* Mobile Apps Section */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl mb-8 text-center">
              Mobile Applications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileApps.map((app, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow group h-full flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <ImageWithFallback
                        src={app.iconUrl}
                        alt={`${app.title} icon`}
                        className="w-12 h-12 rounded-xl"
                      />
                      <Badge
                        variant="outline"
                        className="w-fit"
                      >
                        {app.impact}
                      </Badge>
                    </div>
                    <CardTitle className="mb-2">
                      {app.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {app.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-grow"> </div>
                    <div className="pt-2">
                      <PlayStoreButton
                        url={app.playStoreUrl}
                        iconUrl={app.iconUrl}
                        appName={app.title}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Web Platforms Section */}
          <div>
            <h3 className="text-xl md:text-2xl mb-8 text-center">
              Web Platforms
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webPlatforms.map((platform, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow group h-full flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        {platform.icon}
                      </div>
                      <Badge
                        variant="outline"
                        className="w-fit"
                      >
                        {platform.impact}
                      </Badge>
                    </div>
                    <CardTitle className="mb-2">
                      {platform.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {platform.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {platform.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-grow"> </div>
                    <div className="pt-2">
                      <WebPlatformButton
                        url={platform.url}
                        title={platform.title.replace(
                          "Fashol ",
                          "",
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}