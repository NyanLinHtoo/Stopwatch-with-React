import { useEffect, useState } from "react";

interface StopWatch {
  tick: number | null;
  totalSecond: number;
}

const StopWatch = () => {
  const [watch, setWatch] = useState<StopWatch>({ tick: null, totalSecond: 0 });

  useEffect(() => {
    // Clear the interval on unmount
    return () => {
      if (watch.tick !== null) {
        clearInterval(watch.tick);
      }
    };
  }, [watch.tick]);

  const increaseCount = () => {
    setWatch((prev) => ({ ...prev, totalSecond: prev.totalSecond + 1 }));
  };

  const getHours = () => {
    return Math.floor(watch.totalSecond / 60 / 60) % 60;
  };

  const getMinutes = () => {
    return Math.floor(watch.totalSecond / 60) % 60;
  };

  const getSeconds = () => {
    return watch.totalSecond % 60;
  };

  const startCounter = () => {
    if (watch.tick !== null) clearInterval(watch.tick);
    const newTick = setInterval(increaseCount, 1000);
    setWatch((prev) => ({
      ...prev,
      tick: newTick,
    }));
  };

  const stopCounter = () => {
    if (watch.tick !== null) clearInterval(watch.tick);
    setWatch((prev) => ({
      ...prev,
      tick: null,
    }));
  };

  const resumeCounter = () => {
    if (watch.tick !== null) clearInterval(watch.tick);
    const newTick = setInterval(increaseCount, 1000);
    setWatch((prev) => ({
      ...prev,
      tick: newTick,
    }));
  };

  const resetCounter = () => {
    if (watch.tick !== null) clearInterval(watch.tick);
    setWatch({
      totalSecond: 0,
      tick: null,
    });
  };

  const leadingZero = (num: number) => {
    return num < 10 ? "0" + num : num;
  };

  const renderButtons = () => {
    const started =
      getHours() === 0 && getMinutes() === 0 && getSeconds() === 0;
    return (
      <>
        {watch.tick === null && started && (
          <button
            onClick={startCounter}
            type="button"
            className="text-black bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 ">
            Start
          </button>
        )}
        {watch.tick !== null && (
          <button
            onClick={stopCounter}
            type="button"
            className="text-black bg-rose-700 hover:bg-rose-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 ">
            Stop
          </button>
        )}
        {!started && watch.tick === null && (
          <button
            onClick={resumeCounter}
            type="button"
            className="text-black bg-blue-300 hover:bg-blue-400 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 ">
            Resume
          </button>
        )}
        {(!started || watch.tick !== null) && (
          <button
            onClick={resetCounter}
            type="button"
            className="text-black bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 ">
            Reset
          </button>
        )}
      </>
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-40 text-center ">
      <div className="bg-inherit text-white pb-5">
        <span className="text-white text-9xl">{leadingZero(getHours())}:</span>
        <span className="text-white text-9xl">
          {leadingZero(getMinutes())}:
        </span>
        <span className="text-white text-9xl">{leadingZero(getSeconds())}</span>
      </div>
      {renderButtons()}
    </div>
  );
};

export default StopWatch;
