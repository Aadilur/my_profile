import { jsPDF } from "jspdf";
import { logCVDownload, logCVPreview } from "./analytics";

// Image is served from the public folder
const profileImage = "/adil_rounded_border.png";

export const generateCV = async (mode: "preview" | "download" = "download") => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Color scheme - using soft grays instead of pure black
  const primaryColor = [3, 2, 19]; // Dark blue-gray
  const textColor = [45, 45, 45]; // Dark gray instead of pure black
  const lightGray = [248, 248, 250]; // Very light gray background
  const accentColor = [100, 100, 100]; // Medium gray for secondary text

  // Helper function to add text with automatic line wrapping
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number = 4.5,
    color: number[] = textColor,
  ) => {
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  };

  // Helper function to load image and convert to base64
  const loadImageAsBase64 = async (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Enable CORS

      img.onload = () => {
        try {
          // Create canvas to convert image to base64
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            resolve("");
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0);

          // Convert to base64
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        } catch (error) {
          console.warn("Failed to convert image to base64:", error);
          resolve("");
        }
      };

      img.onerror = () => {
        console.warn("Failed to load profile image from:", url);
        resolve("");
      };

      // Set the image source
      img.src = url;
    });
  };

  // Helper function to check if new page is needed
  const checkNewPage = (requiredSpace: number) => {
    const bottomGap = 35; // Increased bottom margin for better visual gap
    if (yPosition + requiredSpace > pageHeight - bottomGap) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Create a professional placeholder for profile photo
  const createProfilePlaceholder = (x: number, y: number, size: number) => {
    // Create gradient background
    doc.setFillColor(240, 245, 250);
    doc.rect(x, y, size, size, "F");

    // Add professional initials
    doc.setTextColor(80, 90, 100);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const initials = "AR";
    const initialsWidth = doc.getTextWidth(initials);
    doc.text(initials, x + size / 2 - initialsWidth / 2, y + size / 2 + 4);
  };

  // Light header background with proper padding
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(0, 0, pageWidth, 48, "F");

  // Calculate the layout dimensions for horizontal arrangement
  const photoSize = 26;
  const nameGap = 6; // gap between photo and name
  const nameWidth = 85; // approximate width for name section
  const spaceBetweenSections = 12; // space between left group and contact info
  const contactWidth = 60; // approximate width for contact section

  // Total width of the entire header content
  const totalHeaderWidth =
    photoSize + nameGap + nameWidth + spaceBetweenSections + contactWidth;

  // Center the entire header content horizontally
  // const headerStartX = (pageWidth - totalHeaderWidth) / 2;

  // Position elements within the centered header
  const photoX = 12;
  const photoY = 11;
  const nameX = photoX + photoSize + nameGap;
  const contactStartX = nameX + nameWidth + spaceBetweenSections;

  // Add profile photo
  try {
    const imageData = await loadImageAsBase64(profileImage);
    if (imageData) {
      // Add the image directly without any borders or backgrounds
      doc.addImage(imageData, "PNG", photoX, photoY, photoSize, photoSize);
    } else {
      // Use professional placeholder if image fails to load
      createProfilePlaceholder(photoX, photoY, photoSize);
    }
  } catch (error) {
    console.error("Error processing profile photo:", error);
    // Use professional placeholder as fallback
    createProfilePlaceholder(photoX, photoY, photoSize);
  }

  // Name and title - close to photo, part of the left group
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("MD. ADILUR RASHID", nameX, 21);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("UI/UX Designer & Developer", nameX, 29);

  // Contact Information - positioned on the right side of the row
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const contactLines = [
    "adolrashid73@gmail.com",
    "WhatsApp: +8801874427853",
    "github.com/Aadilur",
    "Dhamrai, Dhaka, Bangladesh",
  ];

  // Position contact info in the right section, right-aligned
  contactLines.forEach((line, index) => {
    const lineWidth = doc.getTextWidth(line);
    const contactX = contactStartX + contactWidth - lineWidth; // Right align within contact section

    // Style the portfolio line differently to look like a link and make it clickable
    if (line === "View my portfolio") {
      doc.setTextColor(41, 128, 185); // Blue color for link
      doc.setFont("helvetica", "normal");

      const yPos = 19 + index * 4.5;
      doc.text(line, contactX, yPos);

      // Add underline to make it look more like a link
      const underlineY = yPos + 0.5;
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(0.2);
      doc.line(contactX, underlineY, contactX + lineWidth, underlineY);

      // Make it clickable - add link annotation
      doc.link(contactX, yPos - 3, lineWidth, 6, {
        url: "https://adils-portfolio.web.app",
      });

      // Reset color for other lines
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    } else {
      doc.text(line, contactX, 19 + index * 4.5);
    }
  });

  yPosition = 55;

  // Professional Summary
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", margin, yPosition);

  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const summary =
    "UI/UX Designer and Developer with 2+ years of experience at Fashol DotCom Limited. Specialized in direct customer research, team management, and quick execution under pressure. Experienced in building tech products from ideation to deployment.";
  yPosition = addWrappedText(summary, margin, yPosition, contentWidth, 4.5);
  yPosition += 10;

  // Key Achievements (Highlighted section)
  const achievementStartY = yPosition;

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("KEY ACHIEVEMENTS", margin, yPosition + 10);
  yPosition += 14; // Reduced from 16 to 14 (2 point gap reduction)

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  const keyAchievements = [
    "Solely designed UI/UX of an app for non-tech-savvy users, resulting in 1.5 crore BDT in sales within 3 months",
    "Helped secure USD 1.1M investment by designing impactful user-first products and working closely with the founders",
    "Led cross-functional teams across multiple product launches",
    "Designed major B2B applications: Fashol ERP, Fashol Shelf, Fashol Retail, Banijjo, Jogaan",
  ];

  keyAchievements.forEach((achievement, index) => {
    const bulletX = margin + 4;
    const textX = margin + 10;

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    // Adjust bullet Y position to align with text center (move up by 2 points)
    doc.circle(bulletX, yPosition - 2, 1, "F");

    yPosition = addWrappedText(
      achievement,
      textX,
      yPosition,
      contentWidth - 10,
      4,
    );
    yPosition += 2;
  });

  const achievementEndY = yPosition + 3;

  // Draw background - reduced height by 2 points
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(
    margin - 8,
    achievementStartY - 3,
    contentWidth + 16,
    achievementEndY - achievementStartY + 4, // Reduced from +6 to +4 (2 point height reduction)
    "F",
  );

  // Redraw content on top
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("KEY ACHIEVEMENTS", margin, achievementStartY + 5);

  let tempY = achievementStartY + 14; // Reduced from 16 to 14 (2 point gap reduction)
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  keyAchievements.forEach((achievement, index) => {
    const bulletX = margin + 4;
    const textX = margin + 10;

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    // Adjust bullet Y position to align with text center (move up by 2 points)
    doc.circle(bulletX, tempY - 2, 1, "F");

    tempY = addWrappedText(achievement, textX, tempY, contentWidth - 10, 4);
    tempY += 2;
  });

  yPosition = achievementEndY + 10;

  // Work Experience
  checkNewPage(70);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("WORK EXPERIENCE", margin, yPosition);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  // Current Role
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("UI/UX Designer & Developer", margin, yPosition);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const dateText = "July 2023 - Present (2+ years)";
  const dateWidth = doc.getTextWidth(dateText);
  doc.text(dateText, pageWidth - margin - dateWidth, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Fashol DotCom Limited - Dhaka, Bangladesh", margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  const experiences = [
    "Designed and developed major applications: Fashol ERP, Fashol Retail, Banijjo, Jogaan, Fashol Shelf",
    "Conducted extensive B2B customer research through direct customer interviews and analysis",
    "Managed cross-functional teams to ensure timely product delivery",
    "Worked directly with CEO on strategic initiatives and funding presentations",
    "Improved tech products including ERP systems and admin panels",
  ];

  experiences.forEach((exp) => {
    const bulletX = margin + 3;
    const textX = margin + 9;

    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.circle(bulletX, yPosition - 1.5, 0.8, "F");

    yPosition = addWrappedText(exp, textX, yPosition, contentWidth - 9, 4);
    yPosition += 1;
  });

  yPosition += 8;

  // Previous Experience
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("Freelance Mobile Application Developer", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const priorDateText = "Prior to 2023";
  const priorDateWidth = doc.getTextWidth(priorDateText);
  doc.text(priorDateText, pageWidth - margin - priorDateWidth, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Various Freelance Platforms", margin, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  const freelanceExp =
    "Developed mobile applications using various technologies and platforms, focusing on user experience and cross-platform solutions.";
  yPosition = addWrappedText(
    freelanceExp,
    margin + 9,
    yPosition,
    contentWidth - 9,
    4,
  );
  yPosition += 10;

  // Technical Skills
  checkNewPage(35);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TECHNICAL SKILLS", margin, yPosition);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  const skillCategories = [
    {
      category: "Design & Research",
      skills: "UI/UX Design, User Research, Figma, Adobe XD",
    },
    {
      category: "Mobile Development",
      skills: "Flutter, Dart, React Native",
    },
    {
      category: "Web Development",
      skills: "React, Node.js, JavaScript, HTML, CSS",
    },
    {
      category: "AI & Automation",
      skills: "AI Chatbot, AI API Integration, Messenger Chat Automation",
    },
  ];

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  skillCategories.forEach((skillSet) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`${skillSet.category}:`, margin, yPosition);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    yPosition = addWrappedText(
      skillSet.skills,
      margin + 40,
      yPosition,
      contentWidth - 40,
      4,
    );
    yPosition += 3;
  });

  yPosition += 8;

  // Core Competencies
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("CORE COMPETENCIES", margin, yPosition);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  const competencies = [
    "User Experience Design",
    "User Interface Design",
    "Direct Customer Research",
    "Team Management",
    "Quick Execution",
    "Mobile App Development",
    "B2B Solutions",
    "Product Strategy",
  ];

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  // Create competencies in 2 columns
  const competenciesPerColumn = 4;
  const columnWidth = contentWidth / 2;

  for (let i = 0; i < competencies.length; i++) {
    const column = Math.floor(i / competenciesPerColumn);
    const row = i % competenciesPerColumn;
    const x = margin + column * columnWidth;
    const y = yPosition + row * 5;

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(x + 3, y - 1.5, 0.8, "F");
    doc.text(competencies[i], x + 7, y);
  }

  yPosition += 22;

  // Languages
  checkNewPage(18);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("LANGUAGES", margin, yPosition);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  const languages = ["Bengali (Native)", "English (Fluent)"];

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  languages.forEach((lang, index) => {
    const x = margin + (index % 2) * (contentWidth / 2);
    const y = yPosition + Math.floor(index / 2) * 5;

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(x + 3, y - 1.5, 0.8, "F");
    doc.text(lang, x + 7, y);
  });

  yPosition += 10;

  // Education
  checkNewPage(30);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EDUCATION", margin, yPosition);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("Diploma in Computer Science & Engineering", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const diplomaDateText = "2016 - 2021";
  const diplomaDateWidth = doc.getTextWidth(diplomaDateText);
  doc.text(diplomaDateText, pageWidth - margin - diplomaDateWidth, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(
    "National Institute of Engineering and Technology",
    margin,
    yPosition,
  );
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("BSc in Computer Science & Engineering", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const bscStatusText = "Hiatus";
  const bscStatusWidth = doc.getTextWidth(bscStatusText);
  doc.text(bscStatusText, pageWidth - margin - bscStatusWidth, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Northern University Bangladesh", margin, yPosition);
  yPosition += 10;

  // Certifications
  checkNewPage(18);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATION", margin, yPosition);
  doc.line(margin, yPosition + 2, margin + 55, yPosition + 2);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  const bulletX = margin + 3;
  const textX = margin + 9;

  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.circle(bulletX, yPosition - 1.5, 0.8, "F");
  doc.text(
    "Mobile App Development from Creative IT Institute (2020)",
    textX,
    yPosition,
  );
  yPosition += 10;

  // Future Vision
  checkNewPage(25);
  const visionStartY = yPosition;

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("FUTURE VISION", margin, yPosition + 5);
  yPosition += 9;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("SOSSS - School of Science Sports and Safety", margin, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const vision =
    "Building a tech-based university that revolutionizes education through innovative technology integration and comprehensive learning approaches.";
  yPosition = addWrappedText(vision, margin, yPosition, contentWidth, 4);

  const visionEndY = yPosition + 5;

  // Draw background
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(
    margin - 8,
    visionStartY - 3,
    contentWidth + 16,
    visionEndY - visionStartY + 8,
    "F",
  );

  // Redraw content
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("FUTURE VISION", margin, visionStartY + 5);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(
    "SOSSS - School of Science Sports and Safety",
    margin,
    visionStartY + 14,
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  addWrappedText(vision, margin, visionStartY + 19, contentWidth, 4);

  yPosition = visionEndY + 12;

  // Personal Motto
  checkNewPage(12);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const motto = '"Fast, Flexible, and Results-Driven"';
  const mottoWidth = doc.getTextWidth(motto);
  doc.text(motto, (pageWidth - mottoWidth) / 2, yPosition);

  // Create filename with name and phone (used for both preview and download)
  const fileName = "MD_Adilur_Rashid_+8801874427853_CV.pdf";

  // Handle preview or download
  if (mode === "preview") {
    // Log analytics event for preview
    logCVPreview();

    // Generate PDF as blob and open in new tab with custom filename
    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Create a temporary link element to set the filename for preview
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.target = "_blank";

    // Trigger the preview with custom filename
    window.open(blobUrl, "_blank");

    // Clean up the blob URL after a delay to prevent memory leaks
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  } else {
    // Log analytics event for download
    logCVDownload();

    // Download the PDF
    doc.save(fileName);
  }
};

export const handlePreviewCV = () => {
  generateCV("preview");
};

export const handleDownloadCV = () => {
  generateCV("download");
};
