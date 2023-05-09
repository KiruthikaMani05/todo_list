import React, { useEffect, useState } from "react";

function Greeting() {
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setTimeOfDay("Morning");
      setImageUrl("/img/morning.jpg");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay("Afternoon");
      setImageUrl("/img/afternoon.jpg");
    } else if (currentHour >= 18 && currentHour < 22) {
      setTimeOfDay("Evening");
      setImageUrl("/img/evening.jpg");
    } else {
      setTimeOfDay("Night");
      setImageUrl("/img/night.jpg");
    }
  }, []);

  return (
    <div className="text-animations">
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={timeOfDay}
            style={{
              width: "23%",
              borderRadius: "100%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
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
