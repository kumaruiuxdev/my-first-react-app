import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

/**
 * Main App component rendering a minimal, dark-mode Todo List.
 * Supports adding, toggling completion, deleting tasks, and displaying a live counter.
 */
export default function App() {
  // Initial sample tasks so the UI feels alive immediately
  const [todos, setTodos] = useState([
    { id: 1, text: 'Design clean dark-mode interface', completed: true },
    { id: 2, text: 'Build minimal React state logic', completed: false },
    { id: 3, text: 'Ship portfolio project', completed: false },
  ]);
  const [input, setInput] = useState('');

  // Add a new task if input is non-empty
  const addTodo = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      { id: Date.now(), text: trimmed, completed: false },
      ...prev,
    ]);
    setInput('');
  };

  // Toggle completed status for a specific task ID
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Remove a task from the list by ID
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Calculate remaining active tasks
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-indigo-500/30">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
        {/* Header & Subtle Task Counter */}
        <header className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Tasks
          </h1>
          <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
            {remainingCount} {remainingCount === 1 ? 'left' : 'left'} · {todos.length} total
          </span>
        </header>

        {/* Add Task Input Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            aria-label="New task description"
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Add task"
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* Task List */}
        {todos.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-8">
            All caught up. Add a task above to get started.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center justify-between gap-3 bg-slate-950/50 hover:bg-slate-800/50 border border-slate-800/60 rounded-xl px-3.5 py-3 transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(todo.id)}
                  className="flex items-center gap-3 flex-1 text-left cursor-pointer focus:outline-none"
                >
                  {/* Custom Minimal Checkbox */}
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                      todo.completed
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-slate-600 group-hover:border-indigo-400'
                    }`}
                  >
                    {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>

                  {/* Task Text */}
                  <span
                    className={`text-sm transition-all break-words ${
                      todo.completed
                        ? 'line-through text-slate-500'
                        : 'text-slate-200'
                    }`}
                  >
                    {todo.text}
                  </span>
                </button>

                {/* Delete Task Button */}
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete "${todo.text}"`}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}