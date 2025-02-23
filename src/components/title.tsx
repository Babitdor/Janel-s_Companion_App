import React from "react";

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8 p-6">
      <img
        src="D:\Personal Projects\Janella's Companion App\Janel's App\project\src\components\img\Janel.png"
        alt="Janella"
        className="mx-auto mb-4 w-400 h-32 rounded-full" // Adjust the size and styling as needed
      />
      <h1
        className="text-6xl font-extrabold text-black bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-700 mb-2 
      bg-clip-text animate-pulse animate-bounce transition-all duration-300"
      >
        Janella’s MedAdventure: Your Path to Success! 👩🏻‍⚕️
      </h1>
    </div>
  );
};

export default Header;