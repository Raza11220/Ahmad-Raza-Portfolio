import { jsPDF } from "jspdf";

export function downloadResumePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  
  let y = 20;

  // Helper to check and add new page
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // 1. Header (Centered)
  doc.setFont("times", "bold");
  doc.setFontSize(26);
  doc.text("AHMAD RAZA", pageWidth / 2, y, { align: "center" });
  y += 8;

  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.text("Software Engineer  —  React Native Engineer  —  Web Developer", pageWidth / 2, y, { align: "center" });
  y += 7;

  doc.setFontSize(10);
  const contactStr = "Pakistan  |  +92-329-6155253  |  cathode1122@gmail.com";
  doc.text(contactStr, pageWidth / 2, y, { align: "center" });
  y += 5;

  doc.setTextColor(0, 100, 200);
  doc.text("github.com/Raza11220   |   linkedin.com/in/ahmad-raza112200", pageWidth / 2, y, { align: "center" });
  doc.setTextColor(0, 0, 0); // reset to black
  y += 10;

  // Helper for Section Titles
  const renderSectionHeader = (title: string) => {
    checkPageBreak(15);
    doc.setFont("times", "bold");
    doc.setFontSize(13);
    doc.setTextColor(0, 50, 150); // elegant dark blue
    doc.text(title, margin, y);
    doc.setTextColor(0, 0, 0);
    y += 2.5;
    
    // Draw horizontal rule
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  // 2. Professional Summary
  renderSectionHeader("Professional Summary");
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  
  const summaryText = 
    "Software Engineer specializing in React Native, React.js, Java, Python, and AI-powered software solutions. " +
    "Experienced in developing cross-platform mobile applications, responsive web applications, computer vision systems, " +
    "and REST API integrations. Passionate about building scalable software with clean architecture, modern UI/UX, " +
    "and efficient backend services. Strong analytical and problem-solving skills with hands-on experience delivering " +
    "real-world software engineering projects.";
    
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += (summaryLines.length * 5) + 6;

  // 3. Technical Skills
  renderSectionHeader("Technical Skills");
  
  const skills = [
    { label: "Programming Languages", value: "Java, JavaScript, Python, C++, SQL" },
    { label: "Mobile Development", value: "React Native, Expo, React Navigation" },
    { label: "Frontend", value: "React.js, HTML5, CSS3, Tailwind CSS" },
    { label: "Backend & Database", value: "Firebase, Supabase, REST APIs, SQL" },
    { label: "AI & Computer Vision", value: "OpenCV, MediaPipe, Hugging Face, Streamlit" },
    { label: "Developer Tools", value: "Git, GitHub, VS Code, Android Studio" }
  ];

  skills.forEach(skill => {
    checkPageBreak(6);
    doc.setFont("times", "bold");
    doc.text(skill.label + ":", margin, y);
    doc.setFont("times", "normal");
    
    const valueX = margin + 45;
    const valueWidth = contentWidth - 45;
    const skillLines = doc.splitTextToSize(skill.value, valueWidth);
    doc.text(skillLines, valueX, y);
    y += Math.max(skillLines.length * 5, 5.5);
  });
  y += 3;

  // 4. Technical Projects
  renderSectionHeader("Technical Projects");

  const projects = [
    {
      title: "Food Delivery Mobile App (React Native)",
      points: [
        "Built a modern cross-platform food delivery application using React Native and Expo.",
        "Designed responsive mobile UI with reusable components.",
        "Implemented navigation, authentication and scalable application architecture.",
        "Integrated backend services for real-world deployment."
      ]
    },
    {
      title: "AeroPuzzle (AI Gesture-Controlled Puzzle Game)",
      points: [
        "Developed an AI-powered puzzle game controlled entirely by hand gestures.",
        "Implemented real-time hand tracking using MediaPipe.",
        "Enabled drag-and-drop interaction using OpenCV.",
        "Improved user engagement through touchless interaction.",
        "Tech Stack: Python, OpenCV, MediaPipe"
      ]
    },
    {
      title: "AI Smart Vision System",
      points: [
        "Developed an intelligent vision assistant using Python.",
        "Implemented Image Captioning, Natural Language Processing and Text-to-Speech.",
        "Integrated Hugging Face AI models with Streamlit.",
        "Built an interactive AI-powered user interface."
      ]
    },
    {
      title: "Library Management System",
      points: [
        "Designed and developed a responsive library management web portal.",
        "Implemented student/librarian registration, book search catalog, and due date tracking modules.",
        "Focused on clean UI, modular architecture, and Firebase Firestore."
      ]
    },
    {
      title: "Flight Route Optimizer",
      points: [
        "Implemented Dijkstra's Algorithm to determine the shortest flight routes.",
        "Optimized graph traversal for efficient route computation."
      ]
    },
    {
      title: "Air Drawing System",
      points: [
        "Developed a virtual drawing application using hand gesture recognition.",
        "Supported drawing, erasing and canvas reset through gestures.",
        "Implemented real-time hand tracking using MediaPipe and OpenCV."
      ]
    }
  ];

  projects.forEach((proj, index) => {
    // Check height before rendering next project block
    checkPageBreak(12);
    
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.text(proj.title, margin, y);
    y += 5.5;

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    
    proj.points.forEach(pt => {
      const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
      checkPageBreak(ptLines.length * 5 + 1);
      
      // Draw bullet point
      doc.text("•", margin + 2, y);
      doc.text(ptLines, margin + 6, y);
      y += (ptLines.length * 4.8) + 1;
    });
    y += 3.5;
  });

  // 5. Education
  renderSectionHeader("Education");
  checkPageBreak(15);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("BS Software Engineering", margin, y);
  
  doc.setFont("times", "normal");
  doc.text("2024 - Present", pageWidth - margin, y, { align: "right" });
  y += 5;
  
  doc.setFontSize(10);
  doc.text("COMSATS University Islamabad (Sahiwal Campus)", margin, y);
  y += 5;
  
  doc.setFont("times", "bold");
  doc.text("CGPA: 3.37 / 4.00", margin, y);
  y += 9;

  // 6. Achievements & Certifications
  renderSectionHeader("Achievements & Certifications");
  doc.setFont("times", "normal");
  doc.setFontSize(10);

  const achievements = [
    "SOFTEC'26 - Web Development Competition Participant",
    "NASA Space Apps Challenge Participant",
    "Harvard CS50x Puzzle Day Participant",
    "Solved 35+ LeetCode Programming Problems",
    "Published Multiple Software Projects on GitHub",
    "React Native, React.js and AI Application Developer"
  ];

  achievements.forEach(ach => {
    const achLines = doc.splitTextToSize(ach, contentWidth - 6);
    checkPageBreak(achLines.length * 5 + 1);
    doc.text("•", margin + 2, y);
    doc.text(achLines, margin + 6, y);
    y += (achLines.length * 4.8) + 1;
  });
  y += 5;

  // 7. Languages
  renderSectionHeader("Languages");
  checkPageBreak(12);
  
  doc.setFont("times", "bold");
  doc.text("English", margin, y);
  doc.setFont("times", "normal");
  doc.text("Professional Working Proficiency", pageWidth - margin, y, { align: "right" });
  y += 5;

  doc.setFont("times", "bold");
  doc.text("Urdu", margin, y);
  doc.setFont("times", "normal");
  doc.text("Native", pageWidth - margin, y, { align: "right" });
  y += 9;

  // 8. Interests
  renderSectionHeader("Interests");
  checkPageBreak(12);
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  const interestsText = "React Native Development  •  Artificial Intelligence  •  Computer Vision  •  Mobile App Development  •  Open Source";
  doc.text(interestsText, margin, y);

  // Save the PDF
  doc.save("Ahmad_Raza_Resume.pdf");
}
