import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Cell, Legend, AreaChart, Area } from "recharts";
import { Award, BookOpen, FileCheck, Upload, User, ChevronDown, ChevronRight, TrendingUp, Star, Shield, Zap, Eye, Target, Layers, Activity, AlertCircle, CheckCircle2, Clock, ArrowUpRight, BarChart3, Info, ExternalLink, Lightbulb, Compass, GraduationCap, Briefcase, Trophy, PenTool, Search, MessageSquare, Users, Brain, Rocket, Sparkles, ChevronUp, X } from "lucide-react";
import programData from "./data/program-data.json";

// ─── PROGRAM DATA (from BSUXD Program Guidebook, Catalog 202510, Published 7/2/2025) ──
// Source: Standard Path for Bachelor of Science, User Experience Design — 38 courses, 115 CUs, 10 terms
// Areas of Study: Business Management, General Education, Power Skills, Business Core, Design, Human Resources
const PROGRAM_COURSES = [
  // ── Term 1 (12 CU) ──
  { code: "C715", title: "Organizational Behavior", term: 1, type: "bus-mgmt", credits: 3 },
  { code: "D268", title: "Introduction to Communication: Connecting with Others", term: 1, type: "gen-ed", credits: 3 },
  { code: "D640", title: "Giving, Receiving and Incorporating Feedback", term: 1, type: "power", credits: 3 },
  { code: "D082", title: "Emotional and Cultural Intelligence", term: 1, type: "bus-core", credits: 3 },
  // ── Term 2 (12 CU) ──
  { code: "D081", title: "Innovative and Strategic Thinking", term: 2, type: "bus-core", credits: 3 },
  { code: "D651", title: "Foundations of Design", term: 2, type: "design", credits: 3 },
  { code: "D265", title: "Critical Thinking: Reason and Evidence", term: 2, type: "gen-ed", credits: 3 },
  { code: "D641", title: "Adapting to Ambiguity", term: 2, type: "power", credits: 3 },
  // ── Term 3 (12 CU) ──
  { code: "D653", title: "Empathizing, Defining, and Ideating", term: 3, type: "design", credits: 3 },
  { code: "C483", title: "Principles of Management", term: 3, type: "bus-core", credits: 4 },
  { code: "D642", title: "Empathy and Inclusive Collaboration", term: 3, type: "power", credits: 3 },
  { code: "D078", title: "Business Environment Applications I: Business Structures and Legal Environment", term: 3, type: "bus-core", credits: 2 },
  // ── Term 4 (12 CU) ──
  { code: "D388", title: "Fundamentals of Spreadsheets and Data Presentations", term: 4, type: "bus-core", credits: 3 },
  { code: "D774", title: "Introduction to Business Accounting", term: 4, type: "bus-core", credits: 3 },
  { code: "D269", title: "Composition: Writing with a Strategy", term: 4, type: "gen-ed", credits: 3 },
  { code: "D643", title: "Navigating Complex Problems", term: 4, type: "power", credits: 3 },
  // ── Term 5 (12 CU) ──
  { code: "D459", title: "Introduction to Systems Thinking and Applications", term: 5, type: "gen-ed", credits: 3 },
  { code: "D775", title: "Introduction to Business Finance", term: 5, type: "bus-core", credits: 3 },
  { code: "D246", title: "Influential Communication through Visual Design and Storytelling", term: 5, type: "gen-ed", credits: 3 },
  { code: "D652", title: "Design Applications", term: 5, type: "design", credits: 3 },
  // ── Term 6 (12 CU) ──
  { code: "D079", title: "Business Environment Applications II: Process, Logistics, and Operations", term: 6, type: "bus-core", credits: 2 },
  { code: "C458", title: "Health, Fitness, and Wellness", term: 6, type: "gen-ed", credits: 4 },
  { code: "C722", title: "Project Management", term: 6, type: "bus-mgmt", credits: 3 },
  { code: "C721", title: "Change Management", term: 6, type: "bus-mgmt", credits: 3 },
  // ── Term 7 (12 CU) ──
  { code: "C273", title: "Introduction to Sociology", term: 7, type: "gen-ed", credits: 3 },
  { code: "D077", title: "Concepts in Marketing, Sales, and Customer Contact", term: 7, type: "bus-core", credits: 3 },
  { code: "C165", title: "Integrated Physical Sciences", term: 7, type: "gen-ed", credits: 3 },
  { code: "D654", title: "Prototyping and Iterating I", term: 7, type: "design", credits: 3 },
  // ── Term 8 (12 CU) ──
  { code: "D655", title: "Prototyping and Iterating II", term: 8, type: "design", credits: 3 },
  { code: "C955", title: "Applied Probability and Statistics", term: 8, type: "gen-ed", credits: 3 },
  { code: "D266", title: "World History: Diverse Cultures and Global Connections", term: 8, type: "gen-ed", credits: 3 },
  { code: "D089", title: "Principles of Economics", term: 8, type: "bus-core", credits: 3 },
  // ── Term 9 (13 CU) ──
  { code: "D351", title: "Functions of Human Resource Management", term: 9, type: "hr", credits: 3 },
  { code: "D656", title: "Leveraging AI and Technology in Design", term: 9, type: "design", credits: 3 },
  { code: "D080", title: "Managing in a Global Business Environment", term: 9, type: "bus-core", credits: 3 },
  { code: "D361", title: "Business Simulation", term: 9, type: "bus-core", credits: 4 },
  // ── Term 10 (6 CU) ──
  { code: "D253", title: "Values-Based Leadership", term: 10, type: "bus-mgmt", credits: 3 },
  { code: "D657", title: "Design Applied Learning Capstone", term: 10, type: "design", credits: 3 },
];

const SKILL_DOMAINS = [
  { id: "design-core", name: "Design Core", color: "#E85D3A", icon: "\u{1F3A8}",
    skills: ["User Experience (UX) Design", "User-Centered Design", "Design Thinking", "Visual Design", "Graphic Design", "Computer-Aided Design", "Prototyping", "Design Tool"] },
  { id: "research", name: "Research & Insights", color: "#2D9CDB", icon: "\u{1F50D}",
    skills: ["User Research", "Research", "Audience Segmentation", "Sensemaking", "Analytical Skills", "Data Analysis"] },
  { id: "communication", name: "Communication", color: "#27AE60", icon: "\u{1F4AC}",
    skills: ["Communication", "Professional Communication", "Communication Strategies", "Storytelling", "Content Strategy", "Constructive Feedback"] },
  { id: "collaboration", name: "Collaboration & Leadership", color: "#9B51E0", icon: "\u{1F91D}",
    skills: ["Collaboration", "Collaborative Learning", "Leadership", "Emotional Intelligence", "Empathy", "Active Listening", "Cultural Diversity", "Diversity Awareness"] },
  { id: "problem-solving", name: "Problem Solving", color: "#F2994A", icon: "\u{1F9E9}",
    skills: ["Problem Solving", "Creative Problem-Solving", "Critical Thinking", "Decision Making", "Creative Thinking", "Innovation", "Systems Thinking"] },
  { id: "professional", name: "Professional Growth", color: "#EB5757", icon: "\u{1F4C8}",
    skills: ["Career Development", "Professional Development", "Adaptability", "Planning", "Brand Management", "Electronic Portfolio", "Experiential Learning"] },
  { id: "technology", name: "Technology & AI", color: "#00B4D8", icon: "\u{1F916}",
    skills: ["Artificial Intelligence (AI)", "Technology Ethics"] },
];

const EVIDENCE_TYPES = {
  assessment: { label: "Assessment", weight: 1.0, color: "#E85D3A", icon: FileCheck, desc: "Course assessments evaluated by faculty" },
  workProduct: { label: "Work Product", weight: 0.85, color: "#2D9CDB", icon: Upload, desc: "Submitted artifacts judged against RSD" },
  credential: { label: "External Credential", weight: 0.75, color: "#27AE60", icon: Award, desc: "Industry certifications and badges" },
  selfAttested: { label: "Self-Attested", weight: 0.45, color: "#9B51E0", icon: User, desc: "Skills claimed via resume or profile" },
};

const PROGRAM_SOURCE_INDEX = Object.fromEntries(programData.courses.map((course) => [course.code, course]));
const TOP_CATEGORY_COVERAGE = programData.categories
  .slice(0, 6)
  .map((category) => ({
    ...category,
    shortName: category.name.length > 18 ? `${category.name.slice(0, 18)}…` : category.name,
  }));
const TOP_MAPPED_COURSES = [...programData.courses]
  .sort((a, b) => b.skillCount - a.skillCount)
  .slice(0, 5);
const STATIC_SOURCE_FILES = [
  {
    label: "Course Skills Workbook",
    href: `${import.meta.env.BASE_URL}assets/course-skills.xlsx`,
    meta: `${programData.summary.courseCount} courses · ${programData.summary.mappingCount} mappings`,
    icon: FileCheck,
    color: "#2D9CDB",
  },
  {
    label: "Reference PDF",
    href: `${import.meta.env.BASE_URL}assets/document-reference.pdf`,
    meta: "Attached source document committed with the repo",
    icon: BookOpen,
    color: "#E85D3A",
  },
];

