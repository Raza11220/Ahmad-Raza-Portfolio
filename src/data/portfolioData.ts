import nasaCertImg from "../assets/images/nasa_certificate_1783173792875.jpg";
import cs50CertImg from "../assets/images/cs50_certificate_1783173808527.jpg";
import softecCertImg from "../assets/images/softec_certificate_1783173824920.jpg";

import foodDeliveryProjImg from "../assets/images/food_delivery_project_1783174914261.jpg";
import aeroPuzzleProjImg from "../assets/images/aero_puzzle_project_1783174932900.jpg";
import aiVisionProjImg from "../assets/images/ai_vision_project_1783174949586.jpg";
import librarySystemProjImg from "../assets/images/library_system_project_1783174964808.jpg";
import flightOptimizerProjImg from "../assets/images/flight_optimizer_project_1783174981701.jpg";
import airDrawingProjImg from "../assets/images/air_drawing_project_1783174999872.jpg";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "mobile" | "web" | "ai" | "all";
  image: string;
  tags: string[];
  features: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; iconName: string }[];
}

export interface Service {
  title: string;
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  tags: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  credentialUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Ahmad Raza",
  title: "Software Engineer",
  subtitle: "React.js & React Native Developer",
  location: "Pakistan",
  email: "cathode1122@gmail.com", // From metadata or resume
  phone: "+92-329-6155253", // From resume OCR
  github: "https://github.com/Raza11220",
  linkedin: "https://linkedin.com/in/ahmad-raza112200",
  resumeName: "Ahmad_Resume.pdf",
  summary: "Software Engineer specializing in React Native, React.js, Java, Python, and AI-powered software solutions. Experienced in developing cross-platform mobile applications, responsive web applications, computer vision systems, and REST API integrations. Passionate about building scalable software with clean architecture, modern UI/UX, and efficient backend services.",
};

export const STATISTICS = [
  { value: "15+", label: "Projects Completed", id: "stats-projects" },
  { value: "20+", label: "Technologies Mastered", id: "stats-tech" },
  { value: "10+", label: "Certificates & Achievements", id: "stats-certs" },
  { value: "500+", label: "GitHub Commits", id: "stats-commits" }
];

