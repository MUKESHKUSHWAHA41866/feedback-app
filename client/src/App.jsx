

import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { MessageSquare, Users, Sparkles } from 'lucide-react';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleView = () => setShowForm(!showForm);

  // Handle background particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() * 360
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.02,
        hue: (p.hue + 0.5) % 360
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `hsl(${p.hue}, 70%, 60%)`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px hsl(${p.hue}, 70%, 60%)`,
            animation: 'pulse 2s infinite'
          }}
        />
      ))}

      {/* Interactive mouse glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mb-4 animate-bounce">
              {showForm ? (
                <MessageSquare className="w-8 h-8 text-white" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {showForm ? (
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  Submit Feedback
                </span>
              ) : (
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Feedback Received
                </span>
              )}
            </h1>
            <p className="text-white/70 text-md">
              {showForm
                ? "We value your thoughts — help us improve!"
                : "See what others are saying about us."}
            </p>

            {/* Toggle view button */}
            <button
              onClick={toggleView}
              className="mt-4 px-6 py-2 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
            >
              {showForm ? 'View Feedback' : 'Give Feedback'} <Sparkles className="inline w-4 h-4 ml-1 animate-pulse" />
            </button>
          </div>

          {/* Form or List View */}
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl transition-all duration-500">
            {showForm ? (
              <FeedbackForm
                onFeedbackSubmit={() => {
                  setRefresh(!refresh);
                  setShowForm(false);
                }}
              />
            ) : (
              <FeedbackList key={refresh} />
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
