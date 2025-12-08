# Next.js Finance Tracker

A fullstack web application built with **Next.js**, **Supabase**, and **shadcn/ui**.  
Its a Finance Tracker.

---

## ✨ Features

- **Authentication**
  - Login and sign up with Supabase magic link.
  - Secure session management with Supabase Auth.

- **Transactions**
  - Add new transactions with type: `income`, `expense`, `investment`, or `saving`.
  - If `expense` is selected, a category field is enabled.
  - Date is autofilled with today’s date (editable).
  - Amount is required, description is optional.
  - Transactions are scrollable and can be:
    - **Edited** (form pre-filled from database).
    - **Deleted** (confirmation modal).
  - Multiple transactions per day are supported and summarized.

- **Summary**
  - Monitor totals for income, expenses, investments, and savings.
  - Filter transactions by:
    - Last 24 hours
    - 7 days
    - 30 days
    - 12 months
  - Summary updates automatically when transactions are added/edited/deleted.
  - Shows percentage differences between periods.

- **Profile**
  - Edit your name (used in the UI, defaults to generic if not set).
  - Change default transaction view (24h, 7d, 30d, 12m).
  - Upload or delete avatar:
    - Max size: 512 KB
    - Formats: JPG or PNG
    - Old avatar is removed from database when replaced or deleted.
  - Logout functionality.

- **Error Handling**
  - Custom `error.tsx` and `not-found.tsx` pages.

- **UI & UX**
  - Responsive design with dark/light mode.
  - Built with **shadcn/ui** components.
  - Forms secured with **React Hook Form (RHF)** + **Zod** validation.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Supabase (Database + Auth)
- **UI**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

---