// RSD citation mappings
const RSD_CITATIONS = {
  "User Experience (UX) Design": { uri: "https://osmt.wgu.edu/api/collections/f5910830-a387-446a-9b00-86eb141d1d36", statement: "Apply user experience design principles to create effective digital interfaces.", collection: "Product and Experience Design" },
  "User-Centered Design": { uri: "https://osmt.wgu.edu/api/collections/f5910830-a387-446a-9b00-86eb141d1d36", statement: "Apply user-centered design methodologies to solve design problems.", collection: "Product and Experience Design" },
  "Design Thinking": { uri: "https://osmt.wgu.edu/api/collections/f5910830-a387-446a-9b00-86eb141d1d36", statement: "Apply design thinking frameworks to identify and solve complex problems.", collection: "Product and Experience Design" },
  "Visual Design": { uri: "https://osmt.wgu.edu/api/collections/f5910830-a387-446a-9b00-86eb141d1d36", statement: "Apply visual design principles including typography, color theory, and composition.", collection: "Product and Experience Design" },
  "Prototyping": { uri: "https://osmt.wgu.edu/api/collections/f5910830-a387-446a-9b00-86eb141d1d36", statement: "Create prototypes to test and validate design solutions.", collection: "Product and Experience Design" },
  "User Research": { uri: "https://osmt.wgu.edu/api/collections/f5910830-a387-446a-9b00-86eb141d1d36", statement: "Conduct user research to inform design decisions.", collection: "Product and Experience Design" },
  "Research": { uri: "https://osmt.wgu.edu/api/collections/7826aee6-7147-4bc5-bdf3-0557fc321152", statement: "Apply research methodologies to investigate questions systematically.", collection: "Educational Research" },
  "Communication": { uri: "https://osmt.wgu.edu/api/collections/3eb92ca5-ffe2-42e0-b029-2809609d4418", statement: "Communicate effectively across professional contexts.", collection: "Professional Communication" },
  "Critical Thinking": { uri: "https://osmt.wgu.edu/api/collections/80be6819-cf5d-44c7-ad5e-3645c7bf8bf0", statement: "Apply critical thinking to evaluate information and make reasoned judgments.", collection: "Career and Workforce Readiness" },
  "Collaboration": { uri: "https://osmt.wgu.edu/api/collections/80be6819-cf5d-44c7-ad5e-3645c7bf8bf0", statement: "Collaborate effectively with diverse teams to achieve shared goals.", collection: "Career and Workforce Readiness" },
  "Artificial Intelligence (AI)": { uri: "https://osmt.wgu.edu/api/collections/7bfe0550-a69e-42a7-b7f1-b5c23517a516", statement: "Apply foundational AI concepts and tools to solve problems.", collection: "AI Foundational Skills" },
  "Technology Ethics": { uri: "https://osmt.wgu.edu/api/collections/7bfe0550-a69e-42a7-b7f1-b5c23517a516", statement: "Evaluate ethical implications of technology use and design.", collection: "AI Foundational Skills" },
  "Leadership": { uri: "https://osmt.wgu.edu/api/collections/b5b99d44-9feb-4588-8f35-291aa148101c", statement: "Demonstrate leadership behaviors that influence and inspire others.", collection: "Organizational Leadership" },
  "Emotional Intelligence": { uri: "https://osmt.wgu.edu/api/collections/b5b99d44-9feb-4588-8f35-291aa148101c", statement: "Apply emotional intelligence to manage relationships and navigate social situations.", collection: "Organizational Leadership" },
  "Problem Solving": { uri: "https://osmt.wgu.edu/api/collections/80be6819-cf5d-44c7-ad5e-3645c7bf8bf0", statement: "Identify, analyze, and solve problems using structured approaches.", collection: "Career and Workforce Readiness" },
  "Career Development": { uri: "https://osmt.wgu.edu/api/collections/3321beea-febd-4139-b3f4-7f14c4707618", statement: "Manage career growth through continuous learning and professional development.", collection: "Professional Development and Career Management" },
  "Storytelling": { uri: "https://osmt.wgu.edu/api/collections/85898eab-70d1-4413-93ce-8c54f57602e0", statement: "Craft compelling narratives to communicate ideas effectively.", collection: "Strategic Communication" },
  "Innovation": { uri: "https://osmt.wgu.edu/api/collections/4f8095e2-afb0-48cf-bb30-d1d135899355", statement: "Generate and implement innovative solutions to challenges.", collection: "Entrepreneurs" },
  "Data Analysis": { uri: "https://osmt.wgu.edu/api/collections/e184627b-cf2c-4d07-8d72-294069ca15cd", statement: "Analyze data to extract insights and inform decision-making.", collection: "Data Analysts" },
  "Adaptability": { uri: "https://osmt.wgu.edu/api/collections/80be6819-cf5d-44c7-ad5e-3645c7bf8bf0", statement: "Adapt to changing circumstances and ambiguous situations effectively.", collection: "Career and Workforce Readiness" },
};

// Rationale templates
const RATIONALE_TEMPLATES = {
  assessment: {
    "User Experience (UX) Design": ["Performance assessment in {course} evaluated ability to apply UX design heuristics and produce user-centered artifacts. The task rubric directly maps to the RSD 'Apply user experience design principles to create effective digital interfaces.'", "Objective assessment in {course} tested knowledge of UX patterns, interaction design vocabulary, and usability principles aligned with program competency 'User Experience Design Foundations.'"],
    "Design Thinking": ["Assessment in {course} required demonstration of the full design thinking cycle (empathize, define, ideate, prototype, test). Rubric criteria mapped to RSD 'Apply design thinking frameworks.'"],
    "Critical Thinking": ["Assessment in {course} evaluated ability to analyze evidence, identify logical fallacies, and construct sound arguments. Mapped to the competency statement 'The learner applies principles of critical thinking and logic.'"],
    "Prototyping": ["Performance task in {course} required creation of low-fi and high-fi prototypes with iterative refinement cycles. Evaluated against RSD 'Create prototypes to test and validate design solutions.'"],
    "Communication": ["Assessment in {course} evaluated clarity, structure, and audience-awareness of written and visual communication artifacts. Mapped to RSD 'Communicate effectively across professional contexts.'"],
    "_default": ["Assessment in {course} included competency items directly aligned with the skill '{skill}' through course-level learning objectives mapped to the program RSD taxonomy."],
  },
  workProduct: {
    "User Experience (UX) Design": ["Submitted UX case study demonstrates end-to-end design process including research synthesis, wireframing, and usability testing results. Evaluated against RSD criteria for user-centered digital interface design."],
    "Visual Design": ["Portfolio artifact demonstrates applied knowledge of visual hierarchy, typography systems, and color theory. Reviewed against RSD 'Apply visual design principles including typography, color theory, and composition.'"],
    "User Research": ["Submitted research report includes interview protocol, affinity mapping, and persona development. Evaluated against RSD 'Conduct user research to inform design decisions.'"],
    "Prototyping": ["Interactive prototype submission (Figma) demonstrates navigation flows, micro-interactions, and responsive breakpoints. Inferred proficiency based on artifact complexity and alignment with RSD prototyping criteria."],
    "Storytelling": ["Case study narrative demonstrates ability to structure a design story with problem framing, process documentation, and impact metrics. Evaluated against RSD 'Craft compelling narratives.'"],
    "_default": ["Work product demonstrates applied competency in '{skill}' through artifact quality, completeness, and alignment with the relevant Rich Skill Descriptor. Proficiency inferred from RSD rubric evaluation."],
  },
  credential: {
    "User Experience (UX) Design": ["Nielsen Norman Group UX Certification validates externally-assessed competency in UX fundamentals, research methods, and interaction design. Credential issuer is an industry-recognized authority."],
    "Prototyping": ["Nielsen Norman Group UX Certification includes validated assessment of prototyping methodology and iterative design. Recognized industry credential."],
    "Artificial Intelligence (AI)": ["Google AI Essentials certificate validates foundational competency in AI concepts, prompt engineering, and responsible AI use. Issued by Google through Coursera with proctored assessment."],
    "_default": ["External credential validates competency in '{skill}' through third-party assessment. Weight reflects that credential scope may not perfectly align with program-specific RSD criteria."],
  },
  selfAttested: { "_default": ["Skill '{skill}' claimed on student's resume / skills profile. Self-attestation receives lowest weighting (0.45) as it lacks external validation. Proficiency score is estimated from stated experience level and context."] },
};

