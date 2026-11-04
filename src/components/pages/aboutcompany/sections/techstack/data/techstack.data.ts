import ReactIcon from "../../../../../../assets/icons/techstack/react.svg";
import TypeScriptIcon from "../../../../../../assets/icons/techstack/typescript.svg";
import TailwindIcon from "../../../../../../assets/icons/techstack/tailwind.svg";
import ViteIcon from "../../../../../../assets/icons/techstack/vite.svg";
import NodeIcon from "../../../../../../assets/icons/techstack/nodejs.svg";
import ExpressIcon from "../../../../../../assets/icons/techstack/express.svg";
import FastAPIIcon from "../../../../../../assets/icons/techstack/fastapi.svg";
import JavaScriptIcon from "../../../../../../assets/icons/techstack/js.svg";
import PythonIcon from "../../../../../../assets/icons/techstack/python.svg";
import CSharpIcon from "../../../../../../assets/icons/techstack/csharp.svg";
import DartIcon from "../../../../../../assets/icons/techstack/dart.svg";
import MongoDBIcon from "../../../../../../assets/icons/techstack/mongodb.svg";
import PostgreSQLIcon from "../../../../../../assets/icons/techstack/pgsql.svg";
import FirebaseIcon from "../../../../../../assets/icons/techstack/firebase.svg";
import MySQLIcon from "../../../../../../assets/icons/techstack/mysql.svg";
import FlutterIcon from "../../../../../../assets/icons/techstack/flutter.svg";
import AndroidIcon from "../../../../../../assets/icons/techstack/android.svg";
import FigmaIcon from "../../../../../../assets/icons/techstack/figma.svg";
import IllustratorIcon from "../../../../../../assets/icons/techstack/adobe-illustrator.svg";
import GitIcon from "../../../../../../assets/icons/techstack/git.svg";
import GitHubIcon from "../../../../../../assets/icons/techstack/github.svg";
import DockerIcon from "../../../../../../assets/icons/techstack/docker.svg";
import VercelIcon from "../../../../../../assets/icons/techstack/vercel.svg";
import VSCodeIcon from "../../../../../../assets/icons/techstack/vscode.svg";
import PostmanIcon from "../../../../../../assets/icons/techstack/postman.svg";
import UnityIcon from "../../../../../../assets/icons/techstack/unity.svg";
import FramerIcon from "../../../../../../assets/icons/techstack/framer.svg";
import ThreeJSIcon from "../../../../../../assets/icons/techstack/three-js.png";

export interface Technology {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
}

