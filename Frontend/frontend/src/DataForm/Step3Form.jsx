// import { useState } from 'react';
// import api from '../Api/api';
// import toast from 'react-hot-toast';
// import { 
//   ArrowRight, 
//   Loader2, 
//   AlertCircle,
//   Sparkles,
//   HelpCircle,
//   Flame,
//   Target,
//   Compass,
//   Rocket
// } from "lucide-react";

// export default function IdeaFormStepThreePage({ onNext, id }) {
//   const [title, setTitle] = useState("");
//   const [problem, setProblem] = useState("");
//   const [solution, setSolution] = useState("");
//   const [targetUser, setTargetUser] = useState("");
//   const [uniqueness, setUniqueness] = useState("");
//   const [implementation, setImplementation] = useState("");
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let currentErrors = {};
    
//     if (title.trim().length < 5) {
//       currentErrors.title = "Please enter a descriptive project title.";
//     }

//     if (problem.trim().length < 15) {
//       currentErrors.problem = "Please expand your problem statement (minimum 15 characters).";
//     }

//     if (solution.trim().length < 15) {
//       currentErrors.solution = "Please describe your solution clearly (minimum 15 characters).";
//     }

//     if (targetUser.trim().length < 5) {
//       currentErrors.targetUser = "Please specify who will use or benefit from this project.";
//     }

//     if (uniqueness.trim().length < 10) {
//       currentErrors.uniqueness = "Please outline what makes your project approach distinct.";
//     }

//     if (implementation.trim().length < 15) {
//       currentErrors.implementation = "Please summarize your initial execution steps.";
//     }

//     setErrors(currentErrors);
//     return Object.keys(currentErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validate()) {
//       toast.error("Please fill in all required project insights.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("title_of_idea", title);
//       formData.append("problem_statement", problem);
//       formData.append("solution_description", solution);
//       formData.append("target_users", targetUser);
//       formData.append("uniqueness_of_the_idea", uniqueness);
//       formData.append("implementation_plan", implementation);

//       // FIXED: Changed from .post to .patch for instance updates
//       await api.patch(`update/idea/${id}/`, formData);
      
//       toast.success("🎉 Project pitch saved successfully!");
//       onNext();
      
//     } catch (error) {
//       if (error.response) {
//         const data = error.response.data;
//         if (data.detail) {
//           toast.error(data.detail);
//         } else if (typeof data === "object") {
//           Object.entries(data).forEach(([key, value]) => {
//             const message = Array.isArray(value) ? value.join(", ") : value;
//             toast.error(`${message}`);
//           });
//         } else {
//           toast.error("An unexpected error occurred. Please try again.");
//         }
//       } else {
//         toast.error("Network connection error. Please verify your connection.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reusable Tailwind style architectures
//   const labelClass = "text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
//   const iconWrapperClass = "absolute top-3.5 left-3.5 flex items-center pointer-events-none text-slate-400 transition-colors duration-200";
//   const inputBaseClass = "w-full py-3 pr-4 border rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-slate-400 text-slate-800";
//   const errorTextClass = "text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1.5 animate-fadeIn";

//   return (
//     <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      
//       {/* Step Header */}
//       <div className="mb-8">
//         <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md">Step 3 of 3</span>
//         <h2 className="text-xl font-bold text-slate-900 mt-3 tracking-tight">Project Canvas & Architecture</h2>
//         <p className="text-slate-500 text-sm mt-1">Deep dive into the problem statement, product vision, and execution strategy.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
        
//         {/* TITLE OF IDEA */}
//         <div className="space-y-1">
//           <label className={labelClass}>
//             Title of Idea <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative group">
//             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200">
//               <Sparkles className="w-[18px] h-[18px]" />
//             </div>
//             <input
//               type="text"
//               placeholder="e.g., Next-Gen Core Network voice scam firewall"
//               value={title}
//               onChange={(e) => {
//                 setTitle(e.target.value);
//                 if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
//               }}
//               className={`${inputBaseClass} pl-11 ${
//                 errors.title 
//                   ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
//                   : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
//               }`}
//             />
//           </div>
//           {errors.title && (
//             <p className={errorTextClass}>
//               <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
//             </p>
//           )}
//         </div>

//         {/* PROBLEM STATEMENT */}
//         <div className="space-y-1">
//           <label className={labelClass}>
//             Problem Statement <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative group">
//             <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
//               <Flame className="w-[18px] h-[18px]" />
//             </div>
//             <textarea
//               rows="3"
//               placeholder="What systemic challenge or market pain-point are you solving? Be specific."
//               value={problem}
//               onChange={(e) => {
//                 setProblem(e.target.value);
//                 if (errors.problem) setErrors((prev) => ({ ...prev, problem: undefined }));
//               }}
//               className={`${inputBaseClass} pl-11 resize-none ${
//                 errors.problem 
//                   ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
//                   : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
//               }`}
//             ></textarea>
//           </div>
//           {errors.problem && (
//             <p className={errorTextClass}>
//               <AlertCircle className="w-3.5 h-3.5" /> {errors.problem}
//             </p>
//           )}
//         </div>

