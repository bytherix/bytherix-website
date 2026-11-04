export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  slug: string;
  description?: string;
  journeying?: string;
  linkedin?: string;
  github?: string;
  skills?: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Anish Parajuli",
    role: "Founder & CEO",
    image: "/team/anish.png",
    slug: "anish-parajuli",
    description:
      "My vision is to create meaningful technology that inspires people and contributes to a smarter future.",
    journeying: `Who am I? It sounds like a simple question, but working across AI, IoT, robotics, software, cybersecurity, and engineering, I've found it's not always easy to answer. Some days I say I'm an AI engineer, an app developer, a game developer, or someone who works in IoT and robotics. Sometimes I avoid saying I'm an ethical hacker — not because I'm ashamed of cybersecurity, but because the word 'hacker' is so often misunderstood. In Nepal especially, people hear it and think of crime, stolen data, or fraud. I understand why. But a hacker isn't automatically a criminal. A hacker can simply be someone who asks: How does this system work? Where can it fail? How can we make it safer? That curiosity is what drew me in, and it's the same curiosity that eventually became Bytherix.

I don't like to present myself as someone who has mastered everything — I'm a learner who loves learning. There's always another system to understand, another problem to solve, another language to pick up. The more I learn, the more I realize how much I don't know, and I've come to like that feeling. It keeps me curious. This mindset shapes how I think even outside of code. Sit me on a local bus where people are casually discussing bank details or family matters in public, and I'm not thinking about how to exploit that information — I'm thinking about how we protect people from exposing it without realizing it. Sometimes the answer isn't sophisticated technology at all; it's just awareness. That's cybersecurity too — not only breaking or defending systems, but understanding human behavior, privacy, and responsibility.

Bytherix grew out of that same belief: that technology should have a purpose. It shouldn't just look innovative — it should solve real problems, create real opportunities, and offer meaningful experiences. My vision for Bytherix is to build a technology-driven organization where creativity, innovation, and purpose come together — a place where ideas can grow into products, services, and experiences that create real value.

Maybe I don't need one label. I'm an engineer, a developer, a tech enthusiast — someone who builds, teaches, and researches technology, and yes, someone who is deeply curious about cybersecurity and ethical hacking. Technology can be used for good or bad; the responsibility was never in the technology itself, but in the person using it. And maybe that's the real challenge of being a technologist today — not just knowing what you can do, but understanding what you should do.`,
    linkedin: "https://www.linkedin.com/in/anish-parajuli-9a9333398/",
    github: "https://github.com/AnishParajuli1/AnishParajuli1",
    skills: [
      "AI & Machine Learning",
      "IoT",
      "Robotics",
      "Software Development",
      "Cybersecurity",
      "Ethical Hacking",
      "Engineering",
      "Research",
    ],
  },

  {
    id: 2,
    name: "Nikesh Munikar",
    role: "Managing Director",
    image: "/team/nikesh.jpeg",
    slug: "nikesh-munikar",
    description: "My vision is to build strong teams, turn ambitious ideas into reality, and create meaningful opportunities through leadership and collaboration.",
    journeying: `I have always believed that building something meaningful requires more than just having a good idea. It takes direction, commitment, the ability to understand people, and the patience to turn plans into reality. My interest in management and leadership comes from this belief — that meaningful progress happens when people, ideas, and resources work together toward a common goal.

For me, leadership is not simply about making decisions or assigning responsibilities. It is about understanding different perspectives, recognizing people's strengths, and creating an environment where everyone has the opportunity to contribute. Every individual brings a different way of thinking, and I believe that bringing those perspectives together is what makes a team stronger. Good leadership means knowing when to guide, when to listen, and when to give others the space to grow.

As Managing Director at Bytherix, my focus is on connecting vision with execution. An organization cannot grow through ideas alone; it needs clear strategies, effective coordination, accountability, and consistent effort. I believe in approaching challenges with a practical mindset, making thoughtful decisions, and ensuring that the work we do contributes to something bigger than individual achievements. Whether it involves planning projects, coordinating teams, or exploring new opportunities, I see every responsibility as a chance to make the organization better.

I also believe that growth should never come at the cost of values. Trust, transparency, collaboration, and responsibility are essential to building an organization that lasts. My goal is to help create a workplace where people feel valued, ideas are taken seriously, and everyone understands the purpose behind what they do.

At Bytherix, I see an opportunity to contribute to something that goes beyond delivering technology. I want to be part of building an organization that creates opportunities, develops capable people, and turns ambitious ideas into meaningful outcomes. To me, successful leadership is not measured only by what an organization achieves, but also by the people it empowers and the positive impact it creates along the way.`,
    linkedin: "https://www.linkedin.com/in/nikesh-munikar/",
    github: "https://github.com/NikeshMunikar",
    skills: [
      "Management",
      "Leadership",
      "Business Strategy",
      "Project Management",
      "Team Building",
    ],
  },

  {
    id: 3,
    name: "Shriya Pantha",
    role: "Head of HR",
    image: "/team/shriya.jpeg",
    slug: "shriya-pantha",
    description: "My vision is to create a supportive workplace where people feel valued, discover their potential, and grow together toward a shared future.",
    journeying: `I have always believed that an organization is defined not only by the work it produces, but also by the people who make that work possible. Behind every successful project, every achievement, and every new opportunity, there are individuals bringing their own experiences, ideas, strengths, and ambitions. This belief is what makes human resources and people management meaningful to me.

I see working with people as something that requires more than policies, procedures, or administrative responsibilities. It requires understanding different personalities, listening to concerns, recognizing individual potential, and creating an environment where people feel respected and supported. Everyone has something valuable to contribute, but sometimes they need the right encouragement, guidance, and opportunities to discover what they are capable of. I believe that helping people grow is one of the most important responsibilities of HR.

As Head of HR at Bytherix, my focus is on creating a positive and productive workplace where people and organizational goals can grow together. From recruitment and team coordination to employee engagement and workplace development, I believe every HR responsibility plays a role in shaping the overall experience of an organization. Finding the right people is important, but helping them feel connected, motivated, and appreciated is equally essential.

One thing I strongly believe in is that a healthy workplace is built through communication and mutual respect. People should feel comfortable sharing ideas, asking questions, expressing concerns, and learning from mistakes. A strong team is not one where everyone thinks the same way, but one where different perspectives are welcomed and people work together with understanding and professionalism. I want to contribute to building that kind of environment at Bytherix.

For me, HR is ultimately about people, not just positions or processes. It is about recognizing that behind every professional role is a person with goals, challenges, and the desire to improve. My vision is to help build a workplace where individuals can develop their abilities, find meaningful opportunities, and feel that their contributions genuinely matter.

At Bytherix, I hope to be part of creating a culture where people are the foundation of progress. Because when people feel supported, respected, and motivated, they do more than complete their responsibilities — they become part of something they believe in.`,
    linkedin: "https://www.linkedin.com/in/shriya-pantha-675668343/",
    github: "https://github.com/ShriyaPantha",
    skills: [
      "Human Resources",
      "Leadership",
      "Team Management",
      "Recruitment",
      "Employee Relations",
    ],
  },
];
