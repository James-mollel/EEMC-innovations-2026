import { useState } from 'react';
import api from '../Api/api';
import toast from 'react-hot-toast';
import { 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  Coins,
  LineChart,
  TrendingUp
} from "lucide-react";

export default function IdeaFormStepFourPage({ onNext, ideaId }) {
  const [estimatedCost, setEstimatedCost] = useState("");
  const [potentialMarket, setPotentialMarket] = useState("");
  const [expectedImpact, setExpectedImpact] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let currentErrors = {};
    
    if (!estimatedCost.trim()) {
      currentErrors.estimatedCost = "Please specify an estimated starting budget or enter 0 if self-funded.";
    }

    if (potentialMarket.trim().length < 10) {
      currentErrors.potentialMarket = "Please expand your potential market analysis (minimum 10 characters).";
    }

    if (expectedImpact.trim().length < 15) {
      currentErrors.expectedImpact = "Please describe the business impact clearly (minimum 15 characters).";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fill in all required viability metrics.");
      return;
    }

    setLoading(true);
    try {
      // FIXED: Tumebadilisha kutoka FormData kwenda Plain JSON Object kwa ajili ya usalama wa DRF
      const payload = {
        estimated_cost_to_start: estimatedCost,
        potential_market: potentialMarket,
        expected_impact: expectedImpact,
        current_step: 4, 
        is_complete: false
      };

      await api.patch(`update/idea/${ideaId}/`, payload);
      
      toast.success("🎉 Financial metrics saved successfully!");
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

  // Shared design styles
  const labelClass = "text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
  const iconWrapperClass = "absolute top-3.5 left-3.5 flex items-center pointer-events-none text-slate-400 transition-colors duration-200";
  const inputBaseClass = "w-full py-3 pr-4 border rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-slate-400 text-slate-800";
  const errorTextClass = "text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1.5 animate-fadeIn";

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      
   

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* ESTIMATED COST TO START */}
        <div className="space-y-1">
          <label className={labelClass}>
            Estimated Cost to Start <span className="text-rose-500">*</span>
          </label>
          <div className="relative group flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200">
              <Coins className="w-[18px] h-[18px]" />
            </div>
            <input
              type="text"
              placeholder="e.g., 2,500,000"
              value={estimatedCost}
              onChange={(e) => {
                setEstimatedCost(e.target.value);
                if (errors.estimatedCost) setErrors((prev) => ({ ...prev, estimatedCost: undefined }));
              }}
              className={`${inputBaseClass} pl-11 ${
                errors.estimatedCost 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.estimatedCost && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.estimatedCost}
            </p>
          )}
        </div>

        {/* POTENTIAL MARKET */}
        <div className="space-y-1">
          <label className={labelClass}>
            Potential Market <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <LineChart className="w-[18px] h-[18px]" />
            </div>
            <textarea
              rows="3"
              placeholder="Detail your target market scale. (e.g., Local higher learning students, informal service workers across major regional hubs like Arusha or Dar es Salaam)."
              value={potentialMarket}
              onChange={(e) => {
                setPotentialMarket(e.target.value);
                if (errors.potentialMarket) setErrors((prev) => ({ ...prev, potentialMarket: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.potentialMarket 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.potentialMarket && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.potentialMarket}
            </p>
          )}
        </div>

        {/* EXPECTED IMPACT */}
        <div className="space-y-1">
          <label className={labelClass}>
            Expected Impact <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <TrendingUp className="w-[18px] h-[18px]" />
            </div>
            <textarea
              rows="3"
              placeholder="What long-term social or financial shifts will this drive? (e.g., Lowering mobile money deduction friction for independent platform workers to protect wages)."
              value={expectedImpact}
              onChange={(e) => {
                setExpectedImpact(e.target.value);
                if (errors.expectedImpact) setErrors((prev) => ({ ...prev, expectedImpact: undefined }));
              }}
              className={`${inputBaseClass} pl-11 resize-none ${
                errors.expectedImpact 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            ></textarea>
          </div>
          {errors.expectedImpact && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.expectedImpact}
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
                : "bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white shadow-md"
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