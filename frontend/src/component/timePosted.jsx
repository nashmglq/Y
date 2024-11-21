import { useState } from "react";

const TimePosted = ({ time }) => {

    const [publishTime, setPublishTime] = useState("")



  return <small>{time}</small>;
};

export default TimePosted;
