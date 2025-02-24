import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion

const CountDown: React.FC = () => {
  const storedExamDate = localStorage.getItem("examDate");
  const storedCountdownStarted =
    localStorage.getItem("countdownStarted") === "true";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [examDate, setExamDate] = useState<string>(
    storedExamDate || "2025-05-25"
  );
  const [breakDate, setBreakDate] = useState<Date>(new Date(examDate));
  const [countdownStarted, setCountdownStarted] = useState<boolean>(
    storedCountdownStarted
  );

  useEffect(() => {
    if (countdownStarted && breakDate > new Date()) {
      const timer = setInterval(() => {
        const now = new Date();
        const difference = breakDate.getTime() - now.getTime();

        if (difference < 0) {
          clearInterval(timer);
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          return;
        }

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdownStarted, breakDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setExamDate(newDate);
    setBreakDate(new Date(newDate));
    localStorage.setItem("examDate", newDate);
  };

  const handleStartCountdown = () => {
    if (new Date(examDate) > new Date()) {
      setCountdownStarted(true);
      localStorage.setItem("countdownStarted", "true");
    } else {
      alert("Please choose a valid future exam date!");
    }
  };

  const handleReset = () => {
    setCountdownStarted(false);
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setExamDate("2025-05-25");
    setBreakDate(new Date("2025-05-25"));
    localStorage.removeItem("examDate");
    localStorage.removeItem("countdownStarted");
  };

  return (
    <div className="relative bg-yellow-200 rounded-xl shadow-lg p-6 mb-6 border-4 border-black outline outline-2 outline-black drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-10 rounded-xl blur-2xl -z-10"></div>

      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800 uppercase tracking-wide inline-block">
          🗓 Time Until Exams
        </h2>
      </div>

      {!countdownStarted && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700">
              Set Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={handleDateChange}
              className="mt-2 font-bold px-4 py-2 border-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500 border-black outline-2 outline-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            />
          </div>

          <button
            onClick={handleStartCountdown}
            className="w-full md:w-auto px-6 py-2 bg-white text-black rounded-lg
   border-4 border-black outline outline-1 outline-black drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] 
   hover:bg-purple-300 hover:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] 
   transition-all transform hover:scale-110 hover:opacity-90 active:scale-95
   flex items-center justify-center mb-6 font-bold tracking-wide"
          >
            🚀 Start Countdown
          </button>
        </>
      )}

      {countdownStarted && (
        <>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="flex flex-col items-center justify-center border-2 border-gray-800 bg-white rounded-lg p-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="text-2xl font-bold text-neon-green drop-shadow-glow">
                  {value}
                </div>
                <div className="text-gray-400 text-sm">{unit}</div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-lg
   border-4 border-black outline outline-1 outline-black drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] 
   hover:bg-red-700 hover:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] 
   transition-all transform hover:scale-110 hover:opacity-90 active:scale-95
   flex items-center justify-center mt-6 shadow-neon font-bold"
          >
            🔁 Reset Countdown
          </button>
        </>
      )}
    </div>
  );
};

export default CountDown;
