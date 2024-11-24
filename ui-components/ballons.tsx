"use client";

import React, { useState, useEffect } from "react";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomSpeed = () => {
  return Math.random() * 3 + 2; // Speed between 2s and 5s
};

const App = () => {
  const balloons = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    color: generateRandomColor(),
    speed: generateRandomSpeed(),
  }));

  return (
    <div className="App">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="balloon"
          style={{
            backgroundColor: balloon.color,
            animationDuration: `${balloon.speed}s`,
          }}
        />
      ))}
    </div>
  );
};

export default App;
