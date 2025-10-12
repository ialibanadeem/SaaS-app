

# 🎙️ Converso LMS - SaaS App

**Live Demo:** (https://saa-s-app-puce.vercel.app/)

An interactive conversational AI web application that lets users create, manage, and talk to custom AI companions.  
Built with **Next.js**, **Supabase**, **Clerk**, and **TailwindCSS**, deployed on **Vercel**.

---

## 🚀 Features

- 🧠 Real-time AI voice interaction  
- 🗣️ Live transcription with finalized message display  
- 🎨 Custom companion creation (subject, style, tone, and voice)  
- 📜 Session history tracking  
- 🔐 Authenticated user limits based on plan (e.g., 3 or 10 companions)  
- 🧩 Error monitoring with Sentry  
- ⚡ Responsive, clean UI with TailwindCSS + Framer Motion

---

## 🏗️ Tech Stack

- **Framework:** Next.js (App Router, Server Components)  
- **Database:** Supabase (PostgreSQL + Realtime)  
- **Auth:** Clerk  
- **Styling:** Tailwind CSS  
- **Voice / Transcription:** vAPI SDK  
- **Error Tracking:** Sentry  
- **Deployment:** Vercel

---

## 🧑‍💻 Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
  

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`

---

## 🧩 Database Schema (Supabase)

| Table               | Columns                                      |
| ------------------- | -------------------------------------------- |
| **Companion**       | id, name, subject, topic, author, created_at |
| **session_history** | id, user_id, companion_id, created_at        |


