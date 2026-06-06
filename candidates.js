const candidatesData = [
  {
    id: "TB-101",
    role: "Senior React Developer",
    skills: ["React", "TypeScript", "Redux Toolkit", "Next.js", "Tailwind CSS", "Jest"],
    experience: 7,
    hourlyRate: 85,
    annualSalary: 135000,
    education: "B.S. in Software Engineering",
    availability: "Immediate",
    bio: "Accomplished frontend engineer specializing in architectural setup of React applications. Expertise in performance tuning, responsive UI component design, and state machine architectures.",
    matchRating: 98
  },
  {
    id: "TB-102",
    role: "Full-Stack Node.js & React Engineer",
    skills: ["Node.js", "Express", "React", "MongoDB", "Docker", "GraphQL", "AWS"],
    experience: 5,
    hourlyRate: 75,
    annualSalary: 120000,
    education: "M.S. in Computer Science",
    availability: "2 Weeks Notice",
    bio: "Versatile full-stack engineer who has shipped 10+ web apps. Experienced in secure REST API endpoints, WebSockets for live features, and serverless architectures.",
    matchRating: 95
  },
  {
    id: "TB-103",
    role: "Lead Python & Django Backend Engineer",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "FastAPI", "Docker"],
    experience: 9,
    hourlyRate: 95,
    annualSalary: 155000,
    education: "B.S. in Computer Science",
    availability: "Immediate",
    bio: "Backend developer focused on building scalable, reliable distributed systems. Specialized in optimization of heavy SQL queries, database indexing, and async task queues.",
    matchRating: 97
  },
  {
    id: "TB-104",
    role: "Lead UI/UX Designer & Architect",
    skills: ["Figma", "Adobe XD", "Design Systems", "Prototyping", "User Research", "HTML/CSS"],
    experience: 6,
    hourlyRate: 70,
    annualSalary: 110000,
    education: "B.A. in Interaction Design",
    availability: "1 Week Notice",
    bio: "Creative product designer passionate about clean typography and accessibility. Experienced in creating complete, multi-platform design systems and interactive high-fidelity user tests.",
    matchRating: 92
  },
  {
    id: "TB-105",
    role: "Senior Mobile Engineer (iOS & React Native)",
    skills: ["React Native", "Swift", "Objective-C", "TypeScript", "Redux", "App Store Publishing"],
    experience: 8,
    hourlyRate: 90,
    annualSalary: 140000,
    education: "B.S. in Computer Science",
    availability: "Immediate",
    bio: "Mobile specialist with multiple high-traffic applications in the Apple App Store. Proficient in native bridges, memory leak optimization, and offline-first synchronization.",
    matchRating: 94
  },
  {
    id: "TB-106",
    role: "DevOps & Cloud Infrastructure Engineer",
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD (GitHub Actions)", "Python", "Bash"],
    experience: 5,
    hourlyRate: 85,
    annualSalary: 130000,
    education: "B.S. in Network Systems",
    availability: "Immediate",
    bio: "DevOps practitioner focusing on Infrastructure as Code (IaC) and zero-downtime deployment setups. Experienced in maintaining multi-zone Kubernetes clusters and automated backups.",
    matchRating: 96
  },
  {
    id: "TB-107",
    role: "Senior AI & Data Scientist",
    skills: ["Python", "PyTorch", "scikit-learn", "Pandas", "SQL", "OpenAI API", "Hugging Face"],
    experience: 6,
    hourlyRate: 110,
    annualSalary: 165000,
    education: "Ph.D. in Applied Mathematics",
    availability: "4 Weeks Notice",
    bio: "Data expert focused on NLP, machine learning pipelines, and predictive analytics. Deep knowledge in prompt engineering, fine-tuning large language models, and structured data visualization.",
    matchRating: 99
  },
  {
    id: "TB-108",
    role: "Product Manager (Technical)",
    skills: ["Product Roadmap", "Jira", "Agile/Scrum", "Data Analytics (Mixpanel)", "SQL", "A/B Testing"],
    experience: 7,
    hourlyRate: 80,
    annualSalary: 125000,
    education: "M.B.A. & B.S. in Computer Science",
    availability: "2 Weeks Notice",
    bio: "Technical PM adept at translating user pain points into engineering tickets. Proven track record of managing cross-functional teams of 12+ developers to launch products on time.",
    matchRating: 91
  },
  {
    id: "TB-109",
    role: "Manual & Automated QA Specialist",
    skills: ["Selenium", "Cypress", "JavaScript", "Manual Testing", "Postman", "LoadRunner"],
    experience: 4,
    hourlyRate: 55,
    annualSalary: 85000,
    education: "Associate Degree in IT",
    availability: "Immediate",
    bio: "Detail-oriented Quality Assurance analyst. Experienced in writing regression test suites, conducting API validation, load testing under high concurrency, and managing bug lifecycles.",
    matchRating: 93
  },
  {
    id: "TB-110",
    role: "Senior Angular & RxJS Developer",
    skills: ["Angular", "RxJS", "TypeScript", "NGRX", "SCSS", "Karma/Jasmine"],
    experience: 6,
    hourlyRate: 80,
    annualSalary: 125000,
    education: "B.S. in Computer Science",
    availability: "Immediate",
    bio: "Frontend developer specialized in Angular applications. Expert in reactive state management, asynchronous data flows using RxJS, and strict TypeScript patterns.",
    matchRating: 90
  },
  {
    id: "TB-111",
    role: "Cybersecurity Analyst & Engineer",
    skills: ["Penetration Testing", "OWASP Top 10", "Wireshark", "Linux", "Network Security", "IAM"],
    experience: 5,
    hourlyRate: 95,
    annualSalary: 145000,
    education: "B.S. in Cybersecurity",
    availability: "3 Weeks Notice",
    bio: "Security expert specialized in infrastructure auditing and application vulnerability assessments. Experienced in implementing SSO, RBAC models, and firewall rule configurations.",
    matchRating: 96
  },
  {
    id: "TB-112",
    role: "Data Engineer (Big Data & ETL)",
    skills: ["Apache Spark", "Hadoop", "Python", "SQL", "Snowflake", "dbt", "Airflow"],
    experience: 5,
    hourlyRate: 85,
    annualSalary: 130000,
    education: "B.S. in Computer Science",
    availability: "Immediate",
    bio: "Data architect specializing in construction and orchestration of complex ETL pipelines. Experienced in managing Snowflake warehouses and syncing webhooks to analytical platforms.",
    matchRating: 94
  },
  {
    id: "TB-113",
    role: "PHP Laravel Backend Developer",
    skills: ["PHP", "Laravel", "MySQL", "Vue.js", "Redis", "Composer", "Bootstrap"],
    experience: 8,
    hourlyRate: 65,
    annualSalary: 105000,
    education: "B.S. in Computer Science",
    availability: "Immediate",
    bio: "Backend specialist with deep expertise in the Laravel ecosystem. Highly skilled in Eloquent ORM caching, queue processing, API design, and creating custom administration panels.",
    matchRating: 91
  },
  {
    id: "TB-114",
    role: "Go Cloud Architect & Developer",
    skills: ["Go (Golang)", "gRPC", "Docker", "AWS (ECS, Lambda)", "PostgreSQL", "Microservices"],
    experience: 5,
    hourlyRate: 95,
    annualSalary: 150000,
    education: "M.S. in Software Systems",
    availability: "Immediate",
    bio: "Backend software developer crafting ultra-fast microservices in Go. Expert in handling concurrent requests utilizing channels/goroutines, writing gRPC interfaces, and optimizing database connections.",
    matchRating: 97
  },
  {
    id: "TB-115",
    role: "SaaS Marketing Growth Specialist",
    skills: ["Google Analytics", "SEO", "Copywriting", "HubSpot", "PPC (Google Ads)", "A/B Testing"],
    experience: 4,
    hourlyRate: 60,
    annualSalary: 90000,
    education: "B.A. in Marketing & Communications",
    availability: "2 Weeks Notice",
    bio: "Performance marketer focusing on SEO optimization, ad campaigns, and conversion rate optimization (CRO) for digital products. Exceptional at driving paid acquisition and organic search engine growth.",
    matchRating: 88
  }
];

