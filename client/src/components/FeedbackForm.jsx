// import { useState } from 'react';

// export default function FeedbackForm({ onFeedbackSubmit }) {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [success, setSuccess] = useState('');
//   const url = import.meta.env.VITE_BACKEND_URL;

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     // const res = await fetch('http://localhost:5000/api/feedback', {
//     const res = await fetch(`${url}/api/feedback`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form)
//     });
//     if (res.ok) {
//       setForm({ name: '', email: '', message: '' });
//       setSuccess('Feedback submitted successfully!');
//       onFeedbackSubmit();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">

//       <input name="name" 
//       placeholder="Name" 
//       required 
//       className="w-full border p-2" 
//       value={form.name} onChange={handleChange} />

//       <input name="email" type="email" 
//       placeholder="Email"
//       required className="w-full border p-2" 
//       value={form.email} onChange={handleChange} />

//       <textarea name="message" 
//       placeholder="Your feedback" 
//       required 
//       className="w-full border p-2" 
//       value={form.message} 
//       onChange={handleChange} />

//       <div className="flex justify-center">
//   <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
//     Submit
//   </button>
// </div>
//       {success && <p className="text-green-600">{success}</p>}
//     </form>
//   );
// }




import { useState, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, Sparkles, CheckCircle, Heart } from 'lucide-react';

export default function FeedbackForm({ onFeedbackSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState('');
  const [focused, setFocused] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const url = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:5000';

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed * 0.1) % 100,
        x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.05
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Track mouse movement for glow effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
    
//     try {
//       const res = await fetch(`${url}/api/feedback`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form)
//       });
      
//       if (res.ok) {
//         setForm({ name: '', email: '', message: '' });
//         setSuccess('Feedback submitted successfully!');
//         if (onFeedbackSubmit) onFeedbackSubmit();
        
//         // Auto-hide success message after 5 seconds
//         setTimeout(() => setSuccess(''), 5000);
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
    
//     setIsSubmitting(false);
//   };


const handleSubmit = async () => {
  // Basic client-side validation
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    setSuccess('Please fill in all fields before submitting.');
    setTimeout(() => setSuccess(''), 4000); // auto-clear message
    return;
  }

  setIsSubmitting(true);
  try {
    const res = await fetch(`${url}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ name: '', email: '', message: '' });
      setSuccess('Feedback submitted successfully!');
      if (onFeedbackSubmit) onFeedbackSubmit();

      setTimeout(() => setSuccess(''), 5000);
    } else {
      setSuccess('Failed to submit feedback. Try again later.');
      setTimeout(() => setSuccess(''), 5000);
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    setSuccess('An error occurred. Please try again.');
    setTimeout(() => setSuccess(''), 5000);
  }

  setIsSubmitting(false);
};

 



  const getFieldIcon = (field) => {
    switch (field) {
      case 'name': return <User className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'message': return <MessageSquare className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white pointer-events-none animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
      
      {/* Main form container */}
      <div 
        className="relative w-full max-w-md"
        onMouseMove={handleMouseMove}
      >
        {/* Mouse glow effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
          }}
        />
        
        {/* Form card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Header glow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          
          {/* Form header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mb-4 animate-bounce">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
              Share Your Thoughts
            </h2>
            <p className="text-white/70 text-sm">
              We'd love to hear from you ✨
            </p>
          </div>

          <div className="space-y-6">
            {/* Name field */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 ${focused === 'name' ? 'opacity-20' : ''}`} />
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 transition-colors group-hover:text-white/70">
                  {getFieldIcon('name')}
                </div>
                <input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                />
              </div>
            </div>

            {/* Email field */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 ${focused === 'email' ? 'opacity-20' : ''}`} />
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 transition-colors group-hover:text-white/70">
                  {getFieldIcon('email')}
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                />
              </div>
            </div>

            {/* Message field */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 ${focused === 'message' ? 'opacity-20' : ''}`} />
              <div className="relative">
                <div className="absolute left-4 top-6 text-white/50 transition-colors group-hover:text-white/70">
                  {getFieldIcon('message')}
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  required
                  rows="4"
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-violet-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Feedback</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Success message */}
          {success && (
            <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl animate-pulse">
              <div className="flex items-center space-x-2 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{success}</span>
              </div>
            </div>
          )}

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-60 animate-bounce delay-500" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-60 animate-bounce delay-1000" />
      </div>
    </div>
  );
}