// Recommendation database
const RECOMMENDATION_DB = {
  "User Experience (UX) Design": { projects: [{ title: "Redesign a Local Non-Profit Website", desc: "Partner with a community organization to conduct a full UX audit and redesign. Document research, wireframes, and usability test results as a case study.", impact: "high", effort: "high", evidenceType: "workProduct", estimatedGain: 12 }, { title: "Daily UI Challenge (30 days)", desc: "Complete the dailyui.co challenge. Curate your best 10 pieces into a portfolio case study with rationale for each design decision.", impact: "medium", effort: "medium", evidenceType: "workProduct", estimatedGain: 7 }], credentials: [{ title: "Google UX Design Certificate", issuer: "Google / Coursera", desc: "7-course professional certificate covering UX foundations, wireframing, prototyping, and research.", url: "https://www.coursera.org/professional-certificates/google-ux-design", estimatedGain: 10 }], courses: ["D651", "D652", "D654"] },
  "User-Centered Design": { projects: [{ title: "Accessibility Audit Project", desc: "Conduct a WCAG 2.1 accessibility audit on an existing product. Deliver a findings report with prioritized remediation recommendations.", impact: "high", effort: "medium", evidenceType: "workProduct", estimatedGain: 10 }], credentials: [{ title: "IAAP CPACC Certification", issuer: "IAAP", desc: "Globally recognized accessibility certification demonstrating user-centered inclusive design knowledge.", url: "https://www.accessibilityassociation.org/cpacccertification", estimatedGain: 8 }], courses: ["D651", "D653"] },
  "Design Thinking": { projects: [{ title: "Design Sprint for a Real Problem", desc: "Facilitate a 5-day design sprint (GV model) with peers or community partners. Document each phase with photos, artifacts, and outcomes.", impact: "high", effort: "high", evidenceType: "workProduct", estimatedGain: 14 }, { title: "How Might We Workshop Facilitation", desc: "Plan and facilitate an HMW ideation session for a student org or local business. Record the session and write a reflection.", impact: "medium", effort: "low", evidenceType: "workProduct", estimatedGain: 6 }], credentials: [], courses: ["D651", "D653"] },
  "Visual Design": { projects: [{ title: "Brand Identity System", desc: "Create a comprehensive brand identity including logo, type system, color palette, iconography, and usage guidelines for a fictional or real startup.", impact: "high", effort: "high", evidenceType: "workProduct", estimatedGain: 13 }, { title: "Data Visualization Dashboard", desc: "Design an interactive data dashboard mockup using real-world data. Demonstrate hierarchy, chart selection, and responsive layout.", impact: "medium", effort: "medium", evidenceType: "workProduct", estimatedGain: 8 }], credentials: [], courses: ["D652", "D246"] },
  "Prototyping": { projects: [{ title: "Interactive Mobile App Prototype", desc: "Build a clickable Figma prototype for a mobile app with 15+ screens, transitions, and conditional logic. Include a usability test plan and results.", impact: "high", effort: "high", evidenceType: "workProduct", estimatedGain: 12 }], credentials: [], courses: ["D654", "D655"] },
  "User Research": { projects: [{ title: "Usability Study with 5 Participants", desc: "Plan and execute a moderated usability study. Deliver a research report with task success rates, error rates, and SUS scores.", impact: "high", effort: "high", evidenceType: "workProduct", estimatedGain: 14 }, { title: "Competitive Analysis Report", desc: "Conduct a structured competitive analysis of 4-5 products. Include feature matrices, UX heuristic evaluations, and strategic recommendations.", impact: "medium", effort: "medium", evidenceType: "workProduct", estimatedGain: 8 }], credentials: [{ title: "UXQB CPUX-F Certification", issuer: "UXQB", desc: "International certification in usability engineering and user research methods.", url: "https://uxqb.org/en/certification/cpux-f/", estimatedGain: 7 }], courses: ["D653", "D654"] },
  "Communication": { projects: [{ title: "Design Presentation to Stakeholders", desc: "Prepare and deliver a 15-minute design presentation to a simulated or real stakeholder group. Record it and self-evaluate against a rubric.", impact: "medium", effort: "low", evidenceType: "workProduct", estimatedGain: 8 }], credentials: [], courses: ["D268", "D640"] },
  "Storytelling": { projects: [{ title: "UX Case Study with Narrative Arc", desc: "Write a long-form case study (2000+ words) with a clear narrative structure: context, conflict, process, resolution, impact. Publish to Medium or portfolio.", impact: "high", effort: "medium", evidenceType: "workProduct", estimatedGain: 11 }], credentials: [], courses: ["D246", "D657"] },
  "Collaboration": { projects: [{ title: "Cross-Functional Team Project", desc: "Lead or participate in a team project with members from different disciplines (dev, marketing, business). Document collaboration approach and outcomes.", impact: "high", effort: "high", evidenceType: "workProduct", estimatedGain: 10 }], credentials: [], courses: ["D642", "C722"] },
  "Emotional Intelligence": { projects: [{ title: "Reflective Journal on Team Dynamics", desc: "Maintain a structured journal over 4 weeks documenting interpersonal challenges, emotional responses, and strategies. Synthesize into a reflection essay.", impact: "medium", effort: "low", evidenceType: "workProduct", estimatedGain: 7 }], credentials: [], courses: ["D082", "D642"] },
  "Artificial Intelligence (AI)": { projects: [{ title: "AI-Augmented Design Workflow", desc: "Document a complete design project integrating AI tools (Midjourney, ChatGPT, Copilot). Evaluate efficiency gains and quality trade-offs.", impact: "high", effort: "medium", evidenceType: "workProduct", estimatedGain: 12 }], credentials: [{ title: "Google AI Essentials", issuer: "Google / Coursera", desc: "Foundational certificate covering AI concepts, prompt engineering, and responsible AI.", url: "https://www.coursera.org/learn/google-ai-essentials", estimatedGain: 9 }, { title: "IBM AI Foundations for Business", issuer: "IBM / Coursera", desc: "Specialization covering AI strategy, applications, and ethical considerations.", url: "https://www.coursera.org/specializations/ibm-ai-foundations-for-business", estimatedGain: 7 }], courses: ["D656"] },
  "Technology Ethics": { projects: [{ title: "Ethical AI Impact Assessment", desc: "Write a structured ethical impact assessment for an AI-powered product. Address bias, privacy, accessibility, and societal impact.", impact: "high", effort: "medium", evidenceType: "workProduct", estimatedGain: 10 }], credentials: [], courses: ["D656"] },
  "Problem Solving": { projects: [{ title: "Systems Mapping Exercise", desc: "Choose a complex challenge. Create a systems map identifying feedback loops, leverage points, and unintended consequences.", impact: "medium", effort: "medium", evidenceType: "workProduct", estimatedGain: 8 }], credentials: [], courses: ["D643", "D459"] },
  "Adaptability": { projects: [{ title: "Pivot Documentation", desc: "During any project, document a moment where you pivoted your approach. Write a structured reflection on the trigger, decision process, and outcome.", impact: "medium", effort: "low", evidenceType: "workProduct", estimatedGain: 6 }], credentials: [], courses: ["D641"] },
  "_default": { projects: [{ title: "Reflective Portfolio Entry", desc: "Create a portfolio entry demonstrating this skill through a real project or experience. Include context, approach, artifacts, and lessons learned.", impact: "medium", effort: "medium", evidenceType: "workProduct", estimatedGain: 7 }], credentials: [], courses: [] },
};

// ─── DATA GENERATION ────────────────────────────────────────────
function generateStudentData() {
  const completedCount = 28;
  const gradeList = ["exemplary","proficient","proficient","exemplary","proficient","proficient","proficient","exemplary","proficient","not-yet","proficient","exemplary","proficient","proficient","proficient","exemplary","proficient","proficient","exemplary","proficient","proficient","proficient","exemplary","proficient","proficient","exemplary","proficient","proficient"];
  const attachSourceStats = (course) => {
    const sourceCourse = PROGRAM_SOURCE_INDEX[course.code];
    return {
      ...course,
      mappedSkillCount: sourceCourse?.skillCount || 0,
      mappedCompetencyCount: sourceCourse?.competencyCount || 0,
    };
  };
  const completed = PROGRAM_COURSES.slice(0, completedCount).map((c, i) => ({ ...attachSourceStats(c), status: "completed", grade: gradeList[i] || "proficient", completedDate: new Date(2024, Math.floor(i / 4), 15 + (i % 28)).toISOString().split("T")[0] }));
  const inProgress = PROGRAM_COURSES.slice(completedCount, completedCount + 2).map(c => ({ ...attachSourceStats(c), status: "in-progress", progress: 0.55 }));
  const remaining = PROGRAM_COURSES.slice(completedCount + 2).map(c => ({ ...attachSourceStats(c), status: "not-started" }));

  let seed = 42;
  const sRand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  const skillEvidence = {};
  const coursePool = completed.filter(c => c.type === "design" || c.type === "bus-core" || c.type === "power");
  const wpSources = ["UX Case Study Portfolio", "Design Sprint Documentation", "Usability Research Report", "Interactive Prototype (Figma)", "Brand Identity Project"];

  SKILL_DOMAINS.forEach(domain => {
    domain.skills.forEach(skill => {
      const evidences = [];
      const rsd = RSD_CITATIONS[skill];

      if (sRand() > 0.2) {
        const course = coursePool[Math.floor(sRand() * coursePool.length)];
        const templates = RATIONALE_TEMPLATES.assessment[skill] || RATIONALE_TEMPLATES.assessment._default;
        evidences.push({ type: "assessment", score: Math.floor(sRand() * 30 + 65), source: course?.title || "Course Assessment", courseCode: course?.code, date: "2025-01-15", rationale: templates[0].replace("{course}", course?.title || "this course").replace("{skill}", skill), rsdUri: rsd?.uri, rsdStatement: rsd?.statement, rsdCollection: rsd?.collection, competencyRef: course?.code ? `Competency mapped via ${course.code} course alignment` : null });
      }
      if (sRand() > 0.5) {
        const course = coursePool[Math.floor(sRand() * coursePool.length)];
        const templates = RATIONALE_TEMPLATES.assessment[skill] || RATIONALE_TEMPLATES.assessment._default;
        evidences.push({ type: "assessment", score: Math.floor(sRand() * 25 + 70), source: course?.title || "Course Assessment", courseCode: course?.code, date: "2025-02-10", rationale: templates[Math.min(1, templates.length - 1)].replace("{course}", course?.title || "this course").replace("{skill}", skill), rsdUri: rsd?.uri, rsdStatement: rsd?.statement, rsdCollection: rsd?.collection, competencyRef: course?.code ? `Competency mapped via ${course.code} course alignment` : null });
      }
      if (sRand() > 0.55) {
        const wpTemplates = RATIONALE_TEMPLATES.workProduct[skill] || RATIONALE_TEMPLATES.workProduct._default;
        const src = wpSources[Math.floor(sRand() * wpSources.length)];
        evidences.push({ type: "workProduct", score: Math.floor(sRand() * 25 + 68), source: src, date: "2025-01-20", rationale: wpTemplates[0].replace("{skill}", skill), rsdUri: rsd?.uri, rsdStatement: rsd?.statement, rsdCollection: rsd?.collection, artifactDesc: `Student-submitted ${src.toLowerCase()} demonstrating applied competency.` });
      }
      if (skill === "User Experience (UX) Design" || skill === "Prototyping" || skill === "Artificial Intelligence (AI)") {
        const credTemplates = RATIONALE_TEMPLATES.credential[skill] || RATIONALE_TEMPLATES.credential._default;
        const credName = skill === "Artificial Intelligence (AI)" ? "Google AI Essentials" : "Nielsen Norman Group UX Certification";
        evidences.push({ type: "credential", score: 85, source: credName, date: "2024-11-01", rationale: credTemplates[0].replace("{skill}", skill), rsdUri: rsd?.uri, rsdStatement: rsd?.statement, rsdCollection: rsd?.collection, credentialIssuer: skill === "Artificial Intelligence (AI)" ? "Google" : "Nielsen Norman Group", verificationUrl: "#" });
      }
      if (sRand() > 0.4) {
        evidences.push({ type: "selfAttested", score: Math.floor(sRand() * 20 + 70), source: "Resume / Skills Profile", date: "2024-09-01", rationale: RATIONALE_TEMPLATES.selfAttested._default[0].replace("{skill}", skill), rsdUri: rsd?.uri, rsdStatement: rsd?.statement, rsdCollection: rsd?.collection, selfReportedContext: "Listed under 'Skills' section of uploaded resume with 2+ years claimed experience." });
      }
      skillEvidence[skill] = evidences;
    });
  });
  return { completed, inProgress, remaining, skillEvidence };
}

