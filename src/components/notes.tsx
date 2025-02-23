import React, { useState, useEffect } from "react";
import { FileText, Plus, X, Download } from "react-feather";
import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
}

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      // Convert string dates back to Date objects
      return parsed.map((note: Note) => ({
        ...note,
        lastModified: new Date(note.lastModified),
      }));
    }
    return [];
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Persist notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Auto-select first note if none selected
  useEffect(() => {
    if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  const getUniqueTitle = () => {
    let count = 1;
    while (notes.some((note) => note.title === `New Note ${count}`)) {
      count++;
    }
    return `New Note ${count}`;
  };

  const addNewNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: getUniqueTitle(),
      content: "",
      lastModified: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setIsAddingNote(false);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...updates,
            lastModified: new Date(),
          };
        }
        return note;
      })
    );
  };

  const deleteNote = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setNotes(notes.filter((note) => note.id !== id));
    setActiveNoteId((prev) => (prev === id ? notes[0]?.id || null : prev));
  };

  const exportNote = (note: Note) => {
    const blob = new Blob([`${note.title}\n\n${note.content}`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note.title.replace(/[^a-z0-9]/gi, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sortedNotes = [...notes].sort(
    (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
  );

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="relative bg-purple-300 rounded-xl shadow-lg p-6 mb-6 border-4 border-black outline outline-2 outline-black drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="text-black-600 mr-2" />
          <h2 className="text-2xl font-extrabold text-black tracking-wide">
            Notes ({notes.length})
          </h2>
        </div>
        <button
          onClick={addNewNote}
          className="bg-purple-500 text-white font-bold px-3 tracking-wide py-3 rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-purple-500 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-105 active:scale-95 flex items-center"
        >
          <Plus className="mr-2" />
          New
        </button>
      </div>

      <div className="mb-4 border-b border-gray-200 ">
        <div className="flex space-x-2 overflow-x-auto">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center px-4 py-2 cursor-pointer min-w-max ${
                activeNoteId === note.id
                  ? "border-b-2 border-purple-600 text-purple-600 bg-purple-100"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveNoteId(note.id)}
            >
              <span className="truncate max-w-xs">{note.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeNote ? (
        <div className="space-y-4">
          <input
            type="text"
            value={activeNote.title}
            onChange={(e) =>
              updateNote(activeNoteId, { title: e.target.value })
            }
            className="w-full px-4 py-2 text-lg font-bold border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 border-4 border-black rounded-lg"
            placeholder="Note Title"
            autoFocus
          />
          <textarea
            value={activeNote.content}
            onChange={(e) =>
              updateNote(activeNoteId, { content: e.target.value })
            }
            className="w-full h-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-4 border-black rounded-lg"
            placeholder="Start typing your notes here..."
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => exportNote(activeNote)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
            >
              <Download className="mr-2" />
              Download
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600">
          {notes.length === 0
            ? "No notes yet. Click 'New' to create one!"
            : "Select a note to view"}
        </div>
      )}
    </div>
  );
};

export default NotesApp;