export const TECHNOLOGIES: Technology[] = [
    { id: "react", name: "React", icon: ReactIcon, color: "#61DAFB", description: "Frontend library" },
    { id: "reactnative", name: "React Native", icon: ReactIcon, color: "#61DAFB", description: "Mobile framework" },
    { id: "typescript", name: "TypeScript", icon: TypeScriptIcon, color: "#3178C6", description: "Typed JavaScript" },
    { id: "tailwindcss", name: "Tailwind CSS", icon: TailwindIcon, color: "#06B6D4", description: "CSS framework" },
    { id: "vite", name: "Vite", icon: ViteIcon, color: "#646CFF", description: "Build tool" },
    { id: "nodejs", name: "Node.js", icon: NodeIcon, color: "#5FA04E", description: "JavaScript runtime" },
    { id: "express", name: "Express.js", icon: ExpressIcon, color: "#FFFFFF", description: "Backend framework" },
    { id: "fastapi", name: "FastAPI", icon: FastAPIIcon, color: "#009688", description: "Python API framework" },
    { id: "javascript", name: "JavaScript", icon: JavaScriptIcon, color: "#F7DF1E", description: "Programming language" },
    { id: "python", name: "Python", icon: PythonIcon, color: "#3776AB", description: "Programming language" },
    { id: "csharp", name: "C#", icon: CSharpIcon, color: "#68217A", description: "Programming language" },
    { id: "dart", name: "Dart", icon: DartIcon, color: "#0175C2", description: "Programming language" },
    { id: "mongodb", name: "MongoDB", icon: MongoDBIcon, color: "#47A248", description: "NoSQL database" },
    { id: "postgresql", name: "PostgreSQL", icon: PostgreSQLIcon, color: "#4169E1", description: "Database" },
    { id: "firebase", name: "Firebase", icon: FirebaseIcon, color: "#FFCA28", description: "Backend platform" },
    { id: "mysql", name: "MySQL", icon: MySQLIcon, color: "#4479A1", description: "Database" },
    { id: "flutter", name: "Flutter", icon: FlutterIcon, color: "#02569B", description: "Mobile framework" },
    { id: "android", name: "Android", icon: AndroidIcon, color: "#3DDC84", description: "Mobile platform" },
    { id: "figma", name: "Figma", icon: FigmaIcon, color: "#F24E1E", description: "Design tool" },
    { id: "illustrator", name: "Adobe Illustrator", icon: IllustratorIcon, color: "#FF9A00", description: "Vector design tool" },
    { id: "git", name: "Git", icon: GitIcon, color: "#F05032", description: "Version control" },
    { id: "github", name: "GitHub", icon: GitHubIcon, color: "#FFFFFF", description: "Code hosting" },
    { id: "docker", name: "Docker", icon: DockerIcon, color: "#2496ED", description: "Container platform" },
    { id: "vercel", name: "Vercel", icon: VercelIcon, color: "#FFFFFF", description: "Deployment platform" },
    { id: "vscode", name: "VS Code", icon: VSCodeIcon, color: "#007ACC", description: "Code editor" },
    { id: "postman", name: "Postman", icon: PostmanIcon, color: "#FF6C37", description: "API platform" },
    { id: "unity", name: "Unity", icon: UnityIcon, color: "#FFFFFF", description: "Game engine" },
    { id: "framermotion", name: "Framer Motion", icon: FramerIcon, color: "#FFFFFF", description: "Animation library" },
    { id: "threejs", name: "Three.js", icon: ThreeJSIcon, color: "#FFFFFF", description: "3D library" },
    { id: "r3f", name: "React Three Fiber", icon: ReactIcon, color: "#61DAFB", description: "React 3D renderer" },
];

export const MARQUEE_ROW_1 = [
    "react",
    "typescript",
    "tailwindcss",
    "framermotion",
    "gsap",
    "threejs",
    "vite",
    "nodejs",
    "python",
    "figma",
];

export const MARQUEE_ROW_2 = [
    "mongodb",
    "postgresql",
    "firebase",
    "docker",
    "git",
    "github",
    "flutter",
    "unity",
    "r3f",
    "fastapi",
];

export const MARQUEE_ROW_3 = [
    "javascript",
    "csharp",
    "dart",
    "android",
    "express",
    "mysql",
    "vercel",
    "vscode",
    "postman",
    "illustrator",
    "reactnative",
];

export interface WorkflowStep {
    id: number;
    number: string;
    title: string;
    description: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        id: 1,
        number: "01",
        title: "Discover & Strategize",
        description:
            "We understand your business, goals, audience, and requirements to create a clear project roadmap.",
    },
    {
        id: 2,
        number: "02",
        title: "Design & Prototype",
        description:
            "We transform ideas into intuitive interfaces and interactive prototypes focused on user experience.",
    },
    {
        id: 3,
        number: "03",
        title: "Develop & Integrate",
        description:
            "We build scalable solutions using modern technologies and integrate the tools your business needs.",
    },
    {
        id: 4,
        number: "04",
        title: "Test & Optimize",
        description:
            "We test functionality, performance, responsiveness, and usability to ensure everything works smoothly.",
    },
    {
        id: 5,
        number: "05",
        title: "Deploy & Maintain",
        description:
            "We launch your solution and provide ongoing support, updates, and improvements as your business grows.",
    },
];
