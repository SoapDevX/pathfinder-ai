# 🎯 PathFinder AI - AI-Powered Career Accelerator Platform

> An intelligent full-stack career guidance platform that analyzes GitHub profiles, generates personalized learning roadmaps, and matches developers with their ideal job opportunities using AI.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

![PathFinder AI Banner](https://via.placeholder.com/1200x300/4F46E5/FFFFFF?text=PathFinder+AI+-+Your+Career+Companion)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

PathFinder AI is a comprehensive career development platform designed to help developers accelerate their career growth through AI-powered insights and personalized recommendations.

### Key Highlights

- **🔍 GitHub Profile Analysis**: Automatically analyzes coding activity, languages, and projects
- **🗺️ AI Learning Roadmaps**: Generates personalized 3-phase learning paths using GPT-4o-mini
- **📄 Resume Intelligence**: AI-powered resume analysis with ATS scoring
- **💼 Smart Job Matching**: Semantic job matching from LinkedIn, Indeed, and 16k+ ATS platforms
- **🎓 Career Insights**: Data-driven career recommendations and salary estimates

---

## ✨ Features

### 🔐 Authentication & User Management
- Secure JWT-based authentication
- bcrypt password hashing
- Protected routes and session management
- User profile management

### 🐙 GitHub Integration
- OAuth 2.0 GitHub authentication
- Automatic repository analysis (100+ repos)
- Language and framework detection
- Commit activity tracking
- Skill level classification (Novice → Advanced)
- Activity scoring algorithm (0-100)

### 🤖 AI-Powered Features

#### 1. Learning Roadmap Generator
- Personalized 3-phase learning paths
- Skill-based curriculum recommendations
- Resource suggestions (courses, books, projects)
- Time estimates for each phase
- Priority-based learning tracks

#### 2. Resume Analyzer
- Overall resume score (0-100)
- ATS compatibility score
- Strengths and weaknesses analysis
- Actionable improvement suggestions
- Missing skills identification

#### 3. Career Insights
- Role recommendations based on GitHub profile
- Career level assessment (Junior/Mid/Senior)
- Strength and growth area identification
- Salary range estimates
- Actionable next steps

#### 4. Job Matching System
- Multi-source job aggregation (TheirStack, RapidAPI, Adzuna)
- AI-powered semantic matching
- Skill gap analysis
- Match score calculation (0-100)
- Direct application links

---

## 🛠 Tech Stack

### Frontend
```
React 18                  - UI framework
TypeScript                - Type safety
Tailwind CSS              - Styling
React Router              - Navigation
Axios                     - HTTP client
Context API               - State management
```

### Backend
```
Node.js                   - Runtime
Express                   - Web framework
TypeScript                - Type safety
PostgreSQL                - Database
Sequelize                 - ORM
JWT                       - Authentication
bcrypt                    - Password hashing
```

### AI & External APIs
```
OpenAI GPT-4o-mini        - AI processing
GitHub API (Octokit)      - Profile analysis
TheirStack API            - Job aggregation
RapidAPI (JSearch)        - Multi-source jobs
Adzuna API                - Job listings
```

### DevOps & Tools
```
Git                       - Version control
npm                       - Package management
PostgreSQL                - Database
dotenv                    - Environment variables
```

---

## 🏗 Architecture
```
pathfinder-ai/
│
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Roadmap.tsx
│   │   │   ├── ResumeAnalyzer.tsx
│   │   │   ├── CareerInsights.tsx
│   │   │   ├── JobMatcher.tsx
│   │   │   └── Profile.tsx
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── services/            # API services
│   │   │   └── api.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── config/              # Configuration
│   │   │   └── database.ts
│   │   ├── controllers/         # Route controllers
│   │   │   ├── authController.ts
│   │   │   ├── githubController.ts
│   │   │   ├── aiController.ts
│   │   │   └── jobController.ts
│   │   ├── models/              # Database models
│   │   │   ├── User.ts
│   │   │   └── Job.ts
│   │   ├── routes/              # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── githubRoutes.ts
│   │   │   ├── aiRoutes.ts
│   │   │   └── jobRoutes.ts
│   │   ├── services/            # Business logic
│   │   │   ├── aiService.ts
│   │   │   ├── githubService.ts
│   │   │   ├── jobMatchingService.ts
│   │   │   ├── theirStackService.ts
│   │   │   ├── rapidApiJobService.ts
│   │   │   ├── adzunaJobService.ts
│   │   │   ├── mockJobService.ts
│   │   │   └── unifiedJobService.ts
│   │   ├── middleware/          # Custom middleware
│   │   └── app.ts               # Express app
│   ├── .env                     # Environment variables
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn
- OpenAI API key
- GitHub OAuth App credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pathfinder-ai.git
cd pathfinder-ai
```

2. **Set up the database**
```bash
# Create PostgreSQL database
psql postgres
CREATE DATABASE pathfinder;
CREATE USER pathfinder_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE pathfinder TO pathfinder_user;
\q
```

3. **Backend setup**
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=3001
DB_NAME=pathfinder
DB_USER=pathfinder_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_here
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/github/callback
CLIENT_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
THEIRSTACK_API_KEY=your_theirstack_key
RAPIDAPI_KEY=your_rapidapi_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_key
EOF

# Start backend
npm run dev
```

4. **Frontend setup**
```bash
cd ../client
npm install

# Start frontend
npm start
```

5. **Access the application**
```
Frontend: http://localhost:3000
Backend:  http://localhost:3001
```

---

## 📖 Usage

### 1. **Register & Login**
Create an account or login with existing credentials.

### 2. **Analyze GitHub Profile**
Enter a GitHub username to analyze coding skills and activity.

### 3. **Generate Learning Roadmap**
Input your current skills and target role to get a personalized 3-phase learning path.

### 4. **Analyze Resume**
Paste your resume text to get AI-powered feedback and ATS scoring.

### 5. **Get Career Insights**
View personalized career recommendations based on your GitHub profile.

### 6. **Find Matching Jobs**
Enter your target role and location to discover jobs that match your skills.

---

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### GitHub Endpoints

#### Analyze GitHub Profile
```http
POST /api/github/analyze
Content-Type: application/json
Authorization: Bearer <token>

{
  "username": "torvalds"
}
```

### AI Endpoints

#### Generate Learning Roadmap
```http
POST /api/ai/roadmap
Content-Type: application/json
Authorization: Bearer <token>

{
  "currentSkills": ["JavaScript", "React"],
  "targetRole": "Senior Full Stack Developer",
  "experienceLevel": "intermediate"
}
```

#### Analyze Resume
```http
POST /api/ai/resume-analysis
Content-Type: application/json
Authorization: Bearer <token>

{
  "resumeText": "...",
  "targetRole": "Backend Engineer"
}
```

#### Get Career Recommendations
```http
POST /api/ai/career-recommendations
Content-Type: application/json
Authorization: Bearer <token>

{
  "skills": {...},
  "githubStats": {...}
}
```

### Job Endpoints

#### Match Jobs
```http
POST /api/jobs/match
Content-Type: application/json
Authorization: Bearer <token>

{
  "userSkills": {...},
  "targetRole": "Full Stack Developer",
  "location": "San Francisco",
  "remote": true
}
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+-+GitHub+Analysis)

