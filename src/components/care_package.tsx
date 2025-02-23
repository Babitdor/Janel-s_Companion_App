// DigitalCarePackage.js

import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";
import { Laugh, Heart, Sparkles, Headphones } from "lucide-react"; // or any other icons library you're using
import { PlayList } from "../types";

const studyPlaylists = [
  {
    title: "Lofi Beats",
    url: "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM",
  },
  {
    title: "Classical Focus",
    url: "https://open.spotify.com/playlist/1h2rhuFAcXRTXwE0uVNQn8",
  },
  {
    title: "Nature Sounds",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX4PP3DA4J0N8",
  },
];

const memes = [
  {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80",
    caption: "When you finally memorize all the bones but forget your own name",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    caption: "Study break? More like mental breakdown",
  },
  {
    url: "https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=800&q=80",
    caption: "Me pretending to understand the lecture",
  },
];

const DigitalCarePackage = () => {
  const [activeTab, setActiveTab] = useState("laugh");
  const [playlist, setPlayList] = useState<PlayList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playListCollection = collection(db, "playlist");
      const playListSnapshot = await getDocs(playListCollection);
      const playList = playListSnapshot.docs.map(
        (doc) => doc.data() as PlayList
      );
      setPlayList(playList);
    };

    fetchPlaylist();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Digital Care Package
      </h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("laugh")}
          className={`flex items-center px-4 py-2 rounded-full transition-colors ${
            activeTab === "laugh"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Laugh className="mr-2 h-5 w-5" />
          Need a Laugh
        </button>
        <button
          onClick={() => setActiveTab("hug")}
          className={`flex items-center px-4 py-2 rounded-full transition-colors ${
            activeTab === "hug"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Heart className="mr-2 h-5 w-5" />
          Need a Hug
        </button>
        <button
          onClick={() => setActiveTab("boost")}
          className={`flex items-center px-4 py-2 rounded-full transition-colors ${
            activeTab === "boost"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Study Boost
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        {activeTab === "laugh" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map((meme, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={meme.url}
                  alt="Meme"
                  className="w-full h-48 object-cover"
                />
                <p className="p-4 text-gray-700 text-center">{meme.caption}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "hug" && (
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <video
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-4"
                controls
                poster="https://images.unsplash.com/photo-1516916759473-600c07bc12d4?auto=format&fit=crop&w=800&q=80"
              >
                <source src="YOUR_VIDEO_URL" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-gray-600 italic">
                "Remember why you started this journey. You're going to be an
                amazing doctor! ❤️"
              </p>
            </div>
          </div>
        )}

        {activeTab === "boost" && (
          <div>
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Headphones className="mr-2 text-purple-600" />
                  Study Playlists
                </h3>
                <div className="space-y-4">
                  {playlist.map((pl, index) => (
                    <a
                      key={index}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {pl.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Personal Message</h3>
                <blockquote className="italic text-gray-600 border-l-4 border-purple-600 pl-4">
                  "Your dedication to medicine is inspiring. Every hour of
                  study, every late night, every challenge you overcome is
                  bringing you closer to your dreams. You're not just studying
                  medicine; you're preparing to make a real difference in
                  people's lives. Keep pushing forward – you've got this! 💪"
                </blockquote>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalCarePackage;