// Helper to find matching candidates based on a search text query or list of skills
function matchCandidates(hiringModel, queryText, selectedSkills = [], experienceLevel = "") {
  let list = [...candidatesData];
  
  // Clean query text for search
  const text = (queryText || "").toLowerCase().trim();
  
  if (text || selectedSkills.length > 0 || experienceLevel) {
    list = list.map(c => {
      let scoreBonus = 0;
      
      // Check skills
      let matchingSkillsCount = 0;
      c.skills.forEach(skill => {
        const skillLower = skill.toLowerCase();
        if (text.includes(skillLower)) scoreBonus += 15;
        if (selectedSkills.some(s => s.toLowerCase() === skillLower)) scoreBonus += 25;
      });
      
      // Check roles
      if (text.includes(c.role.toLowerCase())) scoreBonus += 30;
      
      // Check general keywords in bio
      const bioWords = c.bio.toLowerCase().split(/\s+/);
      bioWords.forEach(word => {
        if (word.length > 3 && text.includes(word)) scoreBonus += 2;
      });

      // Experience match
      if (experienceLevel) {
        const years = c.experience;
        if (experienceLevel === "junior" && years <= 3) scoreBonus += 20;
        else if (experienceLevel === "mid" && years > 3 && years <= 6) scoreBonus += 20;
        else if (experienceLevel === "senior" && years > 6) scoreBonus += 20;
      }
      
      // Calculate adjusted match score based on base matchRating + bonuses
      let calculatedRating = c.matchRating;
      if (scoreBonus > 0) {
        calculatedRating = Math.min(100, Math.round((c.matchRating + scoreBonus) / (1 + scoreBonus / 100)));
      } else if (text || selectedSkills.length > 0) {
        // If there was a query but nothing matched, decrease rating
        calculatedRating = Math.max(40, c.matchRating - 30);
      }
      
      return {
        ...c,
        matchRating: calculatedRating
      };
    });
    
    // Sort by calculated match rating descending
    list.sort((a, b) => b.matchRating - a.matchRating);
  }
  
  return list;
}
