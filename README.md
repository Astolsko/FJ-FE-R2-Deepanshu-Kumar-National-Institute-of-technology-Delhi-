# 🚗 Ride Sharing Frontend Application

A **frontend-only ride sharing application** built using **Next.js, TypeScript, and Tailwind CSS**, implementing all required features as specified in the assessment.  
Backend-dependent functionalities are intentionally **mocked using dummy data** to focus on frontend logic, UI/UX, and maintainable architecture.

---

## 📌 Project Overview

This project simulates a modern ride-sharing platform from a **frontend perspective**.  
It demonstrates user flows such as ride booking, payments, ride history, notifications, chat UI, and dark mode, without relying on a backend server.

The application is designed to be **responsive**, **accessible**, and **easy to extend** into a full-stack solution in the future.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **State Management:** React Hooks, localStorage
- **Notifications:** Custom Toast Provider
- **Maps:** Google Maps iframe
- **Payments:** Mock Stripe-like service (frontend simulation)

---

## ✨ Features Implemented

### 🔐 User Authentication (Frontend Only)

- Login flow using dummy data
- Authentication state handled via `localStorage`
- User profile screen
- No backend or real API calls (as per frontend scope)

---

### 🚕 Ride Booking

- Pickup and destination input
- Route visualization using Google Maps iframe
- Ride type selection (Economy / Premium)
- Fare estimation before booking
- Ride confirmation only after payment

---

### 📜 Ride History

- View list of completed rides
- Displays ride date, fare, and driver name

---

### 👤 Profile Management

- View and edit user profile information
- Display basic ride-related statistics

---

### 💳 Payment Integration (Mocked)

- Add and remove payment methods
- Stripe-like mock payment flow
- Asynchronous payment simulation
- Ride booking enabled only after successful payment

> **Note:** Payment integration is mocked using dummy data to simulate Stripe’s testing flow, which is acceptable for a frontend-only implementation.

---

### 🤝 Ride Sharing

- Enable/disable ride sharing
- Select number of passengers
- Automatic fare split per passenger

---

### ⭐ Feedback System

- Rate completed rides
- Leave comments for drivers
- Feedback handled at UI level

---

### 🔔 Notification System

- Toast notifications for:
  - Ride booking
  - Payments
  - Errors and alerts
- Implemented using a global Toast Provider

---

## 🌗 Additional Features (Day 4)

### 💬 Live Chat (Frontend UI)

- Chat interface between user and driver
- Message simulation with typing indicator
- UI-only implementation (no socket backend)

---

### 🌙 Dark Mode

- Global light/dark mode toggle
- Manual toggle with persistent preference
- System theme fallback
- Implemented using CSS variables
- No component-level styling changes required

---

### 📱 Mobile Responsiveness

- Fully responsive across mobile, tablet, and desktop
- Optimized layouts and typography
- No horizontal overflow issues

---

### 🧠 TypeScript Support

- End-to-end TypeScript usage
- Typed components, state, and services
- Improved maintainability and code reliability

---

## 📂 Project Structure

The project follows a modular structure using Next.js App Router.

- `src/app` – Application routes and pages
- `src/app/components` – Reusable UI components
- `src/lib` – Mock services (e.g., payment simulation)
- `src/types` – TypeScript type definitions
- `globals.css` – Global styles and theme configuration


---

## 🧪 How to Run Locally

```bash
npm install
npm run dev
Open in browser:

http://localhost:3000
```
