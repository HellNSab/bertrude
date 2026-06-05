import React, { useState, useEffect } from "react";
import {
  Zap,
  Accessibility,
  Dumbbell,
  Trophy,
  Flame,
  Shield,
  Award,
  Activity,
  Footprints,
  Coffee,
  BatteryCharging,
  Heart,
  Play,
  Pause,
  Sun,
  Moon,
  Home,
  CheckCircle2
} from "lucide-react";
import { generateTimerQueue } from "./utils/timerQueue";
import { useAudio } from "./hooks/useAudio";

const iconMap = {
  Zap,
  Accessibility,
  Dumbbell,
  Trophy,
  Flame,
  Shield,
  Award,
  Activity,
  Footprints,
  Coffee,
  BatteryCharging,
  Heart
};

function ExerciseIcon({ name, className = "", size = 24, ...props }) {
  const IconComponent = iconMap[name] || Activity;
  return <IconComponent className={className} size={size} {...props} />;
}

function App() {
  const [theme, setTheme] = useState(() => {
    const persisted = localStorage.getItem("theme");
    if (persisted) return persisted;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [screen, setScreen] = useState("setup"); // 'setup' | 'active' | 'complete'
  const [duration, setDuration] = useState(10); // 10 | 20 | 30 minutes
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { initAudio, playCountdownBeep, playTransitionBeep, playCelebrationChime } = useAudio();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === "dark" ? "#121214" : "#F9FAFB");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleStartSession = () => {
    initAudio();
    const workoutQueue = generateTimerQueue(duration);
    setQueue(workoutQueue);
    setCurrentIndex(0);
    setSecondsRemaining(workoutQueue[0].duration);
    setScreen("active");
    setIsPlaying(true);

    setTimeout(() => {
      playTransitionBeep();
    }, 100);
  };

  useEffect(() => {
    if (!isPlaying || screen !== "active") return;

    const intervalId = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, screen]);

  useEffect(() => {
    if (screen !== "active" || !isPlaying) return;

    if (secondsRemaining > 0 && secondsRemaining <= 3) {
      playCountdownBeep();
    }

    if (secondsRemaining === 0) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.length) {
        playTransitionBeep();
        setCurrentIndex(nextIndex);
        setSecondsRemaining(queue[nextIndex].duration);
      } else {
        playCelebrationChime();
        setScreen("complete");
        setIsPlaying(false);
      }
    }
  }, [secondsRemaining, isPlaying, screen, currentIndex, queue, playCountdownBeep, playTransitionBeep, playCelebrationChime]);

  const handlePauseToggle = () => {
    initAudio();
    setIsPlaying((prev) => !prev);
  };

  const handleExitSession = () => {
    if (window.confirm("Are you sure you want to end this session?")) {
      setScreen("setup");
      setIsPlaying(false);
    }
  };

  const activePhase = queue[currentIndex];

  const getThemeStyles = () => {
    if (!activePhase) return {};

    let accent = "var(--accent-work)";
    let glow = "var(--accent-work-glow)";

    if (activePhase.type === "rest" || activePhase.type === "round_rest") {
      accent = "var(--accent-rest)";
      glow = "var(--accent-rest-glow)";
    } else if (activePhase.type === "cooldown") {
      accent = "var(--accent-cooldown)";
      glow = "var(--accent-cooldown-glow)";
    }

    return {
      "--accent": accent,
      "--accent-glow": glow
    };
  };

  return (
    <div style={getThemeStyles()} className="app-container">
      {/* Header */}
      <header className="app-header glass-panel">
        <div className="header-info">
          <h1 className="app-title">Bertrude</h1>
          <span className="app-subtitle">HIIT Circuit Timer</span>
        </div>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} className="sun-icon" /> : <Moon size={20} className="moon-icon" />}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Setup Screen */}
        {screen === "setup" && (
          <div className="setup-screen glass-panel">
            <div className="setup-header">
              <h2 className="setup-title">Select Workout Length</h2>
              <p className="setup-desc">
                Configure your 3x3 interval session. Each exercise is 50s work followed by 10s rest.
              </p>
            </div>

            {/* Duration Selector */}
            <div className="duration-grid">
              {[10, 20, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`duration-btn glass-panel ${duration === mins ? "active" : ""}`}
                >
                  <span className="duration-number">{mins}</span>
                  <span className="duration-label">Mins</span>
                </button>
              ))}
            </div>

            {/* Start Session Action */}
            <button
              onClick={handleStartSession}
              className="start-btn pulse-button"
            >
              <Play size={20} fill="white" />
              Start Session
            </button>
          </div>
        )}

        {/* Active Session Screen */}
        {screen === "active" && activePhase && (
          <div className="active-screen">
            {/* Phase info and headers */}
            <div className="active-header">
              <span className="meta-label">
                {activePhase.type === "work" ? "Active Workout" : activePhase.type === "cooldown" ? "Finishing Up" : "Breather"}
              </span>
              <h2 className="phase-label">
                {activePhase.type === "work"
                  ? "WORK"
                  : activePhase.type === "cooldown"
                    ? "COOLDOWN"
                    : "REST"}
              </h2>
            </div>

            {/* Ring Timer Display */}
            <div className="timer-container">
              <svg className="progress-ring" width="280" height="280">
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  stroke="var(--border-glass)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  className="progress-ring-circle"
                  cx="140"
                  cy="140"
                  r="120"
                  stroke="var(--accent)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={754}
                  strokeDashoffset={754 * (1 - secondsRemaining / activePhase.duration)}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0px 0px 6px var(--accent-glow))"
                  }}
                />
              </svg>

              <div className="timer-digits">
                <span className="digits-number">{secondsRemaining}</span>
                <span className="digits-label">seconds</span>
              </div>
            </div>

            {/* Round/Set Tracker Row */}
            {activePhase.type !== "cooldown" && (
              <div className="badge-row glass-panel">
                <span>Round {activePhase.round}/{activePhase.totalRounds}</span>
                <span className="dot">•</span>
                <span>Set {activePhase.set}/3</span>
                <span className="dot">•</span>
                <span>Ex {activePhase.exerciseIndex}/3</span>
              </div>
            )}

            {/* Active Exercise Detail Card */}
            <div className="exercise-card glass-panel">
              <div className="exercise-icon-container">
                <ExerciseIcon name={activePhase.icon} size={30} />
              </div>
              <div className="exercise-details">
                <h3 className="exercise-title">{activePhase.name}</h3>
                <p className="exercise-desc">{activePhase.desc}</p>
              </div>
            </div>

            {/* Up Next Footer */}
            {activePhase.upNext && (
              <div className="up-next-footer glass-panel">
                <span className="up-next-label">Up Next:</span>
                <div className="up-next-info">
                  <ExerciseIcon name={activePhase.upNext.icon} size={14} className="up-next-icon" />
                  <span className="up-next-name">{activePhase.upNext.name}</span>
                </div>
              </div>
            )}

            {/* Workout Controls */}
            <div className="controls-row">
              <button
                onClick={handlePauseToggle}
                className="glass-button pause-btn"
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} fill="currentColor" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    Resume
                  </>
                )}
              </button>

              <button
                onClick={handleExitSession}
                className="glass-button exit-btn"
              >
                Exit
              </button>
            </div>
          </div>
        )}

        {/* Completion Screen */}
        {screen === "complete" && (
          <div className="complete-screen glass-panel">
            <div className="success-badge shadow-glow">
              <CheckCircle2 size={56} />
            </div>

            <div className="complete-header">
              <h2 className="complete-title">Session Completed!</h2>
              <p className="complete-desc">
                Outstanding job! You've successfully finished your interval circuit session.
              </p>
            </div>

            {/* Summary Statistics */}
            <div className="stats-grid">
              <div className="stat-card glass-panel">
                <span className="stat-label">Total Duration</span>
                <span className="stat-value">{duration} Mins</span>
              </div>
              <div className="stat-card glass-panel">
                <span className="stat-label">Completed Sets</span>
                <span className="stat-value">
                  {duration === 10 ? "3 Sets" : duration === 20 ? "6 Sets" : "9 Sets"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setScreen("setup")}
              className="home-btn"
            >
              <Home size={16} />
              Return to Start
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
