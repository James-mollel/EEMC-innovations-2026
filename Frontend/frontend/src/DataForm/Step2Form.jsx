

import { useState } from 'react';
import api from '../Api/api';
import toast from 'react-hot-toast';
import { 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  Lightbulb, 
  Briefcase,
  CheckCircle2
} from "lucide-react";


export default function IdeaFormStepTwoPage({ onNext, ideaId }) {
  const [typeOfIdea, setTypeOfIdea] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!typeOfIdea) {
      setError("Please select an idea track to continue.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please pick your idea track");
      return;
    }

    const activeIdeaId = ideaId || localStorage.getItem('current_idea_id');

    if (!activeIdeaId) {
      toast.error("❌ Session expired. Please start from step one.");
      return;
    }

    setLoading(true);
    try {
      // 2. FIXED: Inatuma 'type_of_idea' na 'current_step: 3' kwenda Django kwa kutumia 'ideaId' sahihi
      const payload = {
        type_of_idea: typeOfIdea,
        current_step: 2,
        is_complete: false
      };

      await api.patch(`update/idea/${activeIdeaId}/`, payload);
      
      toast.success("🎉 Track category saved successfully!");
      onNext(null, typeOfIdea);
      
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
        toast.error("Network connection error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      
    

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Choice Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* INNOVATION OPTION */}
          <div  
            onClick={() => {
              setTypeOfIdea("Innovation");
              setError("");
            }}
            className={`group relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between space-y-4 active:scale-[0.98] ${
              typeOfIdea === "Innovation"
                ? "border-indigo-600 bg-indigo-50/10 shadow-[0_4px_20px_rgba(79,70,229,0.06)]"
                : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md hover:shadow-slate-100/50"
            }`}
          >
            {typeOfIdea === "Innovation" && (
              <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-indigo-600 animate-scaleIn" />
            )}
            
            <div className="space-y-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                typeOfIdea === "Innovation"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
              }`}>
                <Lightbulb className="w-5 h-5" />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Innovation Idea</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                     Best for research projects, hackathons, building scientific applications, or coding brand new software solutions.
                </p>
              </div>
            </div>
          </div>

          {/* BUSINESS OPTION */}
          <div 
            onClick={() => {
              setTypeOfIdea("Business");
              setError("");
            }}
            className={`group relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between space-y-4 active:scale-[0.98] ${
              typeOfIdea === "Business"
                ? "border-violet-600 bg-violet-50/10 shadow-[0_4px_20px_rgba(124,58,237,0.06)]"
                : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md hover:shadow-slate-100/50"
            }`}
          >
            {typeOfIdea === "Business" && (
              <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-violet-600 animate-scaleIn" />
            )}

            <div className="space-y-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                typeOfIdea === "Business"
                  ? "bg-violet-600 text-white"
                  : "bg-violet-50 text-violet-600 group-hover:bg-violet-100"
              }`}>
                <Briefcase className="w-5 h-5" />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Business Idea</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                     Best for student startups, campus marketplaces, side hustles, or launching scalable local business platforms.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Validation Error Text */}
        {error && (
          <p className="text-xs text-rose-500 font-medium text-center mt-2 flex items-center justify-center gap-1.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4" /> {error}
          </p>
        )}

        {/* Modern Minimal Splitter Line */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>


        <div>
          <button
            type="submit"
            disabled={loading || !typeOfIdea}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
              loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : !typeOfIdea
                ? "bg-slate-900 text-white/50 opacity-40 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.2)]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                Saving Selection...
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