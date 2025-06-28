import { 
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
import { 
  SiFigma,
  SiAdobexd,
  SiDart,
  SiTailwindcss,
  SiJavascript
} from "react-icons/si";

// All technologies using react-icons - made black and white
const techIcons = [
  { component: SiFigma, name: 'figma', color: 'text-gray-600' },
  { component: SiAdobexd, name: 'xd', color: 'text-gray-500' },
  { component: SiDart, name: 'dart', color: 'text-gray-500' },
  { component: FaPython, name: 'python', color: 'text-gray-600' },
  { component: FaHtml5, name: 'html', color: 'text-gray-400' },
  { component: FaCss3Alt, name: 'css', color: 'text-gray-400' },
  { component: FaReact, name: 'react', color: 'text-gray-600' },
  { component: SiTailwindcss, name: 'tailwind', color: 'text-gray-500' },
  { component: SiJavascript, name: 'javascript', color: 'text-gray-400' },
  { component: FaJava, name: 'java', color: 'text-gray-500' },
  { component: FaNodeJs, name: 'nodejs', color: 'text-gray-500' },
  { component: FaLinkedin, name: 'linkedin', color: 'text-gray-500' },
  { component: FaGithub, name: 'github', color: 'text-gray-600' },
  { component: FaDocker, name: 'docker', color: 'text-gray-500' },
];

export default function FloatingTechIcons() {
  // Generate random positions and animations for icons with better scattering
  const generateFloatingIcon = (icon: typeof techIcons[0], index: number) => {
    const animations = ['animate-float', 'animate-float-slow', 'animate-float-reverse', 'animate-float-diagonal'];
    const animationClass = animations[index % animations.length];
    
    // Better scattering algorithm - divide screen into zones
    const zones = [
      { x: [5, 25], y: [5, 25] },
      { x: [25, 50], y: [5, 25] },
      { x: [50, 75], y: [5, 25] },
      { x: [75, 95], y: [5, 25] },
      { x: [5, 25], y: [25, 50] },
      { x: [25, 50], y: [25, 50] },
      { x: [50, 75], y: [25, 50] },
      { x: [75, 95], y: [25, 50] },
      { x: [5, 25], y: [50, 75] },
      { x: [25, 50], y: [50, 75] },
      { x: [50, 75], y: [50, 75] },
      { x: [75, 95], y: [50, 75] },
      { x: [5, 95], y: [75, 95] },
      { x: [10, 90], y: [10, 90] },
    ];
    
    const zone = zones[index % zones.length];
    const left = Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0];
    const top = Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0];
    
    const size = Math.random() * 35 + 10; // Increased size from 20-50 to 25-60
    const delay = Math.random() * 12;
    const opacity = Math.random() * 0.2 + 0.4; // Increased opacity for better visibility: 0.3-0.7
    
    const IconComponent = icon.component;
    
    return (
      <div
        key={`${icon.name}-${index}`}
        className={`absolute ${icon.color} transition-all duration-700 hover:scale-110 hover:opacity-90`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity,
          animationDelay: `${delay}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        }}
      >
        <div className={`w-full h-full ${animationClass}`}>
          <IconComponent className="w-full h-full" />
        </div>
      </div>
    );
  };

  // Create multiple instances with better distribution
  const floatingIcons: JSX.Element[] = [];
  
  // Create 3 instances of each icon for better performance while keeping good coverage
  for (let i = 0; i < 1; i++) {
    techIcons.forEach((icon, iconIndex) => {
      floatingIcons.push(generateFloatingIcon(icon, iconIndex + i * techIcons.length));
    });
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Icons Background - Behind everything */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingIcons}
      </div>
      
      {/* Minimal Glassmorphism Overlay with Reduced Blur - On top of icons */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/30 to-muted/40 backdrop-blur-[2px] z-10" /> */}
      
      {/* Very Light Secondary Glass Effect - Final overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-white/3 backdrop-blur-[1px] z-20" /> */}
    </div>
  );
}