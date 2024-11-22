import { useState } from "react";

const TimePosted = ({ time }) => {
  // use this new Date() to access days or moths
  // ex of return: Thu Nov 21 2024 01:58:34 GMT+0800 (Philippine Standard Time)
  // actual value 2024-11-20T17:58:34.000Z
  const posted = new Date(time);
  // conver to string (padStart needs that), then it will ensure 2 char each if not 2 char it will append 0
  const minutes = posted.getMinutes().toString().padStart(2,0); 
  const hours = posted.getHours();
  const days = posted.getDate().toString().padStart(2,0); // get Date not get Day, day will return (monday = 1)
  const months = posted.toLocaleString("en-US", { month: "short" });
  const year = posted.getFullYear();

  console.log(posted)


  return <small>{months} {days}, {year} · {hours}:{minutes} </small>;
};

export default TimePosted;