export const SKILL_CATEGORIES: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 90, iconName: "Atom" },
      { name: "React Native", level: 85, iconName: "Smartphone" },
      { name: "JavaScript", level: 90, iconName: "Code2" },
      { name: "Tailwind CSS", level: 95, iconName: "Palette" },
      { name: "Redux Toolkit", level: 80, iconName: "Layers" },
      { name: "HTML5 / CSS3", level: 95, iconName: "Globe" }
    ]
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Firebase", level: 85, iconName: "Flame" },
      { name: "REST APIs", level: 90, iconName: "Cpu" },
      { name: "Node.js", level: 75, iconName: "Server" },
      { name: "Express.js", level: 75, iconName: "FileJson" },
      { name: "MongoDB", level: 70, iconName: "Database" },
      { name: "MySQL / SQL", level: 80, iconName: "Database" }
    ]
  },
  {
    category: "Programming & AI",
    skills: [
      { name: "Java", level: 80, iconName: "Coffee" },
      { name: "Python", level: 85, iconName: "Terminal" },
      { name: "C++ / C", level: 75, iconName: "Code" },
      { name: "OpenCV", level: 80, iconName: "Eye" },
      { name: "MediaPipe", level: 80, iconName: "Scissors" }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git & GitHub", level: 90, iconName: "Github" },
      { name: "VS Code", level: 95, iconName: "Code2" },
      { name: "Android Studio", level: 85, iconName: "Smartphone" },
      { name: "Expo", level: 90, iconName: "Smartphone" },
      { name: "Postman", level: 90, iconName: "Send" },
      { name: "Figma", level: 75, iconName: "Figma" }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    title: "React.js Development",
    description: "Building fast, high-performance, responsive single-page web applications using React, Vite, and tailwind styling.",
    iconName: "Atom"
  },
  {
    title: "React Native Development",
    description: "Creating premium, cross-platform Android and iOS mobile applications with Expo, React Navigation, and native fluid animations.",
    iconName: "Smartphone"
  },
  {
    title: "Responsive Websites",
    description: "Designing modern, pixel-perfect layouts optimizing for mobile, tablet, laptop, and ultra-wide screens.",
    iconName: "Monitor"
  },
  {
    title: "REST API Integration",
    description: "Integrating complex backend structures, real-time web services, and third-party SaaS APIs cleanly and securely.",
    iconName: "Cpu"
  },
  {
    title: "Firebase Services",
    description: "Configuring real-time databases, authentication flows, Firestore, cloud functions, and analytics dashboards.",
    iconName: "Flame"
  },
  {
    title: "Performance Optimization",
    description: "Minimizing bundle sizes, debugging React renders, lazy loading components, and optimizing asset delivery for maximum speeds.",
    iconName: "Zap"
  },
  {
    title: "Bug Fixing & Refactoring",
    description: "Analyzing existing codebases, resolving difficult React state bugs, upgrading packages, and refactoring to clean SOLID principles.",
    iconName: "Bug"
  },
  {
    title: "Modern UI Development",
    description: "Translating Figma designs into premium, micro-interactive, animated interfaces built on top of modern styling rules.",
    iconName: "Sparkles"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "food-delivery",
    title: "Food Delivery Mobile App",
    subtitle: "React Native & Expo App",
    category: "mobile",
    description: "A modern, responsive cross-platform food delivery mobile application built using React Native and Expo.",
    longDescription: "A fully featured mobile application for food ordering. It features a beautifully polished, fluid user interface with micro-interactions, smooth sliding transitions, food categorization, item search, custom cart state management, and simulated ordering checkout workflows.",
    image: foodDeliveryProjImg,
    tags: ["React Native", "Expo", "React Navigation", "Tailwind CSS", "Redux"],
    features: [
      "Responsive custom grid layouts with touch-friendly gestures",
      "Dynamic cart accumulation and calculation state engine",
      "Robust client-side navigation using React Navigation",
      "Real-time filter and searching across multiple menus",
      "Clean modular component design facilitating easy styling updates"
    ],
    githubUrl: "https://github.com/Raza11220",
    demoUrl: "https://github.com/Raza11220"
  },
  {
    id: "aeropuzzle",
    title: "AeroPuzzle",
    subtitle: "AI Gesture-Controlled Puzzle Game",
    category: "ai",
    description: "An AI-powered puzzle game controlled entirely by real-time hand gestures without touching the device.",
    longDescription: "AeroPuzzle uses cutting-edge computer vision to track fingers and hands to enable gesture-based controls. Users can drag, drop, rotate, and assemble puzzle pieces on screen by simply pinching or moving their hands in the air. Perfect touchless interactions powered by OpenCV and MediaPipe.",
    image: aeroPuzzleProjImg,
    tags: ["Python", "OpenCV", "MediaPipe", "NumPy", "AI / CV"],
    features: [
      "Real-time high-fidelity hand joint tracking using MediaPipe",
      "Touchless drag-and-drop algorithms using coordinate mappings",
      "Dynamic puzzle-piece clipping and random shuffling",
      "Optimized framerates supporting real-time responsive gameplay",
      "Interactive feedback indicators when hands enter active regions"
    ],
    githubUrl: "https://github.com/Raza11220",
    demoUrl: "https://github.com/Raza11220"
  },
  {
    id: "ai-smart-vision",
    title: "AI Smart Vision System",
    subtitle: "Intelligent Computer Vision Assistant",
    category: "ai",
    description: "An intelligent vision assistant capable of image captioning, natural language processing, and text-to-speech feedback.",
    longDescription: "This software integrates advanced AI transformer models to 'see' and describe the physical environment. Users can stream or upload media, which is then parsed by Hugging Face models to output natural descriptions, answer specific questions about the scene, and read answers out loud.",
    image: aiVisionProjImg,
    tags: ["Python", "Hugging Face", "Streamlit", "Text-to-Speech", "NLP"],
    features: [
      "Automatic high-fidelity image description & captioning pipeline",
      "Visual Question Answering (VQA) utilizing open-source transformers",
      "Smooth web frontend built on Streamlit for live demonstrations",
      "Local audio synthesis outputting generated visual descriptions",
      "Modular design allowing hot-swapping of computer vision backends"
    ],
    githubUrl: "https://github.com/Raza11220",
    demoUrl: "https://github.com/Raza11220"
  },
  {
    id: "library-management",
    title: "Library Management System",
    subtitle: "Full-scale Book Catalog & Lending Portal",
    category: "web",
    description: "A secure, responsive web portal for managing book inventory, borrowing logs, and member accounts.",
    longDescription: "A comprehensive digital library system designed to optimize school and community book lending workflows. Librarians get full admin dashboards to monitor due dates and fine collections, while members get an interactive search and reservation system.",
    image: librarySystemProjImg,
    tags: ["React.js", "Tailwind CSS", "Firebase Auth", "Firestore", "Context API"],
    features: [
      "Role-based secure authentication (Librarian admin and Student member portals)",
      "Interactive digital book catalog with title and author search filters",
      "Automated borrowing transaction records and return due-date notifications",
      "Durable reservation queue for high-demand reading materials",
      "Elegant responsive metrics dashboards for overall library utilization"
    ],
    githubUrl: "https://github.com/Raza11220",
    demoUrl: "https://github.com/Raza11220"
  },
  {
    id: "flight-route",
    title: "Flight Route Optimizer",
    subtitle: "Shortest Path Graph Traverse Engine",
    category: "web",
    description: "An optimization system running Dijkstra's Algorithm to determine the shortest and cheapest flight routes between global airports.",
    longDescription: "Built with computer science and graph theory principles, this flight optimizer constructs nodes (airports) and weighted edges (fuel cost, flight times, layovers). Users input start/end locations, and the system instantly traverses the tree to deliver optimal paths visually.",
    image: flightOptimizerProjImg,
    tags: ["Java", "Data Structures", "Dijkstra Algorithm", "Graphs", "GUI"],
    features: [
      "Dynamic graph generation with interactive custom additions",
      "Shortest route mapping based on Dijkstra's single-source paths",
      "Optimization parameters (minimize cost, time, or layovers)",
      "Visual display of the traversed routing tree",
      "Optimized graph traversal speed supporting 500+ standard airports"
    ],
    githubUrl: "https://github.com/Raza11220",
    demoUrl: "https://github.com/Raza11220"
  },
  {
    id: "air-drawing",
    title: "Air Drawing System",
    subtitle: "Hand-Gesture Interactive Virtual Canvas",
    category: "ai",
    description: "A virtual drawing application tracking real-time finger coordination to sketch on air, powered by hand gestures.",
    longDescription: "An innovative digital sketchpad that allows you to paint or write on your screen by waving your finger in front of your webcam. Uses hand gesture recognition to support drawing lines, changing brush strokes, changing colors, erasing, and clearing the canvas.",
    image: airDrawingProjImg,
    tags: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    features: [
      "Color brush palette selection triggered by finger distance overlays",
      "Precise finger tip coordinate tracking avoiding jitter",
      "Gesture-triggered erasing and instant full canvas resets",
      "Framerated real-time drawing overlay directly on top of camera stream",
      "Fully self-contained app executable running with zero latency"
    ],
    githubUrl: "https://github.com/Raza11220",
    demoUrl: "https://github.com/Raza11220"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "BS Software Engineering",
    company: "COMSATS University Islamabad (Sahiwal Campus)",
    duration: "2024 - Present",
    description: [
      "Acquiring high-level knowledge of Computer Science, Software Architecture, and OOP.",
      "Maintaining an excellent academic record with a current CGPA of 3.37 / 4.00.",
      "Leading collaborative team projects and representing the department in regional hackathons."
    ],
    tags: ["Software Engineering", "Java", "Python", "Data Structures", "OOP"]
  },
  {
    id: "exp-2",
    role: "Personal Software Engineering Projects",
    company: "Independent Developer",
    duration: "2024 - Present",
    description: [
      "Architected, built, and deployed high-performance responsive web applications using React.js and Tailwind.",
      "Created modern cross-platform mobile apps using React Native and Expo.",
      "Engineered machine learning pipelines, hand tracking games, and smart vision applications."
    ],
    tags: ["React Native", "React.js", "OpenCV", "Firebase", "State Management"]
  },
  {
    id: "exp-3",
    role: "Hackathons & Tech Competitions",
    company: "Participant & Competitor",
    duration: "2025 - Present",
    description: [
      "Active participant in SOFTEC '26 - regional Web Development Competition.",
      "Engaged in NASA Space Apps Challenge, solving global environmental hurdles using satellite imagery.",
      "Competed in Harvard CS50x Puzzle Day, resolving complex logical algorithms.",
      "Solved 35+ advanced programming problems on LeetCode focusing on sorting, graph, and tree traversals."
    ],
    tags: ["Hackathons", "Problem Solving", "Dijkstra", "Algorithm Optimization", "NASA Space Apps"]
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-softec",
    title: "SOFTEC'26 Competitor",
    issuer: "SOFTEC FAST-NU Lahore",
    date: "2026",
    description: "Competed in the prestigious national-level Web Development competition, building real-time applications under tight time constraints.",
    image: softecCertImg,
    credentialUrl: "https://github.com/Raza11220"
  },
  {
    id: "cert-nasa",
    title: "NASA Space Apps Challenge Participant",
    issuer: "NASA Space Apps Team",
    date: "2025",
    description: "Participated in the worldwide hackathon, designing spatial analysis solutions and visual dashboards for NASA global mapping challenges.",
    image: nasaCertImg,
    credentialUrl: "https://github.com/Raza11220"
  },
  {
    id: "cert-harvard",
    title: "Harvard CS50x Puzzle Day",
    issuer: "Harvard University CS50 Team",
    date: "2026",
    description: "Successfully solved a series of intense logical puzzle challenges alongside global students testing modular design and problem solving.",
    image: cs50CertImg,
    credentialUrl: "https://github.com/Raza11220"
  }
];