//         {/* SOLUTION DESCRIPTION */}
//         <div className="space-y-1">
//           <label className={labelClass}>
//             Solution Description <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative group">
//             <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
//               <HelpCircle className="w-[18px] h-[18px]" />
//             </div>
//             <textarea
//               rows="3"
//               placeholder="How exactly does your product fix this problem? Outline the technical solution strategy."
//               value={solution}
//               onChange={(e) => {
//                 setSolution(e.target.value);
//                 if (errors.solution) setErrors((prev) => ({ ...prev, solution: undefined }));
//               }}
//               className={`${inputBaseClass} pl-11 resize-none ${
//                 errors.solution 
//                   ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
//                   : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
//               }`}
//             ></textarea>
//           </div>
//           {errors.solution && (
//             <p className={errorTextClass}>
//               <AlertCircle className="w-3.5 h-3.5" /> {errors.solution}
//             </p>
//           )}
//         </div>

//         {/* TARGET USERS */}
//         <div className="space-y-1">
//           <label className={labelClass}>
//             Target Users <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative group">
//             <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
//               <Target className="w-[18px] h-[18px]" />
//             </div>
//             <textarea 
//               rows="2"
//               placeholder="Who are your early adopters? (e.g., local small scale retailers, telecom users, students)"
//               value={targetUser}
//               onChange={(e) => {
//                 setTargetUser(e.target.value);
//                 if (errors.targetUser) setErrors((prev) => ({ ...prev, targetUser: undefined }));
//               }}
//               className={`${inputBaseClass} pl-11 resize-none ${
//                 errors.targetUser
//                   ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
//                   : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
//               }`}
//             ></textarea>
//           </div>
//           {errors.targetUser && ( 
//             <p className={errorTextClass}>
//               <AlertCircle className="w-3.5 h-3.5" /> {errors.targetUser}
//             </p>
//           )}
//         </div>

//         {/* UNIQUENESS */}
//         <div className="space-y-1">
//           <label className={labelClass}>
//             Uniqueness of the Idea <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative group">
//             <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
//               <Compass className="w-[18px] h-[18px]" />
//             </div>
//             <textarea  
//               rows="2"
//               placeholder="What separates you from current legacy competitors? What is your secret sauce?"
//               value={uniqueness}
//               onChange={(e) => {
//                 setUniqueness(e.target.value);
//                 if (errors.uniqueness) setErrors((prev) => ({ ...prev, uniqueness: undefined }));
//               }}
//               className={`${inputBaseClass} pl-11 resize-none ${
//                 errors.uniqueness 
//                   ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
//                   : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
//               }`}
//             ></textarea>
//           </div>
//           {errors.uniqueness && (
//             <p className={errorTextClass}>
//               <AlertCircle className="w-3.5 h-3.5" /> {errors.uniqueness}
//             </p>
//           )}
//         </div>

//         {/* IMPLEMENTATION PLAN */}
//         <div className="space-y-1">
//           <label className={labelClass}>
//             Implementation Plan <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative group">
//             <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
//               <Rocket className="w-[18px] h-[18px]" /> 
//             </div>
//             <textarea  
//               rows="3"
//               placeholder="Outline your immediate steps (e.g., prototype build within 1 month, field testing in month 2)."
//               value={implementation}
//               onChange={(e) => {
//                 setImplementation(e.target.value);
//                 if (errors.implementation) setErrors((prev) => ({ ...prev, implementation: undefined }));
//               }}
//               className={`${inputBaseClass} pl-11 resize-none ${
//                 errors.implementation 
//                   ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
//                   : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
//               }`}
//             ></textarea>
//           </div>
//           {errors.implementation && (
//             <p className={errorTextClass}>
//               <AlertCircle className="w-3.5 h-3.5" /> {errors.implementation}
//             </p>
//           )}
//         </div>

//         {/* ACTION SUBMIT BUTTON */}
//         <div className="pt-4 mt-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm backdrop-blur-sm ${
//               loading
//                 ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
//                 : "bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.2)]"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                  Next Step
//                 <ArrowRight className="w-4 h-4" />
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




import { useState } from 'react';
import api from '../Api/api';
import toast from 'react-hot-toast';
import { 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  Sparkles,
  HelpCircle,
  Flame,
  Target,
  Compass,
  Rocket
} from "lucide-react";

