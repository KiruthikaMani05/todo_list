import React, { useEffect, useState } from "react";

function Greeting() {
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setTimeOfDay("Morning");
      setImageUrl("/img/holding-a-paper-cup.jpg");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay("Afternoon");
      setImageUrl("/img/holding-a-paper-cup.jpg");
    } else if (currentHour >= 18 && currentHour < 22) {
      setTimeOfDay("Evening");
      setImageUrl("/img/holding-a-paper-cup.jpg");
    } else {
      setTimeOfDay("Night");
      setImageUrl("/img/sleeping-dog.jpg");
    }
  }, []);

  return (
    <div className="text-animations">
      <div>
        {imageUrl && (
          <img className="greeting-img" src={imageUrl} alt={timeOfDay} />
        )}
      </div>
      <div class="waveTextAnimated">
        Good {timeOfDay}
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
}

export default Greeting;
