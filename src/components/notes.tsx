import React, { useState, useEffect } from "react";
import { FileText, Plus, X } from "react-feather";
import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  title: string;
  content: string;
  scribble?: string; // Base64-encoded image of scribble
  lastModified: Date;
}

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      return JSON.parse(savedNotes).map((note: Note) => ({
        ...note,
        lastModified: new Date(note.lastModified),
      }));
    }
    return [];
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  const addNewNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: `New Note ${notes.length + 1}`,
      content: "",
      scribble: "",
      lastModified: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, ...updates, lastModified: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setNotes(notes.filter((note) => note.id !== id));
    setActiveNoteId(notes.length > 1 ? notes[0]?.id : null);
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="relative bg-purple-300 rounded-xl shadow-lg p-6 mb-6 border-4 border-black outline outline-1 outline-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="text-black-600 mr-2" />
          <h2 className="text-2xl font-extrabold text-black">
            Notes ({notes.length})
          </h2>
        </div>
        <button
          onClick={addNewNote}
          className="bg-purple-500 text-white font-bold px-4 py-2 rounded-lg border-4 border-black hover:bg-purple-600 flex items-center"
        >
          <Plus className="mr-2" />
          New
        </button>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <div className="flex space-x-2 overflow-x-auto">
          {notes.map((note) => (
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
              updateNote(activeNoteId!, { title: e.target.value })
            }
            className="w-full px-4 py-2 text-lg font-bold border-b border-gray-200 focus:outline-none border-4 border-black rounded-lg"
            placeholder="Note Title"
          />

          {/* Text Editor */}

          <textarea
            value={activeNote.content}
            onChange={(e) =>
              updateNote(activeNoteId!, { content: e.target.value })
            }
            className="w-full h-64 px-4 py-2 border border-gray-200 rounded-lg border-4 border-black"
            placeholder="Start typing your notes here..."
          />
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