// 1. FIXED: Tumeibadili 'id' kuwa 'ideaId' ili ifanane na prop inayotoka kwenye Main Render Page
export default function IdeaFormStepThreePage({ onNext, ideaId, typeOfIdea }) {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [uniqueness, setUniqueness] = useState("");
  const [implementation, setImplementation] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let currentErrors = {};
    
    if (title.trim().length < 5) {
      currentErrors.title = "Please enter a descriptive project title.";
    }

    if (problem.trim().length < 15) {
      currentErrors.problem = "Please expand your problem statement (minimum 15 characters).";
    }

    if (solution.trim().length < 15) {
      currentErrors.solution = "Please describe your solution clearly (minimum 15 characters).";
    }

    if (targetUser.trim().length < 5) {
      currentErrors.targetUser = "Please specify who will use or benefit from this project.";
    }

    if (uniqueness.trim().length < 10) {
      currentErrors.uniqueness = "Please outline what makes your project approach distinct.";
    }

    if (implementation.trim().length < 15) {
      currentErrors.implementation = "Please summarize your initial execution steps.";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fill in all required project insights.");
      return;
    }

    setLoading(true);
    try {
       const nextStepSend = typeOfIdea === "Innovation" ? 5 : 3
      const payload = {
        title_of_idea: title,
        problem_statement: problem,
        solution_description: solution,
        target_users: targetUser,
        uniqueness_of_the_idea: uniqueness,
        implementation_plan: implementation,
        current_step:  nextStepSend, // FIXED: Tunaambia Django sasa tunasonga mbele kwenda hatua ya 4
        is_complete: false
      };

      // FIXED: Tunatumia 'ideaId' sahihi inayotoka kwenye prop
      await api.patch(`update/idea/${ideaId}/`, payload);
      
      toast.success("🎉 Project pitch saved successfully!");
      onNext();
      
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) {
          toast.error(data.detail);
        } else if (typeof data === "object") {
          Object.entries(data).forEach(([key, value]) => {
            const message = Array.isArray(value) ? value.join(", ") : value;
            toast.error(`${message}`);
          });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("Network connection error. Please verify your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reusable Tailwind style architectures
  const labelClass = "text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
  const iconWrapperClass = "absolute top-3.5 left-3.5 flex items-center pointer-events-none text-slate-400 transition-colors duration-200";
  const inputBaseClass = "w-full py-3 pr-4 border rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-slate-400 text-slate-800";
  const errorTextClass = "text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1.5 animate-fadeIn";

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      
    

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* TITLE OF IDEA */}
        <div className="space-y-1">
          <label className={labelClass}>
            Title of Idea <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200">
              <Sparkles className="w-[18px] h-[18px]" />
            </div>
            <input
              type="text"
              placeholder="e.g., Next-Gen Core Network voice scam firewall"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              className={`${inputBaseClass} pl-11 ${
                errors.title 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.title && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
            </p>
          )}
        </div>

        {/* PROBLEM STATEMENT */}
        <div className="space-y-1">
          <label className={labelClass}>
            Problem Statement <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <Flame className="w-[18px] h-[18px]" />
            </div>
            <textarea
              rows="3"
              placeholder="What systemic challenge or market pain-point are you solving? Be specific."
              value={problem}
              onChange={(e) => {
                setProblem(e.target.value);
                if (errors.problem) setErrors((prev) => ({ ...prev, problem: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.problem 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.problem && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.problem}
            </p>
          )}
        </div>

        {/* SOLUTION DESCRIPTION */}
        <div className="space-y-1">
          <label className={labelClass}>
            Solution Description <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <HelpCircle className="w-[18px] h-[18px]" />
            </div>
            <textarea
              rows="3"
              placeholder="How exactly does your product fix this problem? Outline the technical solution strategy."
              value={solution}
              onChange={(e) => {
                setSolution(e.target.value);
                if (errors.solution) setErrors((prev) => ({ ...prev, solution: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.solution 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.solution && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.solution}
            </p>
          )}
        </div>

        {/* TARGET USERS */}
        <div className="space-y-1">
          <label className={labelClass}>
            Target Users <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <Target className="w-[18px] h-[18px]" />
            </div>
            <textarea 
              rows="2"
              placeholder="Who are your early adopters? (e.g., local small scale retailers, telecom users, students)"
              value={targetUser}
              onChange={(e) => {
                setTargetUser(e.target.value);
                if (errors.targetUser) setErrors((prev) => ({ ...prev, targetUser: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.targetUser
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.targetUser && ( 
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.targetUser}
            </p>
          )}
        </div>

        {/* UNIQUENESS */}
        <div className="space-y-1">
          <label className={labelClass}>
            Uniqueness of the Idea <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <Compass className="w-[18px] h-[18px]" />
            </div>
            <textarea  
              rows="2"
              placeholder="What separates you from current legacy competitors? What is your secret sauce?"
              value={uniqueness}
              onChange={(e) => {
                setUniqueness(e.target.value);
                if (errors.uniqueness) setErrors((prev) => ({ ...prev, uniqueness: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.uniqueness 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.uniqueness && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.uniqueness}
            </p>
          )}
        </div>

        {/* IMPLEMENTATION PLAN */}
        <div className="space-y-1">
          <label className={labelClass}>
            Implementation Plan <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <Rocket className="w-[18px] h-[18px]" /> 
            </div>
            <textarea  
              rows="3"
              placeholder="Outline your immediate steps (e.g., prototype build within 1 month, field testing in month 2)."
              value={implementation}
              onChange={(e) => {
                setImplementation(e.target.value);
                if (errors.implementation) setErrors((prev) => ({ ...prev, implementation: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.implementation 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.implementation && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.implementation}
            </p>
          )}
        </div>

        {/* ACTION SUBMIT BUTTON */}
        <div className="pt-4 mt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm backdrop-blur-sm ${
              loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
                : "bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.2)]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                Submitting...
              </>
            ) : (
              <>
                 Next Step
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}