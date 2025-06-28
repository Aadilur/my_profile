import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

// Custom analytics functions for the portfolio
export const logPortfolioEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

// Specific portfolio events
export const logCVDownload = () => {
  logPortfolioEvent("cv_download", {
    section: "header",
    action: "download"
  });
};

export const logCVPreview = () => {
  logPortfolioEvent("cv_preview", {
    section: "header", 
    action: "preview"
  });
};

export const logContactClick = (method: string) => {
  logPortfolioEvent("contact_click", {
    contact_method: method
  });
};

export const logProjectView = (projectName: string) => {
  logPortfolioEvent("project_view", {
    project_name: projectName
  });
};

export const logSectionView = (sectionName: string) => {
  logPortfolioEvent("section_view", {
    section_name: sectionName
  });
};