import { useState, useEffect } from "react";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0); // Current countdown time in seconds
  const [isActive, setIsActive] = useState<boolean>(false); // Check if timer is active
  const [isPaused, setIsPaused] = useState<boolean>(false); // Check if timer is paused
  const [initialTime, setInitialTime] = useState<number>(0); // Stores the original input value
  const [inputTime, setInputTime] = useState<string>(""); // User input for time in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && !isPaused) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    if (timeLeft === 0 && isActive) {
      setIsActive(false); // Stop the timer when it reaches 0
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isActive, isPaused]);

  const handleSetTime = () => {
    const totalTime = Number(inputTime); // User enters time directly in seconds
    if (!isNaN(totalTime) && totalTime > 0) {
      setTimeLeft(totalTime);
      setInitialTime(totalTime); // Store the initial time
      setIsActive(false); // Don't start the timer yet
      setIsPaused(false); // Reset paused state
    }
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
      setInputTime("");
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(0);
    setInputTime("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(e.target.value);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Countdown Timer
      </h2>
      <div className="flex mb-4 space-x-2">
        <input
          type="number"
          value={inputTime}
          onChange={handleInputChange}
          placeholder="Enter seconds"
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSetTime}
          className="px-4 py-2 bg-gradient-to-l from-green-400 to-indigo-500   text-black rounded hover:bg-blue-600 transition duration-300"
        >
          Set Time
        </button>
      </div>

      <div className="text-5xl font-bold text-gray-900 mb-6">
        {formatTime(timeLeft)}
      </div>

      <div className="space-x-4">
        <button
          onClick={handleStart}
          className={`px-4 py-2 bg-gradient-to-l from-green-400 to-indigo-500  text-black rounded   transition duration-300 ${
            isActive && !isPaused ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isActive && !isPaused}
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className={`px-4 py-2 bg-gradient-to-l from-green-400 to-indigo-500  text-black rounded   transition duration-300 ${
            !isActive || isPaused ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isActive || isPaused}
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gradient-to-l from-green-400 to-indigo-500  text-black rounded   transition duration-300"
        >
          Reset
        </button>
      </div>
      {timeLeft === 0 && !isActive && initialTime > 0 && (
        <p className="mt-4 text-lg font-medium text-red-500">Time&apos;s up!</p>
      )}
    </div>
  );
};

export default CountdownTimer;
