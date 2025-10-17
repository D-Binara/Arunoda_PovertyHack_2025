# 🌉 Arunoda — Connecting Ideas to Impact

**DreamBridge** is a social innovation platform that connects grassroots innovators, small entrepreneurs, and skilled individuals with mentors, investors, and collaborators — helping turn ideas into real impact.  
This repository contains the web app built using **Next.js (App Router)**, with offline-first capabilities, multimedia storytelling, and bilingual support.

---

## 🚀 Project Overview

DreamBridge blends **community engagement** and **digital empowerment**.  
It enables users — especially from rural or low-income areas — to:

- 🎤 **Share their stories and ideas**
- 🧠 **Learn through interactive story packs**
- 🛍️ **Promote local products**
- 💼 **Find jobs and collaborations**
- 🏅 **Track progress and achievements**

Offline-first design ensures participation even with limited internet access.

---

## 🧭 Core Features

### `/` — **Home**
- Hero section with title, subtitle, and CTA buttons:  
  - “Start a Story”  
  - “Show My Skill”  
- ⭐ **Story of the Week** card (with play button)  
- 🎓 **Learn & Grow** carousel (content packs)  
- 🛍️ **Local Products** mini-grid (3 items)  
- 💼 **Job & Collaboration** list (3 items)  
- 🏅 **My Progress** widget (badges + progress bar)  
- 💡 **Daily Tip** rotator  
- Footer nav: Home • Learn • Jobs • Messages • Profile  
- “Offline Available” pill for cached items

---

### `/learn`
- Story Pack list with download size and offline button  
- Each card shows % completion, stars, badges  
- Search/filter by topic (Saving, Small Business, Digital Basics)

---

### `/learn/[storyId]` — **Story Player**
- Story title + character image  
- Audio player (Play/Pause, progress)  
- Scene text (2 short lines) with Yes/No or A/B choices  
- Outcome feedback (text + optional audio)  
- Mini quiz → badge + progress update  
- Uses **TTS fallback** if no `audioUrl`  
- “Available Offline” badge  

---

### `/products`
- Grid of product posts: image, title, price/“negotiable”, village/district  
- Filter tabs: All • Food • Crafts • Services  
- 🎙️ Seller voice intro (play button)  
- Actions: WhatsApp/SMS share, Save, Report  
- “Post a Product” → `/products/new`

---

### `/products/new`
- Form: title, description, price, category, village, images (≤1.5MB / .webp), optional 30s audio  
- Offline outbox with “Pending Sync” chip  

---

### `/jobs`
- Job list with pay, location, and status (Open/Filled)  
- “Quick Apply”: record 20–30s voice or text application (offline queued)  
- Filters: district, skill, pay type  

---

### `/stories`
- “Inspire Wall” with curated success stories (image + 1-min audio)  
- Filters: district, category  
- “Share Your Story” → `/stories/new`

---

### `/stories/new`
- Form: name/nickname, village/district, category, photo (≤1MB), audio (≤60s), optional short text  
- Queued for moderation (offline-ready)

---

### `/messages`
- Thread list with unread indicator  
- Chat window supports text + audio  
- Offline queue with background sync and pending status indicator (`⏳`)

---

### `/progress`
- “My Learning Journey” page  
- Progress ring + badges (Smart Saver, Skill Builder, Quick Learner, Story Star)  
- Share progress to WhatsApp  

---

### `/profile`
- Profile card: photo, name, role, village/district, bio, skills  
- Contact preferences (WhatsApp / SMS / Call)  
- Optional LankaQR / Bank info  
- Buttons: Edit • Language Switch (EN | SI | TA) • Clear Cache • Sign Out  

---

### `/admin` (Demo Only)
> Protected by `NEXT_PUBLIC_DEMO_ADMIN=true`

- Moderation queue for pending posts & stories  
- Approve / Reject flow  
- “Feature of the Week” selection  
- Impact snapshot (mock telemetry):  
  - Downloads  
  - Stories completed  
  - Badges earned  

---

## 🛠️ Tech Stack

| Layer | Tech / Tools |
|-------|---------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS / ShadCN UI |
| **Storage** | IndexedDB + Service Worker (Offline Cache, Outbox Sync) |
| **Audio** | Web Audio API + TTS Fallback |
| **Backend (optional)** | Supabase / Firebase / Local mock API |
| **Internationalization** | `next-intl` (English / Sinhala / Tamil) |
| **PWA Support** | Offline-first with background sync |
| **Deployment** | Vercel / Netlify / Cloudflare Pages |

---

## 🧩 Folder Structure (App Router)

