# Whatchadoing App

Whatchadoing is a modern event discovery web app that helps users find upcoming events in a specified location and view weather forecasts for them. Users can save events to personal plans after logging in.

---

## 🌐 Overview
This app is built using **HTML**, **CSS**, and **vanilla JavaScript**, and integrates two external APIs:
- **Google Events via SerpAPI** for event listings
- **OpenWeather API** for weather data

## 🎯 Target Audience
- People planning to attend or organize events
- Travelers who want to know the weather before outings
- Anyone looking for things to do nearby

---

## ✨ Major Features
1. **Event Search**: Search events in any city using Google Events via SerpAPI
2. **Weather Forecast**: See current weather at the event location
3. **User Authentication**: Log in/out using simple credential-based flow
4. **Save Event Plans**: Logged-in users can save plans for future reference
5. **My Plans Page**: View and manage saved events
6. **Dynamic Weather Cards**: Expand/collapse weather info under each event
7. **Responsive Navigation**: Auto-hide login if user is authenticated
8. **LocalStorage Storage**: Plans persist via browser LocalStorage

---

## 🧩 External APIs Used
- [SerpAPI - Google Events](https://serpapi.com/google-events-api)
- [OpenWeather Geo + Weather API](https://openweathermap.org/api)

## 🧱 Modules
- `main.mjs`: Initializes app, binds logic to buttons and page events
- `dashboard.mjs`: Event search and weather logic
- `dashboard.js`: Nav and page bootstrap
- `auth.mjs`: Login/logout/register functions
- `plans-handler.mjs`: Save/remove/load event plans
- `utility.js`: Reusable helpers: toast, storage, user session

---

## 🎨 Graphic Identity
- **Color Scheme**: Warm earth tones and vibrant orange accents
- **Typography**: Sans-serif with clean readability
- **App Icon**: ⛅ (Cloud + Calendar)
- **UI Style**: Modern, clean, minimal card-based layout with subtle shadows

---

## 🗓️ Timeline
**Week 5:**
- Initial UI, API integration, event search, weather cards

**Week 6:**
- User authentication, save plans, login flow

**Week 7:**
- Plans dashboard, logout logic, error handling, styling

---

## ✅ Requirements Met
- ✔️ HTML/CSS/JS only (no frameworks)
- ✔️ Two external APIs used
- ✔️ Dynamic + static markup
- ✔️ CSS animation and transitions
- ✔️ Modular code (ESM)
- ✔️ Valid, semantic HTML + modern best practices

## 🚀 Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed

### Steps
1. Clone the repository
```bash
git clone https://github.com/emfernandezv/WDD330-SleepOutside
cd whatchadoing
```

2. Install dependencies
```bash
npm install
```

3. Start the dev server
```bash
npm run start
```

The app will be available at `http://localhost:5173/`

## 📋 Project Board
👉 [Trello Planning Board] https://trello.com/b/xxhowepG/watchadoingapp

---

## ⚠️ Known Challenges
- CORS limitations when fetching SerpAPI (solved using proxy path `/serpapi/...`)
- Differing event schema (Google vs Eventbrite)
- Weather geo-coordinates precision vs location name parsing

---

Enjoy your plans, with a clear forecast! ☀️📅

---

## Developer
**Developer:** Eduardo Fernandez

