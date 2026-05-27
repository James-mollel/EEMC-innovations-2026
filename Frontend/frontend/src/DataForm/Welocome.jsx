// import { useState, useEffect } from "react";
// import { Trophy, ArrowRight, Sparkles } from "lucide-react";

// export default function WelcomeModal() {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 antialiased font-sans">
 
//       <div 
//         className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-500 animate-fadeIn"
//         onClick={() => setIsOpen(false)} 
//       />


//       <div className="relative max-w-lg w-full bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_32px_64px_-12px_rgba(15,23,42,0.12)] overflow-hidden transform transition-all scale-100 animate-scaleUp">
        
  
//         <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

//         <div className="relative space-y-6 text-center">
          

//           {/* Heading Structure */}
//           <div className="space-y-3">
//             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
//               
//             </span>
//             <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
//               EEMC <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">UDOM</span>
//             </h1>
//             <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-500 uppercase">
//               Innovations & Business Ideas Competition 2026
//             </p>
//           </div>

//           {/* Premium Divider */}
//           <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
//             <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-slate-200" />
//             <Trophy className="w-5 h-5 text-amber-500 stroke-[1.5] flex-shrink-0" />
//             <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-slate-200" />
//           </div>

        
//           <div className="space-y-2 max-w-sm mx-auto">
//             <p className="text-sm text-slate-600 leading-relaxed font-medium">
//               Bring your best ideas to the stage! Please fill out this form carefully and take your first step toward victory.
//             </p>
//           </div>

//           <div className="pt-2">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="group w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.2)] active:scale-[0.98]"
//             >
//               Initialize Submission Pipeline
//               <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { Trophy, ArrowRight, Sparkles, X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Smooth intro trigger
    const timer = setTimeout(() => setIsOpen(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 antialiased font-sans selection:bg-emerald-500/20">
      
      {/* Premium Soft Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity duration-700 animate-in fade-in"
        onClick={() => setIsOpen(false)} 
      />

      {/* Main Modal Card (Premium Light Mode) */}
      <div className="relative max-w-md w-full bg-white/90 backdrop-blur-2xl rounded-[28px] border border-slate-200/60 p-6 sm:p-8 shadow-[0_8px_32px_-6px_rgba(15,23,42,0.04),0_24px_64px_-12px_rgba(15,23,42,0.08)] overflow-hidden transform transition-all duration-500 animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
        
        {/* Glow Effects (Silicon Valley Ambient Lighting - Soft Pastels) */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-emerald-400/12 rounded-full blur-[64px] pointer-events-none mix-blend-multiply" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-blue-400/12 rounded-full blur-[64px] pointer-events-none mix-blend-multiply" />
        
        {/* Crisp Top White-Light Reflection */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative space-y-6 text-center pt-2">
          
          {/* Tech Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
              Welcome to
            </span>
          </div>

          {/* Heading Structure */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              EEMC <span className="bg-gradient-to-b from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold">UDOM</span>
            </h1>
            <p className="text-xs font-semibold tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg py-1 px-2.5 inline-block">
              Innovations & Business Ideas Competition 2026
            </p>
          </div>

          {/* Elegant Tech Divider */}
           <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-100/50" />
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500/80 stroke-[1.5]" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-100/50" />
        </div>

          {/* Body Description */}
          <div className="space-y-2 max-w-sm mx-auto">
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Bring your best ideas to the stage. Complete your registration pipeline to secure your pitch window with the panel.
            </p>
          </div>

          {/* Action Button (Deep Premium Slate) */}
          <div className="pt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="group relative w-full py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_24px_-8px_rgba(15,23,42,0.3)] active:scale-[0.98]"
            >
              <span>Initialize Submission Pipeline</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}