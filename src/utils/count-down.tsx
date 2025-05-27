import { useEffect, useState } from "react";
import customDayjs from "./day-js";

function Countdown30minute({ createdAt }: { createdAt: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endTime = customDayjs(createdAt).add(30, "minutes");

    const interval = setInterval(() => {
      const now = customDayjs();
      const diff = endTime.diff(now);

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
      } else {
        const dur = customDayjs.duration(diff);
        const hours = String(dur.hours()).padStart(2, "0");
        const minutes = String(dur.minutes()).padStart(2, "0");
        const seconds = String(dur.seconds()).padStart(2, "0");
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  if (timeLeft === "00:00:00") {
    return null;
  }

  return (
    <>
      <div className="!w-[4px] !h-[4px] bg-black rounded-full bg-opacity-70" />
      <div className="text-[12px] leading-[16px]">{timeLeft}</div>
    </>
  );
}

function Countdown3hour({ expire }: { expire: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endTime = customDayjs(expire);

    const interval = setInterval(() => {
      const now = customDayjs();
      const diff = endTime.diff(now);

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
      } else {
        const dur = customDayjs.duration(diff);
        const hours = String(dur.hours()).padStart(2, "0");
        const minutes = String(dur.minutes()).padStart(2, "0");
        const seconds = String(dur.seconds()).padStart(2, "0");
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expire]);

  if (timeLeft === "00:00:00") {
    return null;
  }

  return (
    <>
      <div className="!w-[4px] !h-[4px] bg-black rounded-full bg-opacity-70" />
      <div className="text-[12px] leading-[16px]">{timeLeft}</div>
    </>
  );
}

export { Countdown30minute, Countdown3hour };
