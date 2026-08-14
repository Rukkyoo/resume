# AI Resume Tailor (Rez)

An enterprise-grade, AI-powered application designed to analyze candidate resumes against job descriptions, calculate ATS match compatibility scores, and deliver actionable suggestions for job seekers.

---

## Problem Statement

Job seekers often apply to multiple jobs, each requiring a customized resume. Manually editing a resume for every application is repetitive, time-consuming, and increases the risk of overlooking important keywords that Applicant Tracking Systems (ATS) use to filter candidates.

AI Resume Tailor solves this problem by giving job seekers immediate, data-driven feedback. By processing raw resume text alongside target job descriptions, the application highlights key skill alignments, flags missing industry terminology, and computes an objective compatibility score in seconds.

---

## Architecture Overview

The application follows a decoupled Next.js App Router architecture, leveraging client-side document processing, serverless API routes, and external AI services.

```
+-----------------------------------------------------------------------+
|                            Client Layer                               |
|  Next.js 16 (React 19) + Framer Motion + Lightswind + Tailwind CSS   |
+-----------------------------------++----------------------------------+
                                    ||
                                    || Client-side PDF Parsing (pdfjs-dist)
                                    \/
+-----------------------------------------------------------------------+
|                           Application Layer                           |
|      Next.js App Router Server Routes (/api/chat, /api/resumes)       |
+-------------------------+-------------------+-------------------------+
                          |                   |
                          |                   |
                          \/                  \/
+-----------------------------------+  +--------------------------------+
|             AI Layer              |  |         Database Layer         |
|  Vercel AI SDK + Google Gemini    |  |  MongoDB Atlas Driver          |
|  (@ai-sdk/google)                 |  |  User & Resume Persistence     |
+-----------------------------------+  +--------------------------------+
```

### Architectural Principles

1. **Client-Side Document Processing**: PDF parsing is executed dynamically in the browser via `pdfjs-dist`. Raw binary files are processed locally, extracting textual content before hitting server endpoints. This enhances privacy, reduces payload size, and eliminates server-side storage overhead for raw documents.
2. **Unified Component System**: A centralized form component (`TailorResumeCard`) is shared between public landing pages and authenticated user dashboards, providing uniform form validation, upload handling, state synchronization, and modal feedback.
3. **Tiered Access Control**: Unauthenticated guests receive a score snippet and basic summary. Authenticated users (via Google OAuth) receive full analytical breakdowns, keyword recommendations, and long-term storage of tailored iterations.
4. **Lazy Database Connections**: Database clients lazy-initialize connections at runtime rather than module load time, guaranteeing zero build-time connection failures during static generation pipelines.

---

## Technology Stack

### Core Framework & Runtime
- **Next.js 16 (App Router)**: Hybrid SSR/SSG framework utilizing Turbopack for compilation.
- **React 19**: Modern UI rendering engine.
- **TypeScript 5**: Strict compile-time type safety across data contracts, UI components, and API routes.

### AI Integration
- **Vercel AI SDK (`ai`)**: Standardized interface for model invocation and text generation.
- **Google Generative AI Provider (`@ai-sdk/google`)**: Integration with Google Gemini Flash models (`gemini-flash-latest`, `gemini-3.5-flash`).

### UI & Styling
- **Tailwind CSS 4**: Utility-first styling methodology.
- **Lightswind UI**: UI design system components.
- **Framer Motion**: Micro-interactions and transition animations.
- **Lucide React & React Icons**: Vector icon sets.

### Authentication & Storage
- **NextAuth.js v4**: OAuth 2.0 authentication supporting Google Provider.
- **MongoDB Atlas Native Driver**: Enterprise Document Database integration for user profiles and saved resume tailoring records.

---

## Key Features

- **Instant Parsing**: Client-side extraction for `.pdf` and `.txt` files up to 5 MB.
- **ATS Match Scoring**: Algorithmic assessment yielding a 0-100 compatibility percentage.
- **Actionable Breakdown**: Structured feedback categories for strengths, areas of improvement, and missing keywords.
- **Interactive Editing**: In-modal editing of target job descriptions with live change tracking.
- **Authentication Gating**: Automated session evaluation ensuring premium insights are reserved for registered users.

---

## Environment Configuration

Create a `.env.local` file in the project root directory containing the following keys:

```env
# Authentication Configuration
AUTH_SECRET="your-32-character-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"

# Database Configuration
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/?appName=Cluster0"
MONGODB_DB="resume_ai"

# AI Provider Configuration
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-studio-api-key"
```

---

## Getting Started

### Prerequisites

Ensure the following tools are installed locally:
- Node.js 20.x or later
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rukkyoo/resume.git
   cd resume/rez
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open `http://localhost:3000` in your web browser.

---

## Production Build & Deployment

To verify and construct the optimized production bundle:

```bash
pnpm run build
```

To run the production build locally:

```bash
pnpm start
```

When deploying to Vercel or similar serverless platforms, ensure all environment variables listed in `.env.local` are configured within your deployment project settings.
