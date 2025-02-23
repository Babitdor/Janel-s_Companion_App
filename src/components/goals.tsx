import React, { useState } from "react";
import { Plus, X, CheckSquare } from "react-feather"; // Assuming you're using react-feather for icons

interface Goal {
  id: string;
  topic: string;
  chapter: string;
  pages: string;
  completed: boolean;
}

const StudyGoals: React.FC = () => {
  const [studyGoals, setStudyGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({
    id: "",
    topic: "",
    chapter: "",
    pages: "",
    completed: false,
  });

  const addStudyGoal = () => {
    if (newGoal.topic && newGoal.chapter) {
      setStudyGoals([
        ...studyGoals,
        {
          id: Date.now().toString(),
          ...newGoal,
          completed: false,
        },
      ]);
      setNewGoal({ topic: "", chapter: "", pages: "" });
    }
  };

  const toggleGoalCompletion = (id: string) => {
    setStudyGoals(
      studyGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const removeGoal = (id: string) => {
    setStudyGoals(studyGoals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="bg-purple-300 rounded-xl shadow-lg p-6 mb-6 border-4 border-black outline outline-2 outline-black drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-extrabold text-black tracking-wide">
          📖 Study Goals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Topic"
          value={newGoal.topic}
          onChange={(e) => setNewGoal({ ...newGoal, topic: e.target.value })}
          className="px-4 py-2 border-4 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        />
        <input
          type="text"
          placeholder="Chapter"
          value={newGoal.chapter}
          onChange={(e) => setNewGoal({ ...newGoal, chapter: e.target.value })}
          className="px-4 py-2 border-4 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        />
        <input
          type="text"
          placeholder="Pages (optional)"
          value={newGoal.pages}
          onChange={(e) => setNewGoal({ ...newGoal, pages: e.target.value })}
          className="px-4 py-2 border-4 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        />
      </div>

      <button
        onClick={addStudyGoal}
        className="w-full md:w-auto px-6 py-2 bg-white text-black rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] 
               hover:bg-yellow-400 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center mb-6 font-bold tracking-wide"
      >
        <Plus className="mr-2" />
        Add Goal
      </button>

      <div className="space-y-4">
        {studyGoals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center justify-between p-4 rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] ${
              goal.completed ? "bg-green-400" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoalCompletion(goal.id)}
                className="h-5 w-5 text-blue-600 rounded-md border-black focus:ring-blue-500"
              />
              <div className="ml-4">
                <h3
                  className={`font-bold text-lg ${
                    goal.completed ? "line-through text-gray-700" : "text-black"
                  }`}
                >
                  {goal.topic}
                </h3>
                <p className="text-sm text-gray-800 font-medium">
                  Chapter: {goal.chapter}{" "}
                  {goal.pages && `• Pages: ${goal.pages}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeGoal(goal.id)}
              className="text-black hover:text-red-600 transition-all"
            >
              <X size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGoals;
