# Bertrude - Minimalist Fitness Session Timer

Bertrude is a Progressive Web App (PWA) designed to guide you through your biweekly fitness sessions with a minimalist, clean, and highly focused user experience. It provides structured interval timers with visual cues, working entirely offline, and optimized for mobile and desktop screens.

---

## 🏃‍♂️ Core Concept

The app helps you execute high-intensity interval training (HIIT) structured around a **3x3 circuit format**:
*   **The 3x3 Structure:** You perform a round of **3 distinct exercises**, repeating that set of exercises **3 times** (9 exercise intervals total).
*   **Intervals:** Each exercise interval is **50 seconds of work**, followed by **10 seconds of rest**.
*   **Rounds & Rest:** 
    *   One complete 3x3 circuit takes **9 minutes** (9 × 60s).
    *   Between each 9-minute round, you get **1 minute of rest**.
    *   Workouts are configured in increments of 10 minutes: **10, 20, or 30 minutes**.

---

## ⏱️ Workout Configurations

Based on the selected workout length, the session structure is configured as follows:

| Target Duration | Structure | Math Breakdown | Actual Active Time |
| :--- | :--- | :--- | :--- |
| **10 Minutes** | 1 Round (3 exercises × 3 sets) | 9 mins workout + 1 min wrap-up/cooldown | 10:00 |
| **20 Minutes** | 2 Rounds (2 different sets of 3 exercises) | 9 mins (R1) + 1 min rest + 9 mins (R2) + 1 min wrap-up | 20:00 |
| **30 Minutes** | 3 Rounds (3 different sets of 3 exercises) | 9 mins (R1) + 1 min rest + 9 mins (R2) + 1 min rest + 9 mins (R3) + 1 min wrap-up | 30:00 |

---

## 🏋️‍♂️ Exercise Pool (9 Core Exercises)

To support up to 3 unique rounds (requiring 9 distinct exercises), the app features the following movements, each represented by a clean, minimalist visual icon:

### Round 1: Cardio & Lower Body
1.  **Rope Skipping** 🔌 — High-intensity coordination and cardio.
2.  **Squats** 🦵 — Bodyweight or dumbbell goblet squats for lower body power.
3.  **Dumbbell Shoulder Press / Thrusters** 🏋️‍♂️ — Upper body pressing and core stability.

### Round 2: Upper Body & Core
4.  **Dips** 🪑 — Chair/bench dips targeting triceps and chest.
5.  **Push-ups** 🪵 — Classic chest, shoulders, and core development.
6.  **Plank / Core Twists** 🧘 — Isometric core hold or dynamic twists.

### Round 3: Posterior Chain & Pulling
7.  **Dumbbell Rows / Renegade Rows** 🚣 — Upper back and pulling strength.
8.  **Kettlebell / Dumbbell Swings** 🍑 — Hip hinge power and posterior chain.
9.  **Lunges** 🚶‍♂️ — Unilateral leg strength and balance.

---

## 📱 User Experience (UX) Flow

1.  **Setup Screen:**
    *   Minimalist landing screen showing the application title: **Bertrude**.
    *   Simple selector for Workout Duration: **10 Min**, **20 Min**, or **30 Min**.
    *   A prominent, pulsing **"Start Session"** button.
2.  **Active Session Screen:**
    *   **Main Timer:** Large, high-contrast countdown timer displaying seconds remaining in the current state (Work or Rest).
    *   **Visual Ring/Progress Bar:** A smooth circular progress indicator wrapping around the timer.
    *   **Current Action:** Large label indicating the current phase: `WORK` (in energetic green/teal) or `REST` (in calm amber/blue).
    *   **Exercise Card:** Displays the current exercise name along with its minimalist icon.
    *   **Up Next:** A small footer indicator showing the upcoming exercise during the rest/transition phase.
    *   **Round Tracker:** Visual dots representing progress through the current set of 3 exercises and the overall rounds (e.g., `Round 1/2 • Set 2/3`).
    *   **Controls:** Clean, accessible `Pause / Resume` and `Exit Session` buttons.
3.  **Completion Screen:**
    *   Celebrating the completed session with stats (Total duration, rounds finished).
    *   A simple button to return to the home screen.

---

## 🎨 Visual Design System (Minimalist & Premium)

*   **Theme:** Dark mode by default to save battery on mobile screens and keep a focused, athletic ambiance.
*   **Palette:**
    *   *Background:* Deep Slate / Pitch Black (`#121214`)
    *   *Surfaces (Cards/Buttons):* Glassmorphic semi-transparent gray with subtle borders (`rgba(255, 255, 255, 0.05)`)
    *   *Work State:* Energetic Emerald Green (`#10B981`) or Electric Teal (`#06B6D4`)
    *   *Rest State:* Soft Warm Amber (`#F59E0B`) or Cool Lavender/Blue (`#6366F1`)
    *   *Text:* Crisp Off-White (`#F3F4F6`) and Muted Gray (`#9CA3AF`)
*   **Typography:** Modern geometric sans-serif (e.g., *Outfit* or *Inter* from Google Fonts).
*   **Audio/Haptic Feedback:** Simple high/low audio tones at the end of countdowns (3, 2, 1, Go!) to allow the user to focus without looking at the screen.

---

## 🛠️ Technical Stack & Architecture

To ensure speed, responsiveness, and seamless offline usage, the app will be built with:
1.  **Frontend Core:** Vanilla HTML5, CSS3 (variables, CSS Grid, Flexbox, custom animations), and modern ES6 JavaScript.
2.  **PWA Integration:** 
    *   `manifest.json` defining app capabilities, theme colors, and icons.
    *   Service Worker for aggressive caching of assets, styles, scripts, and fonts, allowing 100% offline functionality.
3.  **Asset Management:** Lucide icons or raw inline SVGs for ultra-lightweight, crisp, resolution-independent exercise illustrations.
4.  **Audio:** Web Audio API to synthesize countdown beeps dynamically (avoiding the need to load large audio file assets over the network).

---

## 🔮 Future Improvements Roadmap

We have designed the architecture of the timer queue to accommodate the following future additions:
*   **Warm-up phase:** A 1-minute light warm-up sequence at the very beginning of the session.
*   **Cooldown & Stretching:** A 3 to 5 minutes structured stretching sequence at the end of the session.
*   **Exercise Customization:** Later on we will show on the screen for each exercise three different levels for the user to choose from ( beginner, intermediate, advanced). These variatns will be shown on the screen but nothing else should change. The images will be adjusted accordingly.
*   **Images:** The images showing the exercises might evolve later on to be animations to help the users understand what they should do.
    