### Learning Roadmap
![Roadmap](https://via.placeholder.com/800x400/10B981/FFFFFF?text=AI+Learning+Roadmap)

### Job Matcher
![Job Matcher](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Smart+Job+Matching)

### Resume Analyzer
![Resume](https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Resume+Analysis)

---

## 🗺 Roadmap

### Version 2.0 (Planned)
- [ ] Email notifications for job matches
- [ ] Application tracking dashboard
- [ ] Interview preparation module
- [ ] LinkedIn integration
- [ ] Course recommendations (Udemy/Coursera)
- [ ] Mobile app (React Native)
- [ ] Company reviews integration
- [ ] Salary negotiation insights

### Version 3.0 (Future)
- [ ] AI chatbot for career advice
- [ ] Video interview practice
- [ ] Portfolio builder
- [ ] Networking features
- [ ] Mentorship matching

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- LinkedIn:[Isuru Cooray](https://www.linkedin.com/in/isurucooray11/)
- Github: [@SoapDevX](https://github.com/SoapDevX)
- Portfolio: --

---

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini API
- GitHub for their excellent API documentation
- TheirStack, RapidAPI, and Adzuna for job data
- The open-source community

---

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **API Endpoints**: 15+
- **Components**: 20+
- **External APIs**: 5
- **Database Tables**: 2
- **Development Time**: 2 weeks

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ using TypeScript, React, and AI

</div>