function calculateWeightedProficiency(evidences) {
  if (!evidences || evidences.length === 0) return { score: 0, confidence: 0, level: "None" };
  let totalWeight = 0, weightedSum = 0;
  evidences.forEach(e => { const w = EVIDENCE_TYPES[e.type]?.weight || 0.5; totalWeight += w; weightedSum += e.score * w; });
  const score = Math.round(weightedSum / totalWeight);
  const confidence = Math.min(100, Math.round((totalWeight / 3) * 100));
  const level = score >= 90 ? "Exemplary" : score >= 75 ? "Proficient" : score >= 60 ? "Developing" : score > 0 ? "Emerging" : "None";
  return { score, confidence, level };
}

// ─── UTILITY COMPONENTS ─────────────────────────────────────────
const PanelCard = ({ children, style = {} }) => (<div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", padding: 20, ...style }}>{children}</div>);
const SectionTitle = ({ children, icon: Icon, color }) => (<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>{Icon && <Icon size={16} color={color || "#E85D3A"}/>}<h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{children}</h3></div>);

function SkillEQGauge({ score, size = 200 }) {
  const radius = size / 2 - 20;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = score >= 80 ? "#27AE60" : score >= 60 ? "#F2994A" : "#EB5757";
  return (<div style={{ position: "relative", width: size, height: size / 1.4, overflow: "hidden" }}><svg width={size} height={size / 1.4} viewBox={`0 0 ${size} ${size / 1.3}`}><path d={`M ${20} ${size/1.3-10} A ${radius} ${radius} 0 0 1 ${size-20} ${size/1.3-10}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={14} strokeLinecap="round"/><path d={`M ${20} ${size/1.3-10} A ${radius} ${radius} 0 0 1 ${size-20} ${size/1.3-10}`} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" strokeDasharray={`${progress} ${circumference}`} style={{ filter: `drop-shadow(0 0 8px ${color}66)`, transition: "stroke-dasharray 1.5s ease" }}/></svg><div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}><div style={{ fontSize: size/4.5, fontWeight: 800, color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{score}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>Skill EQ</div></div></div>);
}

function DomainCard({ domain, skills, evidence, isExpanded, onToggle, onSelectSkill }) {
  const domainSkills = skills.map(s => ({ name: s, ...calculateWeightedProficiency(evidence[s] || []), evidenceCount: (evidence[s] || []).length, evidences: evidence[s] || [] }));
  const avgScore = domainSkills.length > 0 ? Math.round(domainSkills.reduce((sum, s) => sum + s.score, 0) / domainSkills.length) : 0;
  const avgConfidence = domainSkills.length > 0 ? Math.round(domainSkills.reduce((sum, s) => sum + s.confidence, 0) / domainSkills.length) : 0;
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
      <button onClick={onToggle} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, background: "none", border: "none", cursor: "pointer", color: "white", textAlign: "left" }}>
        <span style={{ fontSize: 22 }}>{domain.icon}</span>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif" }}>{domain.name}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{domainSkills.length} skills · {avgConfidence}% confidence</div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${domain.color}18`, color: domain.color, fontWeight: 800, fontSize: 18, fontFamily: "'DM Mono', monospace" }}>{avgScore}</div>{isExpanded ? <ChevronDown size={16} style={{ opacity: 0.4 }}/> : <ChevronRight size={16} style={{ opacity: 0.4 }}/>}</div>
      </button>
      {isExpanded && (<div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {domainSkills.map((skill, i) => (
          <button key={i} onClick={() => onSelectSkill?.(skill.name)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "none", cursor: "pointer", color: "white", width: "100%", textAlign: "left" }}>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{skill.name}</div><div style={{ display: "flex", gap: 4, marginTop: 4 }}>{skill.evidences.map((e, j) => { const et = EVIDENCE_TYPES[e.type]; return (<span key={j} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 600, background: `${et?.color}20`, color: et?.color }}>{et?.label?.slice(0,4)}</span>); })}{skill.evidences.length === 0 && <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>No evidence</span>}</div></div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}><div style={{ width: 80, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${skill.score}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${domain.color}88, ${domain.color})` }}/></div><span style={{ fontSize: 12, fontWeight: 700, color: domain.color, fontFamily: "'DM Mono', monospace", width: 24, textAlign: "right" }}>{skill.score}</span><Info size={12} style={{ opacity: 0.25 }}/></div>
          </button>
        ))}
      </div>)}
    </div>
  );
}

function CourseTimeline({ courses, currentView }) {
  const terms = [1,2,3,4,5,6,7,8,9,10];
  const typeColors = { "gen-ed": "#6B7280", "bus-core": "#2D9CDB", "bus-mgmt": "#9B51E0", design: "#E85D3A", power: "#F2994A", hr: "#27AE60" };
  return (<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{terms.map(term => { const tc = courses.filter(c => c.term === term && (currentView === "all" || c.type === "design")); if (!tc.length) return null; return (<div key={term}><div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Term {term}</div><div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{tc.map((c, i) => { const sc = c.status==="completed"?"#27AE60":c.status==="in-progress"?"#F2994A":"rgba(255,255,255,0.2)"; const SI = c.status==="completed"?CheckCircle2:c.status==="in-progress"?Clock:AlertCircle; return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: c.status==="in-progress"?"rgba(242,153,74,0.06)":"rgba(255,255,255,0.02)", borderRadius: 8, borderLeft: `3px solid ${typeColors[c.type]}` }}><SI size={14} color={sc}/><div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:11, fontWeight:600, color:c.status==="not-started"?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.85)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.title}</div><div style={{ display:"flex", alignItems:"center", gap:8, marginTop:2, flexWrap:"wrap" }}><span style={{ fontSize:9, color:"rgba(255,255,255,0.3)" }}>{c.code}</span>{c.mappedSkillCount > 0 && <span style={{ fontSize:9, color:"rgba(255,255,255,0.4)" }}>{c.mappedSkillCount} skills · {c.mappedCompetencyCount} competencies</span>}</div></div>{c.grade&&<span style={{ fontSize:9, padding:"2px 8px", borderRadius:4, fontWeight:700, background:c.grade==="exemplary"?"rgba(39,174,96,0.15)":c.grade==="proficient"?"rgba(45,156,219,0.15)":"rgba(235,87,87,0.15)", color:c.grade==="exemplary"?"#27AE60":c.grade==="proficient"?"#2D9CDB":"#EB5757" }}>{c.grade==="not-yet"?"Retry":c.grade}</span>}{c.status==="in-progress"&&<div style={{ width:40, height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}><div style={{ width:`${(c.progress||0)*100}%`, height:"100%", background:"#F2994A", borderRadius:2 }}/></div>}</div>); })}</div></div>); })}</div>);
}

function WeightExplainer() {
  return (<div style={{ display:"flex", flexDirection:"column", gap:8 }}>{Object.entries(EVIDENCE_TYPES).map(([key,et])=>{ const Icon=et.icon; return (<div key={key} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(255,255,255,0.02)", borderRadius:10 }}><div style={{ width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",background:`${et.color}15` }}><Icon size={16} color={et.color}/></div><div style={{ flex:1 }}><div style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.85)" }}>{et.label}</div><div style={{ fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:1 }}>{et.desc}</div></div><div style={{ display:"flex",alignItems:"center",gap:4 }}><div style={{ width:50,height:6,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden" }}><div style={{ width:`${et.weight*100}%`,height:"100%",background:et.color,borderRadius:3 }}/></div><span style={{ fontSize:11,fontWeight:700,color:et.color,fontFamily:"'DM Mono',monospace",width:32,textAlign:"right" }}>{Math.round(et.weight*100)}%</span></div></div>); })}</div>);
}

function SourceFileCard({ file }) {
  const Icon = file.icon;
  return (
    <a
      href={file.href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 12,
        textDecoration: "none",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${file.color}20`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${file.color}18`,
          flexShrink: 0,
        }}
      >
        <Icon size={16} color={file.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>
          {file.label}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", marginTop: 2 }}>
          {file.meta}
        </div>
      </div>
      <ExternalLink size={14} color={file.color} />
    </a>
  );
}

function LocalSourcePanel() {
  return (
    <PanelCard
      style={{
        background: "linear-gradient(135deg, rgba(45,156,219,0.08), rgba(232,93,58,0.06))",
        border: "1px solid rgba(45,156,219,0.14)",
      }}
    >
      <SectionTitle icon={FileCheck} color="#2D9CDB">Local Program Source</SectionTitle>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.58)", lineHeight: 1.7, marginBottom: 16 }}>
        This GitHub build runs entirely on committed local files. The workbook is preprocessed into JSON at build time, so the dashboard does not require API keys or live OSMT requests.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginBottom: 16 }}>
        {[
          { label: "RSD Mappings", value: programData.summary.mappingCount, color: "#2D9CDB" },
          { label: "Competencies", value: programData.summary.competencyCount, color: "#E85D3A" },
          { label: "Distinct Skills", value: programData.summary.skillCount, color: "#27AE60" },
          { label: "Skipped Planning Rows", value: programData.summary.skippedRows, color: "#F2994A" },
        ].map((item) => (
          <div key={item.label} style={{ padding: "12px 14px", background: "rgba(0,0,0,0.18)", borderRadius: 12 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: 1 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: item.color, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {STATIC_SOURCE_FILES.map((file) => <SourceFileCard key={file.label} file={file} />)}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.36)", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>
        Most Dense Courses
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TOP_MAPPED_COURSES.map((course) => (
          <div key={course.code} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
            <div style={{ minWidth: 56, fontSize: 12, fontWeight: 800, color: "#E85D3A", fontFamily: "'DM Mono', monospace" }}>
              {course.code}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.82)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {course.title}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", marginTop: 2 }}>
                {course.skillCount} mapped skills · {course.competencyCount} competencies
              </div>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 1: EVIDENCE RATIONALE PANEL
// ═══════════════════════════════════════════════════════════════════
function EvidenceRationalePanel({ skillName, evidences, onClose }) {
  const prof = calculateWeightedProficiency(evidences);
  const rsd = RSD_CITATIONS[skillName];
  const lc = { Exemplary: "#27AE60", Proficient: "#2D9CDB", Developing: "#F2994A", Emerging: "#EB5757", None: "#555" };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>{skillName}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: lc[prof.level], fontFamily: "'DM Mono', monospace" }}>{prof.score}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: lc[prof.level], padding: "3px 10px", borderRadius: 6, background: `${lc[prof.level]}15` }}>{prof.level}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{prof.confidence}% confidence</span>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}><X size={14}/></button>
      </div>

      {/* RSD Citation */}
      {rsd && (
        <div style={{ padding: "14px 22px", background: "rgba(232,93,58,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><BookOpen size={12} color="#E85D3A"/><span style={{ fontSize: 10, fontWeight: 700, color: "#E85D3A", letterSpacing: 1.5, textTransform: "uppercase" }}>Rich Skill Descriptor</span></div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontStyle: "italic", marginBottom: 6 }}>"{rsd.statement}"</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Collection: {rsd.collection}</span>
            <a href={rsd.uri} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: "#E85D3A", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>OSMT Link <ExternalLink size={9}/></a>
          </div>
        </div>
      )}

      {/* Evidence Items */}
      <div style={{ padding: "16px 22px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Evidence Trail ({evidences.length} source{evidences.length !== 1 ? "s" : ""})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {evidences.map((ev, i) => {
            const et = EVIDENCE_TYPES[ev.type]; const Icon = et?.icon || FileCheck; const weight = et?.weight || 0.5;
            return (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: `1px solid ${et?.color}15`, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: `${et?.color}12`, flexShrink: 0 }}><Icon size={14} color={et?.color}/></div>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{et?.label}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{ev.source} · {ev.date}</div></div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontSize: 16, fontWeight: 800, color: et?.color, fontFamily: "'DM Mono', monospace" }}>{ev.score}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>\u00D7 {weight} = <span style={{ color: et?.color }}>{Math.round(ev.score * weight)}</span></div></div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}><MessageSquare size={11} color="rgba(255,255,255,0.3)" style={{ marginTop: 2, flexShrink: 0 }}/><p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{ev.rationale}</p></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {ev.courseCode && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(45,156,219,0.1)", color: "#2D9CDB" }}>Course: {ev.courseCode}</span>}
                    {ev.competencyRef && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>{ev.competencyRef}</span>}
                    {ev.credentialIssuer && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(39,174,96,0.1)", color: "#27AE60" }}>Issuer: {ev.credentialIssuer}</span>}
                    {ev.verificationUrl && <a href={ev.verificationUrl} target="_blank" rel="noreferrer" style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(39,174,96,0.08)", color: "#27AE60", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>Verify <ExternalLink size={8}/></a>}
                    {ev.artifactDesc && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(45,156,219,0.1)", color: "#2D9CDB" }}>{ev.artifactDesc}</span>}
                    {ev.selfReportedContext && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(155,81,224,0.1)", color: "#9B51E0" }}>{ev.selfReportedContext}</span>}
                  </div>
                </div>
              </div>
            );
          })}
          {evidences.length === 0 && (<div style={{ padding: 24, textAlign: "center", color: "rgba(255,255,255,0.3)" }}><AlertCircle size={24} style={{ marginBottom: 8, opacity: 0.4 }}/><div style={{ fontSize: 12 }}>No evidence recorded for this skill yet.</div><div style={{ fontSize: 10, marginTop: 4 }}>Complete relevant coursework or submit artifacts to build proficiency.</div></div>)}
        </div>

        {/* Weighted Calculation */}
        {evidences.length > 0 && (
          <div style={{ marginTop: 16, padding: "14px 16px", background: "rgba(0,0,0,0.2)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Weighted Calculation</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
              {evidences.map((ev, i) => { const w = EVIDENCE_TYPES[ev.type]?.weight || 0.5; return <div key={i}><span style={{ color: EVIDENCE_TYPES[ev.type]?.color }}>{ev.score}</span> \u00D7 <span style={{ color: "rgba(255,255,255,0.35)" }}>{w}</span> = <span style={{ color: "rgba(255,255,255,0.7)" }}>{(ev.score * w).toFixed(1)}</span>{i < evidences.length - 1 ? " +" : ""}</div>; })}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 4, paddingTop: 4 }}>\u03A3 weighted = {evidences.reduce((s, e) => s + e.score * (EVIDENCE_TYPES[e.type]?.weight || 0.5), 0).toFixed(1)} \u00F7 \u03A3 weights {evidences.reduce((s, e) => s + (EVIDENCE_TYPES[e.type]?.weight || 0.5), 0).toFixed(2)} = <span style={{ color: "#E85D3A", fontWeight: 700 }}>{prof.score}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 2: RECOMMENDATION ENGINE
// ═══════════════════════════════════════════════════════════════════
function RecommendationEngine({ skillEvidence, domainScores }) {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [expandedRec, setExpandedRec] = useState(null);

  const allSkillGaps = useMemo(() => {
    const gaps = [];
    SKILL_DOMAINS.forEach(domain => {
      domain.skills.forEach(skill => {
        const prof = calculateWeightedProficiency(skillEvidence[skill] || []);
        const gap = 85 - prof.score;
        const hasHighWeight = (skillEvidence[skill] || []).some(e => EVIDENCE_TYPES[e.type]?.weight >= 0.75);
        gaps.push({ skill, domain: domain.name, domainId: domain.id, domainColor: domain.color, domainIcon: domain.icon, score: prof.score, level: prof.level, confidence: prof.confidence, gap: Math.max(0, gap), evidenceCount: (skillEvidence[skill] || []).length, hasHighWeightEvidence: hasHighWeight, priority: gap > 20 ? "critical" : gap > 10 ? "growth" : gap > 0 ? "polish" : "strong" });
      });
    });
    return gaps.sort((a, b) => b.gap - a.gap);
  }, [skillEvidence]);

  const filteredGaps = selectedPriority === "all" ? allSkillGaps : allSkillGaps.filter(g => g.priority === selectedPriority);
  const priorityConfig = { critical: { label: "Critical Gaps", color: "#EB5757", icon: AlertCircle, desc: "20+ pts below proficiency target" }, growth: { label: "Growth Areas", color: "#F2994A", icon: TrendingUp, desc: "10\u201320 pts below target" }, polish: { label: "Refinement", color: "#2D9CDB", icon: Sparkles, desc: "Within 10 pts of target" }, strong: { label: "Strengths", color: "#27AE60", icon: Trophy, desc: "At or above target" } };
  const impactColors = { high: "#27AE60", medium: "#F2994A", low: "#6B7280" };
  const effortColors = { high: "#EB5757", medium: "#F2994A", low: "#27AE60" };

  const domainImbalance = useMemo(() => {
    const sorted = [...domainScores].sort((a, b) => a.avgScore - b.avgScore);
    return { weakest: sorted[0], strongest: sorted[sorted.length - 1], range: sorted[sorted.length - 1].avgScore - sorted[0].avgScore, sorted };
  }, [domainScores]);

  function getRecs(skill) { return RECOMMENDATION_DB[skill] || RECOMMENDATION_DB._default; }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Balance Overview Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <PanelCard>
          <SectionTitle icon={Compass} color="#F2994A">Skill Balance Analysis</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(235,87,87,0.06)", borderRadius: 10, border: "1px solid rgba(235,87,87,0.1)" }}>
              <div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Weakest Domain</div><div style={{ fontSize: 14, fontWeight: 700, color: domainImbalance.weakest.color, marginTop: 2 }}>{domainImbalance.weakest.icon} {domainImbalance.weakest.name}</div></div>
              <div style={{ fontSize: 24, fontWeight: 800, color: domainImbalance.weakest.color, fontFamily: "'DM Mono', monospace" }}>{domainImbalance.weakest.avgScore}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(39,174,96,0.06)", borderRadius: 10, border: "1px solid rgba(39,174,96,0.1)" }}>
              <div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Strongest Domain</div><div style={{ fontSize: 14, fontWeight: 700, color: domainImbalance.strongest.color, marginTop: 2 }}>{domainImbalance.strongest.icon} {domainImbalance.strongest.name}</div></div>
              <div style={{ fontSize: 24, fontWeight: 800, color: domainImbalance.strongest.color, fontFamily: "'DM Mono', monospace" }}>{domainImbalance.strongest.avgScore}</div>
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Domain spread (imbalance)</span>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'DM Mono', monospace", color: domainImbalance.range > 25 ? "#EB5757" : domainImbalance.range > 15 ? "#F2994A" : "#27AE60" }}>{domainImbalance.range} pts</span>
            </div>
          </div>
        </PanelCard>
        <PanelCard>
          <SectionTitle icon={Target} color="#E85D3A">Priority Distribution</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(priorityConfig).map(([key, cfg]) => {
              const count = allSkillGaps.filter(g => g.priority === key).length;
              const pct = Math.round((count / allSkillGaps.length) * 100);
              const Icon = cfg.icon;
              return (
                <button key={key} onClick={() => setSelectedPriority(selectedPriority === key ? "all" : key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, cursor: "pointer", background: selectedPriority === key ? `${cfg.color}10` : "rgba(255,255,255,0.02)", border: selectedPriority === key ? `1px solid ${cfg.color}30` : "1px solid transparent", color: "white", width: "100%", textAlign: "left" }}>
                  <Icon size={14} color={cfg.color}/><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{cfg.label}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{cfg.desc}</div></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 40, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: cfg.color, borderRadius: 3 }}/></div><span style={{ fontSize: 13, fontWeight: 800, color: cfg.color, fontFamily: "'DM Mono', monospace", width: 24, textAlign: "right" }}>{count}</span></div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>

      {/* Skill Recommendations List */}
      <PanelCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <SectionTitle icon={Lightbulb} color="#F2994A">Personalized Recommendations</SectionTitle>
          {selectedPriority !== "all" && <button onClick={() => setSelectedPriority("all")} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Show all</button>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredGaps.filter(g => g.gap > 0).slice(0, 15).map((gap) => {
            const recs = getRecs(gap.skill);
            const isExp = expandedRec === gap.skill;
            const pCfg = priorityConfig[gap.priority];
            const PIcon = pCfg.icon;
            return (
              <div key={gap.skill} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: `1px solid ${isExp ? gap.domainColor + "25" : "rgba(255,255,255,0.04)"}`, overflow: "hidden" }}>
                <button onClick={() => setExpandedRec(isExp ? null : gap.skill)} style={{ width: "100%", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", color: "white", textAlign: "left" }}>
                  <PIcon size={14} color={pCfg.color}/><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{gap.skill}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{gap.domainIcon} {gap.domain} · {gap.evidenceCount} evidence pts</div></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}><div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 800, color: gap.domainColor, fontFamily: "'DM Mono', monospace" }}>{gap.score}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>gap: +{gap.gap}</div></div>{isExp ? <ChevronUp size={14} style={{ opacity: 0.4 }}/> : <ChevronDown size={14} style={{ opacity: 0.4 }}/>}</div>
                </button>
                {isExp && (
                  <div style={{ padding: "0 18px 18px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    {!gap.hasHighWeightEvidence && (
                      <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(242,153,74,0.06)", borderRadius: 8, border: "1px solid rgba(242,153,74,0.12)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <AlertCircle size={13} color="#F2994A" style={{ marginTop: 1, flexShrink: 0 }}/>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, margin: 0 }}><strong style={{ color: "#F2994A" }}>No high-weight evidence.</strong> Current score relies on self-attestation or limited sources. Adding an assessment or work product would significantly increase both score and confidence.</p>
                      </div>
                    )}
                    {recs.projects?.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><PenTool size={10}/> Suggested Projects</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {recs.projects.map((p, j) => (
                            <div key={j} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, borderLeft: `3px solid ${impactColors[p.impact]}` }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{p.title}</div><div style={{ display: "flex", gap: 4, flexShrink: 0 }}><span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 700, background: `${impactColors[p.impact]}15`, color: impactColors[p.impact], textTransform: "uppercase" }}>{p.impact} impact</span><span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 700, background: `${effortColors[p.effort]}15`, color: effortColors[p.effort], textTransform: "uppercase" }}>{p.effort} effort</span></div></div>
                              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}><span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: `${EVIDENCE_TYPES[p.evidenceType]?.color}12`, color: EVIDENCE_TYPES[p.evidenceType]?.color, fontWeight: 600 }}>\u2192 {EVIDENCE_TYPES[p.evidenceType]?.label} evidence</span><span style={{ fontSize: 9, color: "#27AE60", fontWeight: 700 }}>Est. +{p.estimatedGain} pts</span></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {recs.credentials?.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><Award size={10}/> Recommended Credentials</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {recs.credentials.map((c, j) => (
                            <div key={j} style={{ padding: "12px 14px", background: "rgba(39,174,96,0.04)", borderRadius: 10, border: "1px solid rgba(39,174,96,0.1)" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{c.title}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Issued by {c.issuer}</div></div><span style={{ fontSize: 9, color: "#27AE60", fontWeight: 700 }}>Est. +{c.estimatedGain} pts</span></div>
                              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: "6px 0 0" }}>{c.desc}</p>
                              {c.url && <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: "#27AE60", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3, marginTop: 6 }}>Learn more <ExternalLink size={9}/></a>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {recs.courses?.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><GraduationCap size={10}/> Related Program Courses</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{recs.courses.map(code => { const course = PROGRAM_COURSES.find(c => c.code === code); if (!course) return null; return (<span key={code} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(45,156,219,0.08)", color: "#2D9CDB", fontWeight: 600 }}>{code}: {course.title}</span>); })}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filteredGaps.filter(g => g.gap > 0).length === 0 && (<div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.3)" }}><Trophy size={28} style={{ marginBottom: 8, opacity: 0.5 }}/><div style={{ fontSize: 14, fontWeight: 600 }}>All skills at or above proficiency target!</div></div>)}
        </div>
      </PanelCard>

      {/* Quick Wins */}
      <PanelCard style={{ background: "linear-gradient(135deg, rgba(39,174,96,0.06), rgba(45,156,219,0.04))", border: "1px solid rgba(39,174,96,0.1)" }}>
        <SectionTitle icon={Rocket} color="#27AE60">Quick Wins \u2014 Fastest Path to a Balanced EQ</SectionTitle>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 }}>These high-impact, lower-effort actions would give you the most significant Skill EQ improvement in the shortest time.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {allSkillGaps.filter(g => g.gap > 5).slice(0, 3).map((gap, i) => {
            const recs = getRecs(gap.skill);
            const best = recs.projects?.sort((a, b) => (b.estimatedGain / (b.effort === "low" ? 1 : b.effort === "medium" ? 2 : 3)) - (a.estimatedGain / (a.effort === "low" ? 1 : a.effort === "medium" ? 2 : 3)))[0] || recs.credentials?.[0];
            if (!best) return null;
            return (
              <div key={i} style={{ padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#27AE60", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>#{i + 1} Priority</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 4 }}>{gap.skill}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Current: {gap.score} · Gap: +{gap.gap}</div>
                <div style={{ padding: "10px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 8 }}><div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{best.title}</div><div style={{ fontSize: 10, color: "#27AE60", fontWeight: 700, marginTop: 4 }}>Estimated gain: +{best.estimatedGain} pts</div></div>
              </div>
            );
          })}
        </div>
      </PanelCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════
export default function SkillEQDashboard() {
  const [data] = useState(() => generateStudentData());
  const [expandedDomain, setExpandedDomain] = useState("design-core");
  const [activeTab, setActiveTab] = useState("overview");
  const [courseView, setCourseView] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const allCourses = [...data.completed, ...data.inProgress, ...data.remaining];
  const completionPct = Math.round((data.completed.length / PROGRAM_COURSES.length) * 100);
  const domainScores = useMemo(() => SKILL_DOMAINS.map(d => { const ss = d.skills.map(s => calculateWeightedProficiency(data.skillEvidence[s] || [])); return { ...d, avgScore: ss.length > 0 ? Math.round(ss.reduce((sum, s) => sum + s.score, 0) / ss.length) : 0 }; }), [data]);
  const overallEQ = useMemo(() => Math.round(domainScores.reduce((s, d) => s + d.avgScore, 0) / domainScores.length), [domainScores]);
  const radarData = domainScores.map(d => ({ domain: d.name.length > 14 ? d.name.slice(0, 13) + "\u2026" : d.name, score: d.avgScore, fullMark: 100 }));
  const progressData = useMemo(() => { const pts = []; const months = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"]; for (let i = 0; i < 10; i++) pts.push({ month: months[i], eq: Math.min(100, 18 + i * 7 + (i * 5 + 3) % 6) }); pts[7].eq = overallEQ; pts[8].eq = null; pts[9].eq = null; return pts.slice(0,8); }, [overallEQ]);
  const evidenceDistribution = useMemo(() => { const c = { assessment:0, workProduct:0, credential:0, selfAttested:0 }; Object.values(data.skillEvidence).forEach(evs => evs.forEach(e => { if(c[e.type]!==undefined) c[e.type]++; })); return Object.entries(c).map(([t,v]) => ({ name:EVIDENCE_TYPES[t].label, value:v, color:EVIDENCE_TYPES[t].color })); }, [data]);
  const categoryCoverageData = useMemo(() => TOP_CATEGORY_COVERAGE.map((category) => ({ ...category, value: category.mappingCount })), []);

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "skills", label: "Skill Domains", icon: Layers },
    { id: "rationale", label: "Evidence & Rationale", icon: BookOpen },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
    { id: "progress", label: "Program Progress", icon: TrendingUp },
    { id: "methodology", label: "Methodology", icon: Shield },
  ];

  return (
    <div className="skills-eq-app" style={{ minHeight: "100vh", background: "#0B0D11", color: "white", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}.tab-btn{transition:all 0.2s ease}.tab-btn:hover{background:rgba(255,255,255,0.06)!important}.recharts-default-tooltip{background:#1a1d24!important;border:1px solid rgba(255,255,255,0.1)!important;border-radius:10px!important}`}</style>

      {/* HEADER */}
      <header className="skills-eq-header" style={{ padding: "20px 28px 0", background: "linear-gradient(180deg, rgba(232,93,58,0.06) 0%, transparent 100%)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="skills-eq-header-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27AE60", boxShadow: "0 0 8px #27AE6066" }}/><span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 3, textTransform: "uppercase" }}>Static GitHub Dashboard</span></div>
            <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{programData.summary.programTitle}</h1>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Local workbook-backed demo \u00B7 {programData.summary.courseCount} courses \u00B7 {programData.summary.competencyCount} competencies \u00B7 {programData.summary.programCode}</div>
          </div>
          <SkillEQGauge score={overallEQ} size={140}/>
        </div>
        <div className="skills-eq-header-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[{ label: "Program Completion", value: `${completionPct}%`, sub: `${data.completed.length}/${PROGRAM_COURSES.length} courses`, color: "#27AE60" }, { label: "Evidence Points", value: Object.values(data.skillEvidence).flat().length, sub: "locally simulated learner evidence", color: "#2D9CDB" }, { label: "RSD Mappings", value: programData.summary.mappingCount, sub: "committed from spreadsheet", color: "#F2994A" }, { label: "Distinct Skills", value: programData.summary.skillCount, sub: "indexed without live APIs", color: "#E85D3A" }].map((stat, i) => (
            <div key={i} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}><div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{stat.label}</div><div style={{ fontSize: 22, fontWeight: 800, color: stat.color, fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{stat.value}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{stat.sub}</div></div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
          {tabs.map(tab => { const Icon = tab.icon; const active = activeTab === tab.id; return (<button key={tab.id} className="tab-btn" onClick={() => { setActiveTab(tab.id); if (tab.id !== "rationale") setSelectedSkill(null); }} style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", background: active ? "rgba(232,93,58,0.1)" : "transparent", border: "none", borderBottom: active ? "2px solid #E85D3A" : "2px solid transparent", color: active ? "#E85D3A" : "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 11, fontWeight: 600, borderRadius: "8px 8px 0 0" }}><Icon size={13}/>{tab.label}</button>); })}
        </div>
      </header>

      {/* CONTENT */}
      <main className="skills-eq-shell" style={{ padding: "24px 28px" }}>
        {activeTab === "overview" && (
          <div className="skills-eq-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <PanelCard><SectionTitle>Skill Domain Profile</SectionTitle><ResponsiveContainer width="100%" height={280}><RadarChart data={radarData}><PolarGrid stroke="rgba(255,255,255,0.06)"/><PolarAngleAxis dataKey="domain" tick={{ fill:"rgba(255,255,255,0.5)", fontSize:10 }}/><PolarRadiusAxis angle={90} domain={[0,100]} tick={{ fill:"rgba(255,255,255,0.2)", fontSize:9 }}/><Radar name="Skill EQ" dataKey="score" stroke="#E85D3A" fill="#E85D3A" fillOpacity={0.15} strokeWidth={2}/></RadarChart></ResponsiveContainer></PanelCard>
            <PanelCard><SectionTitle>Skill EQ Growth</SectionTitle><ResponsiveContainer width="100%" height={280}><AreaChart data={progressData}><defs><linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E85D3A" stopOpacity={0.2}/><stop offset="100%" stopColor="#E85D3A" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="month" tick={{ fill:"rgba(255,255,255,0.4)", fontSize:11 }} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tick={{ fill:"rgba(255,255,255,0.25)", fontSize:10 }} axisLine={false} tickLine={false}/><Tooltip contentStyle={{ background:"#1a1d24", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12, color:"white" }}/><Area type="monotone" dataKey="eq" stroke="#E85D3A" strokeWidth={2.5} fill="url(#eqGrad)"/></AreaChart></ResponsiveContainer></PanelCard>
            <PanelCard><SectionTitle>Domain Scores</SectionTitle><div style={{ display:"flex", flexDirection:"column", gap:10 }}>{[...domainScores].sort((a,b)=>b.avgScore-a.avgScore).map(d=>(<div key={d.id} style={{ display:"flex", alignItems:"center", gap:10 }}><span style={{ fontSize:16, width:24, textAlign:"center" }}>{d.icon}</span><div style={{ flex:1 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.7)" }}>{d.name}</span><span style={{ fontSize:12, fontWeight:800, color:d.color, fontFamily:"'DM Mono', monospace" }}>{d.avgScore}</span></div><div style={{ height:8, background:"rgba(255,255,255,0.04)", borderRadius:4, overflow:"hidden" }}><div style={{ width:`${d.avgScore}%`, height:"100%", borderRadius:4, background:`linear-gradient(90deg, ${d.color}88, ${d.color})` }}/></div></div></div>))}</div></PanelCard>
            <PanelCard><SectionTitle>Evidence Distribution</SectionTitle><ResponsiveContainer width="100%" height={180}><BarChart data={evidenceDistribution} layout="vertical"><XAxis type="number" tick={{ fill:"rgba(255,255,255,0.3)", fontSize:10 }} axisLine={false} tickLine={false}/><YAxis type="category" dataKey="name" tick={{ fill:"rgba(255,255,255,0.6)", fontSize:11 }} axisLine={false} tickLine={false} width={100}/><Tooltip contentStyle={{ background:"#1a1d24", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12, color:"white" }}/><Bar dataKey="value" radius={[0,6,6,0]} barSize={18}>{evidenceDistribution.map((e,i)=><Cell key={i} fill={e.color}/>)}</Bar></BarChart></ResponsiveContainer><div style={{ marginTop:16, padding:"12px 14px", background:"rgba(232,93,58,0.05)", borderRadius:10, border:"1px solid rgba(232,93,58,0.1)" }}><div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}><Target size={14} color="#E85D3A"/><span style={{ fontSize:11, fontWeight:700, color:"#E85D3A" }}>Proficiency Weighting</span></div><div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", lineHeight:1.5 }}>Assessment feedback carries full weight (100%). Work products evaluated against RSDs carry 85%. External credentials carry 75%. Self-attested skills carry 45%.</div></div></PanelCard>
            <LocalSourcePanel />
            <PanelCard><SectionTitle icon={BarChart3} color="#F2994A">Top Program Categories</SectionTitle><ResponsiveContainer width="100%" height={240}><BarChart data={categoryCoverageData} layout="vertical" margin={{ left: 8, right: 12 }}><XAxis type="number" tick={{ fill:"rgba(255,255,255,0.3)", fontSize:10 }} axisLine={false} tickLine={false}/><YAxis type="category" dataKey="shortName" tick={{ fill:"rgba(255,255,255,0.6)", fontSize:10 }} axisLine={false} tickLine={false} width={120}/><Tooltip formatter={(value, _, item) => [`${value} mappings`, item?.payload?.name || "Category"]} contentStyle={{ background:"#1a1d24", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12, color:"white" }}/><Bar dataKey="value" radius={[0,6,6,0]} fill="#F2994A" barSize={18} /></BarChart></ResponsiveContainer><div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>{TOP_CATEGORY_COVERAGE.slice(0, 3).map((category) => (<div key={category.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 10px", background:"rgba(255,255,255,0.03)", borderRadius:8 }}><div><div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.82)" }}>{category.name}</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>{category.skillCount} skills across {category.courseCount} courses</div></div><div style={{ fontSize:13, fontWeight:800, color:"#F2994A", fontFamily:"'DM Mono', monospace" }}>{category.mappingCount}</div></div>))}</div></PanelCard>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="skills-eq-two-column" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Click a domain to expand, then click any skill to view its full evidence rationale.</div>
              {SKILL_DOMAINS.map(d => (<DomainCard key={d.id} domain={d} skills={d.skills} evidence={data.skillEvidence} isExpanded={expandedDomain === d.id} onToggle={() => setExpandedDomain(expandedDomain === d.id ? null : d.id)} onSelectSkill={(s) => { setSelectedSkill(s); setActiveTab("rationale"); }}/>))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <PanelCard><h4 style={{ fontSize:12, fontWeight:700, marginBottom:12, color:"rgba(255,255,255,0.6)" }}>Proficiency Levels</h4>{[{l:"Exemplary",r:"90-100",c:"#27AE60",d:"Exceeds expectations"},{l:"Proficient",r:"75-89",c:"#2D9CDB",d:"Meets competency requirements"},{l:"Developing",r:"60-74",c:"#F2994A",d:"Approaching proficiency"},{l:"Emerging",r:"1-59",c:"#EB5757",d:"Beginning to demonstrate"}].map((x,i)=>(<div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:i<3?"1px solid rgba(255,255,255,0.03)":"none" }}><div style={{ width:10, height:10, borderRadius:3, background:x.c, flexShrink:0 }}/><div><div style={{ fontSize:12, fontWeight:700, color:x.c }}>{x.l} <span style={{ fontWeight:400, color:"rgba(255,255,255,0.3)" }}>({x.r})</span></div><div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>{x.d}</div></div></div>))}</PanelCard>
              <PanelCard><h4 style={{ fontSize:12, fontWeight:700, marginBottom:12, color:"rgba(255,255,255,0.6)" }}>Evidence Weights</h4><WeightExplainer/></PanelCard>
            </div>
          </div>
        )}

        {activeTab === "rationale" && (
          <div className="skills-eq-rationale-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
            <div className="skills-eq-rationale-list" style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: "75vh", overflowY: "auto", paddingRight: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4, position: "sticky", top: 0, background: "#0B0D11", paddingBottom: 8, zIndex: 1 }}>Select a Skill</div>
              {SKILL_DOMAINS.map(domain => (<div key={domain.id}><div style={{ fontSize: 10, fontWeight: 700, color: domain.color, marginBottom: 4, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><span>{domain.icon}</span> {domain.name}</div>{domain.skills.map(skill => { const prof = calculateWeightedProficiency(data.skillEvidence[skill] || []); const active = selectedSkill === skill; return (<button key={skill} onClick={() => setSelectedSkill(skill)} style={{ width: "100%", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: active ? `${domain.color}12` : "rgba(255,255,255,0.02)", border: active ? `1px solid ${domain.color}30` : "1px solid transparent", borderRadius: 8, cursor: "pointer", color: "white", textAlign: "left", marginBottom: 3 }}><span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{skill}</span><span style={{ fontSize: 11, fontWeight: 700, color: domain.color, fontFamily: "'DM Mono', monospace", flexShrink: 0, marginLeft: 8 }}>{prof.score}</span></button>); })}</div>))}
            </div>
            <div>{selectedSkill ? <EvidenceRationalePanel skillName={selectedSkill} evidences={data.skillEvidence[selectedSkill] || []} onClose={() => setSelectedSkill(null)}/> : (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, color: "rgba(255,255,255,0.25)" }}><Search size={32} style={{ marginBottom: 12, opacity: 0.4 }}/><div style={{ fontSize: 14, fontWeight: 600 }}>Select a skill from the left panel</div><div style={{ fontSize: 11, marginTop: 4 }}>View the full evidence trail, rationale, RSD citations, and weighted calculation.</div></div>)}</div>
          </div>
        )}

        {activeTab === "recommendations" && <RecommendationEngine skillEvidence={data.skillEvidence} domainScores={domainScores}/>}

        {activeTab === "progress" && (
          <div className="skills-eq-progress-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <PanelCard><div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}><SectionTitle>Course Timeline</SectionTitle><div style={{ display:"flex", gap:4 }}>{[{id:"all",l:"All"},{id:"design",l:"Design Core"}].map(v=>(<button key={v.id} onClick={()=>setCourseView(v.id)} style={{ padding:"4px 10px", fontSize:10, fontWeight:600, borderRadius:6, border:"none", cursor:"pointer", background:courseView===v.id?"rgba(232,93,58,0.15)":"rgba(255,255,255,0.04)", color:courseView===v.id?"#E85D3A":"rgba(255,255,255,0.4)" }}>{v.l}</button>))}</div></div><div style={{ maxHeight:500, overflowY:"auto", paddingRight:8 }}><CourseTimeline courses={allCourses} currentView={courseView}/></div></PanelCard>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <PanelCard><SectionTitle>Completion Summary</SectionTitle><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>{[{l:"Completed",v:data.completed.length,c:"#27AE60"},{l:"In Progress",v:data.inProgress.length,c:"#F2994A"},{l:"Remaining",v:data.remaining.length,c:"rgba(255,255,255,0.2)"},{l:"Exemplary",v:data.completed.filter(c=>c.grade==="exemplary").length,c:"#E85D3A"}].map((s,i)=>(<div key={i} style={{ padding:14, background:"rgba(255,255,255,0.02)", borderRadius:10, textAlign:"center" }}><div style={{ fontSize:28, fontWeight:800, color:s.c, fontFamily:"'DM Mono', monospace" }}>{s.v}</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600 }}>{s.l}</div></div>))}</div></PanelCard>
              <PanelCard><SectionTitle>Course Types (Areas of Study)</SectionTitle>{[{l:"Business Management",c:"#9B51E0",n:PROGRAM_COURSES.filter(c=>c.type==="bus-mgmt").length},{l:"General Education",c:"#6B7280",n:PROGRAM_COURSES.filter(c=>c.type==="gen-ed").length},{l:"Power Skills",c:"#F2994A",n:PROGRAM_COURSES.filter(c=>c.type==="power").length},{l:"Business Core",c:"#2D9CDB",n:PROGRAM_COURSES.filter(c=>c.type==="bus-core").length},{l:"Design",c:"#E85D3A",n:PROGRAM_COURSES.filter(c=>c.type==="design").length},{l:"Human Resources",c:"#27AE60",n:PROGRAM_COURSES.filter(c=>c.type==="hr").length}].map((t,i)=>(<div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0" }}><div style={{ width:4, height:16, borderRadius:2, background:t.c }}/><span style={{ fontSize:11, color:"rgba(255,255,255,0.7)", flex:1 }}>{t.l}</span><span style={{ fontSize:12, fontWeight:700, color:t.c, fontFamily:"'DM Mono', monospace" }}>{t.n}</span></div>))}</PanelCard>
              <PanelCard style={{ background:"linear-gradient(135deg, rgba(232,93,58,0.08), rgba(45,156,219,0.05))", border:"1px solid rgba(232,93,58,0.12)" }}><div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}><Zap size={16} color="#E85D3A"/><h3 style={{ fontSize:14, fontWeight:700, fontFamily:"'Space Grotesk', sans-serif" }}>Projected Growth</h3></div><p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.6, marginBottom:12 }}>Based on current trajectory, your Skill EQ is projected to reach <strong style={{ color:"#27AE60" }}>82\u201388</strong> upon completion.</p><div style={{ display:"flex", gap:8 }}><div style={{ flex:1, padding:10, background:"rgba(255,255,255,0.04)", borderRadius:8, textAlign:"center" }}><div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>Current</div><div style={{ fontSize:20, fontWeight:800, color:"#F2994A", fontFamily:"'DM Mono', monospace" }}>{overallEQ}</div></div><div style={{ display:"flex", alignItems:"center" }}><ArrowUpRight size={18} color="rgba(255,255,255,0.2)"/></div><div style={{ flex:1, padding:10, background:"rgba(39,174,96,0.08)", borderRadius:8, textAlign:"center", border:"1px solid rgba(39,174,96,0.15)" }}><div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>Projected</div><div style={{ fontSize:20, fontWeight:800, color:"#27AE60", fontFamily:"'DM Mono', monospace" }}>85</div></div></div></PanelCard>
            </div>
          </div>
        )}

        {activeTab === "methodology" && (
          <div className="skills-eq-method-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <PanelCard style={{ padding:24 }}><h3 style={{ fontSize:16, fontWeight:700, fontFamily:"'Space Grotesk', sans-serif", marginBottom:16 }}>How Skill EQ Works</h3><div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.8 }}><p style={{ marginBottom:14 }}>Your <strong style={{ color:"#E85D3A" }}>Skill EQ</strong> is a weighted composite proficiency score across all Rich Skill Descriptors (RSDs) in your program taxonomy.</p><p style={{ marginBottom:14 }}>Each skill receives evidence from multiple sources. The system applies <strong style={{ color:"rgba(255,255,255,0.85)" }}>weighted averaging</strong> where externally validated evidence carries more weight.</p><p>For this GitHub version, the program library comes from a committed spreadsheet export with <strong style={{ color:"rgba(255,255,255,0.85)" }}>{programData.summary.mappingCount} local mappings</strong>, so the dashboard works without API keys.</p></div></PanelCard>
              <PanelCard style={{ padding:24 }}><h3 style={{ fontSize:16, fontWeight:700, fontFamily:"'Space Grotesk', sans-serif", marginBottom:16 }}>Calculation Formula</h3><div style={{ padding:16, background:"rgba(0,0,0,0.3)", borderRadius:10, fontFamily:"'DM Mono', monospace", fontSize:12, color:"#E85D3A", lineHeight:2, border:"1px solid rgba(232,93,58,0.1)" }}><div style={{ color:"rgba(255,255,255,0.3)" }}>// For each skill:</div><div>weighted_score = \u03A3(evidence_score \u00D7 type_weight)</div><div>proficiency = weighted_score / \u03A3(type_weight)</div><div style={{ marginTop:8, color:"rgba(255,255,255,0.3)" }}>// Evidence type weights:</div><div>assessment    = <span style={{ color:"#27AE60" }}>1.00</span></div><div>work_product  = <span style={{ color:"#2D9CDB" }}>0.85</span></div><div>credential    = <span style={{ color:"#F2994A" }}>0.75</span></div><div>self_attested  = <span style={{ color:"#9B51E0" }}>0.45</span></div><div style={{ marginTop:8, color:"rgba(255,255,255,0.3)" }}>// Overall:</div><div>skill_eq = avg(domain_scores)</div></div></PanelCard>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <PanelCard style={{ padding:24 }}><h3 style={{ fontSize:16, fontWeight:700, fontFamily:"'Space Grotesk', sans-serif", marginBottom:16 }}>Evidence Sources</h3><WeightExplainer/></PanelCard>
              <PanelCard style={{ padding:24 }}><h3 style={{ fontSize:16, fontWeight:700, fontFamily:"'Space Grotesk', sans-serif", marginBottom:16 }}>Inference from Work Products</h3><div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.8 }}><p style={{ marginBottom:14 }}>When a student submits a work product, the system evaluates it against the relevant <strong style={{ color:"rgba(255,255,255,0.85)" }}>Rich Skill Descriptors</strong> to infer demonstrated proficiency.</p><p>Inferred proficiency carries <strong style={{ color:"#2D9CDB" }}>85% weight</strong> \u2014 higher than self-attestation but below direct assessment.</p></div></PanelCard>
              <div style={{ background:"linear-gradient(135deg, rgba(155,81,224,0.08), rgba(45,156,219,0.05))", borderRadius:16, border:"1px solid rgba(155,81,224,0.12)", padding:20 }}><div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><Eye size={16} color="#9B51E0"/><span style={{ fontSize:13, fontWeight:700, color:"#9B51E0" }}>Static Source Bundle</span></div><p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.6, marginBottom: 14 }}>Both attached source files are bundled in the repo and exposed directly in the UI for review, download, and GitHub Pages deployment.</p><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{STATIC_SOURCE_FILES.map((file) => <SourceFileCard key={file.label} file={file} />)}</div></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
