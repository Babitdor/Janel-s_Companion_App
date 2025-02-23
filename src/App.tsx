import React, { useState, useEffect } from "react";
import NotesApp from "./components/notes";
import StudyGoals from "./components/goals";
import {
  Heart,
  PlayCircle,
  PauseCircle,
  RefreshCcw,
  Coffee,
} from "lucide-react";
// import Header from "./components/title";
import CountDown from "./components/countdown";

function App() {
  const [studyTimer, setStudyTimer] = useState(25 * 60);
  const [timerDuration, setTimerDuration] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const [restTimer, setRestTimer] = useState(5 * 60);
  const [restDuration, setRestDuration] = useState(5);
  const [isRestTime, setIsRestTime] = useState(false);
  const [showBabitPopup, setShowBabitPopup] = useState(false);

  const encouragingMessages = [
    "You're doing amazing! Keep going! 🌟",
    "Future doctor in the making! 👩‍⚕️",
    "Your dedication is inspiring! 💪",
    "Every study session brings you closer to your dreams! 🎓",
    "You've got this! Take a deep breath! 🌈",
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && studyTimer > 0) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev - 1);
      }, 1000);
    } else if (studyTimer === 0 && !isRestTime) {
      setIsTimerRunning(false);
      setIsRestTime(true);
      setShowBabitPopup(true);
      setRestTimer(restDuration * 60);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, studyTimer, isRestTime, restDuration]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRestTime && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && isRestTime) {
      setIsRestTime(false);
      setShowBabitPopup(false);
      setStudyTimer(timerDuration * 60);
    }
    return () => clearInterval(interval);
  }, [isRestTime, restTimer, timerDuration]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomMessage =
        encouragingMessages[
          Math.floor(Math.random() * encouragingMessages.length)
        ];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }, 300000);

    return () => clearInterval(messageInterval);
  }, []);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setStudyTimer(timerDuration * 60);
    setIsTimerRunning(false);
    setRestTimer(restDuration * 60);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = Math.max(1, parseInt(e.target.value) || 1);
    setTimerDuration(newDuration);
    setStudyTimer(newDuration * 60);
    setIsTimerRunning(false);
  };

  const handleRestDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = Math.max(1, parseInt(e.target.value) || 1);
    setRestDuration(newDuration);
    if (isRestTime) {
      setRestTimer(newDuration * 60);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-yellow-200">
      {showBabitPopup && (
        <div className="fixed inset-0 bg-purple-500 bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-center p-10 max-w-3xl rounded-lg shadow-lg border-4 border-yellow-400 bg-purple-400 bg-opacity-90">
            <Coffee className="w-28 h-28 text-white mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl font-extrabold text-yellow-200 mb-4 tracking-wide">
              Time to Take a Break, Coffee Time! :3
            </h2>
            <p className="text-2xl text-yellow-50 mb-8 font-semibold">
              Take a break and let him recharge your energy!
            </p>
            <div className="text-7xl font-extrabold text-yellow-300 mb-6 animate-pulse">
              {formatTime(restTimer)}
            </div>
            <p className="text-lg text-yellow-100 opacity-90">
              Your study session will resume after the break
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* <Header /> */}
        <CountDown />
        <StudyGoals />
        <div className="bg-yellow-200 rounded-xl shadow-lg p-6 mb-6 border-4 border-black outline outline-2 outline-black drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-extrabold text-black tracking-wide">
              {isRestTime ? "⏸️ Rest Timer" : "⏳ Study Timer"}
            </h2>
          </div>

          <div className="text-center">
            {/* Conditionally render the duration inputs */}
            {!isTimerRunning && !isRestTime && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Study Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    min="1"
                    value={timerDuration}
                    onChange={handleDurationChange}
                    className="w-32 px-4 py-3 border-4 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    disabled={isTimerRunning || isRestTime}
                  />
                </div>
                <div>
                  <label
                    htmlFor="restDuration"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Rest Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="restDuration"
                    min="1"
                    value={restDuration}
                    onChange={handleRestDurationChange}
                    className="w-32 px-4 py-3 border-4 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    disabled={isTimerRunning || isRestTime}
                  />
                </div>
              </div>
            )}

            <div className="text-6xl font-extrabold text-purple-500 mb-4">
              {isRestTime ? formatTime(restTimer) : formatTime(studyTimer)}
            </div>

            <div className="flex justify-center gap-6">
              {!isRestTime && (
                <>
                  <button
                    onClick={toggleTimer}
                    className="bg-purple-500 text-white font-bold px-8 tracking-wide py-3 rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-purple-500 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-105 active:scale-95 flex items-center"
                  >
                    {isTimerRunning ? (
                      <PauseCircle className="mr-3" />
                    ) : (
                      <PlayCircle className="mr-3" />
                    )}
                    {isTimerRunning ? "Pause" : "Start"}
                  </button>

                  {/* Reset button will be visible only if the timer is not running */}
                  {isTimerRunning && studyTimer > 0 && (
                    <button
                      onClick={resetTimer}
                      className="bg-gray-200 text-gray-700 font-bold tracking-wide px-8 py-3 rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-300 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all flex items-center"
                    >
                      <RefreshCcw className="mr-3" />
                      Reset
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <NotesApp />
        {/* <DigitalCarePackage /> */}

        {showMessage && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in-up">
            <div className="flex items-center">
              <Heart className="text-red-500 mr-2" />
              <p className="text-gray-800">{currentMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
