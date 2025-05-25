// import { useEffect, useState } from 'react';

// export default function FeedbackList() {
//   const [feedback, setFeedback] = useState([]);

//   const fetchFeedback = async () => {
//     const res = await fetch('http://localhost:5000/api/feedback');
//     const data = await res.json();
//     console.log(data);
    
//     setFeedback(data);
//   };

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   return (
//     <div className="mt-6 space-y-2">
//       {feedback.map(f => (
//         <div key={f._id} className="border p-4 rounded bg-gray-50">
//           <p className="font-bold text-gray-700">Name: {f.name} Email: ({f.email})</p>
//           <p className='text-gray-600 break-words'>{f.message}</p>
//           <p className="text-sm text-gray-400">{new Date(f.createdAt).toLocaleString()}</p>
//         </div>
//       ))}
//     </div>
//   );
// }




// import { useEffect, useState } from 'react';

// export default function FeedbackList() {
//   const [feedback, setFeedback] = useState([]);
//   const url = import.meta.env.VITE_BACKEND_URL;

//   const fetchFeedback = async () => {
//     const res = await fetch(`${url}/api/feedback`);
//     const data = await res.json();
//     setFeedback(data);
//   };

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   return (
//     <div className="mt-6 space-y-4">
//       {feedback.map(f => (
//         <div
//           key={f._id}
//           className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold text-gray-800 truncate max-w-[80%]">
//               {f.name}
//             </h2>
//             <span className="text-sm text-gray-400">
//               {new Date(f.createdAt).toLocaleString()}
//             </span>
//           </div>
//           <p className="text-sm text-blue-700 italic mb-1 break-words">{f.email}</p>
//           <p className="text-gray-700 whitespace-pre-line break-words">{f.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// }



import { useEffect, useState } from 'react';

export default function FeedbackList() {
  const [feedback, setFeedback] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchFeedback = async () => {
    const res = await fetch(`${url}/api/feedback`);
    const data = await res.json();
    setFeedback(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="mt-6 space-y-6">
      {feedback.length === 0 ? (
        <p className="text-center text-white/70">No feedback submitted yet.</p>
      ) : (
        feedback.map((f) => (
          <div
            key={f._id}
            className="relative p-6 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
          >
            {/* Gradient border shimmer */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 via-violet-500 to-indigo-500 rounded-3xl blur opacity-20 animate-pulse pointer-events-none z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-white truncate max-w-[70%]">
                  {f.name}
                </h2>
                <span className="text-sm text-white/50">
                  {new Date(f.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-cyan-200 mb-2 break-words italic">{f.email}</p>
              <p className="text-white/90 whitespace-pre-line break-words leading-relaxed">
                {f.message}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
