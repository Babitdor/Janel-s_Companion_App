import { useState, useEffect } from "react";
import { db, collection } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Laugh, Heart, Sparkles, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { PlayList } from "../types";

// const studyPlaylists = [
//   {
//     title: "Lofi Beats",
//     url: "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM",
//   },
//   {
//     title: "Classical Focus",
//     url: "https://open.spotify.com/playlist/1h2rhuFAcXRTXwE0uVNQn8",
//   },
//   {
//     title: "Nature Sounds",
//     url: "https://open.spotify.com/playlist/37i9dQZF1DX4PP3DA4J0N8",
//   },
// ];

const memes = [
  {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    caption: "When you finally memorize all the bones but forget your own name",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    caption: "Study break? More like mental breakdown",
  },
  {
    url: "https://images.unsplash.com/photo-1579165466991-467135ad3110",
    caption: "Me pretending to understand the lecture",
  },
];

const DigitalCarePackage = () => {
  const [activeTab, setActiveTab] = useState("laugh");
  const [playlist, setPlayList] = useState<PlayList[]>([]);

  useEffect(() => {
    // Reference to the "playlist" collection
    const playListCollection = collection(db, "playlist");

    // Set up a real-time listener
    const unsubscribe = onSnapshot(playListCollection, (snapshot: { docs: any[]; }) => {
      const updatedPlaylist = snapshot.docs.map(
        (doc) => doc.data() as PlayList
      );
      setPlayList(updatedPlaylist);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <motion.div
      className="bg-yellow-200 border-4 border-black rounded-lg shadow-xl p-8 text-white outline outline-1 outline-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl text-left mb-6 text-black neon-glow font-bold">
        📦 Digital Care Package
      </h2>

      <div className="flex justify-center space-x-4 mb-6">
        {[
          {
            label: "Need a Laugh",
            tab: "laugh",
            icon: <Laugh className="text-blue-500" />,
          },
          {
            label: "Need a Hug",
            tab: "hug",
            icon: <Heart className="text-red-500" />,
          },
          {
            label: "Study Boost",
            tab: "boost",
            icon: <Sparkles className="text-yellow-500" />,
          },
        ].map((item) => (
          <motion.button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all neon-glow ${
              activeTab === item.tab
                ? "bg-purple-300 text-black font-bold outline outline-1 outline-black drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                : "bg-white text-black font-bold outline outline-1 outline-black drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]"
            } text-sm sm:text-base md:text-lg lg:text-xl 
  px-4 sm:px-6 md:px-8 lg:px-10 w-full md:w-auto justify-center`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item.icon}
            <span className="hidden sm:block">{item.label}</span>
            {/* This hides the text on small screens */}
          </motion.button>
        ))}
      </div>

      <div className="bg-purple-300 rounded-lg p-6 shadow-lg neon-border">
        {/* Tab Content Animation */}
        <motion.div
          key={activeTab}
          className="tab-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "laugh" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memes.map((meme, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden neon-glow"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={meme.url}
                    alt="Meme"
                    className="w-full h-48 object-cover"
                  />
                  <p className="p-4 text-center text-black font-bold">
                    {meme.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "hug" && (
            <div className="text-center">
              <motion.div className="bg-white rounded-lg p-6 shadow-lg neon-glow">
                <video className="w-full rounded-lg shadow-lg mb-4" controls>
                  <source src="YOUR_VIDEO_URL" type="video/mp4" />
                </video>
                <p className="text-black italic font-bold">
                  You're doing great, keep pushing forward! ❤️
                </p>
              </motion.div>
            </div>
          )}

          {activeTab === "boost" && (
            <div className="grid gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg neon-glow">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <Headphones className="mr-2" /> Study Playlists
                </h3>
                <div className="space-y-4">
                  {playlist.map((pl, index) => (
                    <a
                      key={index}
                      href={pl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-white"
                    >
                      {pl.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg neon-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Personal Message
                </h3>
                <blockquote className="italic text-gray-300 border-l-4 border-[#00D4FF] pl-4">
                  "Every hour of study brings you closer to your dream. Keep
                  going! 💪"
                </blockquote>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DigitalCarePackage;
