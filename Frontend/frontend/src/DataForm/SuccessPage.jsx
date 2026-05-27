
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckCircle2, Copy, Check, ArrowUpRight, Globe, Layers, X, Tag } from "lucide-react";

export default function SuccessSubmissionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const submissionId = location.state?.submissionId || "EEMC-PENDING";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(submissionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-zinc-50 to-slate-100 flex items-center justify-center p-4 sm:p-6 antialiased font-sans text-slate-900">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/60 p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] text-center space-y-8 relative overflow-hidden">
        
        {/* Silicon Valley Style Accent Orbs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100/80 shadow-sm shadow-emerald-100">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Submission Completed!
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
              Congraturations 🎉  your EEMC INNOVATIONS AND BUSSIESS IDEA been successfully secured and locked into our evaluation pipeline.
          </p>
        </div>

        {/* TRACKING ID CONTAINER */}
        <div className="bg-slate-50/80 border border-slate-200/50 rounded-2xl p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Your Tracking ID
          </span>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <code className="w-full sm:w-auto text-sm sm:text-base font-mono font-bold text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm tracking-wide text-center">
              {submissionId}
            </code>
            
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all duration-200 ${
                copied
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm active:scale-98"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="sm:hidden">Copy ID</span>
                </>
              )}
            </button>
          </div>
        </div>

      


      {/* SILICON VALLEY STYLE LIGHT KAZIBASE SPOTLIGHT */}
<div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-5 text-left space-y-4 relative overflow-hidden shadow-sm transition-all duration-300 group/card">
  
  {/* Ambient background glow for premium touch */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
  
  {/* Internal Premium Badge Accent */}
  <div className="flex items-center justify-between gap-4 relative z-10">
    <div className="inline-flex items-center gap-1.5 text-[9px] font-bold text-indigo-600 bg-indigo-50/80 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
      <Tag className="w-3 h-3 stroke-[2.5]" />
     Explore Our Ecosystem
    </div>

  </div>
  
  {/* Product Pitch Details */}
  <div className="space-y-1.5 relative z-10">
    <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
      Discover KaziBase
    </h3>
    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
      Explore <span className="font-semibold text-slate-800">KaziBase</span> — a neighboring ecosystem designed to seamlessly connect <span className="font-semibold text-slate-800">local service providers</span> and employers right within their communities using precision <span className="font-semibold text-indigo-600">GPS mapping</span>.
    </p>
  </div>

  {/* Action Link Button */}
  <a
    href="https://kazibase.co.tz"
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex w-full py-3 px-4 rounded-xl font-semibold bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-200 items-center justify-center gap-1.5 text-sm shadow-sm hover:shadow-md hover:shadow-indigo-500/10 active:scale-[0.98]"
  >
    <span>Explore KaziBase Platform</span>
    <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
</div>


<div className="pt-4 border-t border-slate-100 mt-2">
  <button
    onClick={() => {
      // 1. Jaribu kufunga tab ya Chrome
      window.close();

      // 2. Kama Chrome ikiblock (kwa sababu ya security), mrushe Google papo hapo
      setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 150);
    }}
    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-800 border border-slate-200/60 rounded-xl transition-all duration-200 active:scale-[0.99]"
  >
    <X className="w-3.5 h-3.5 stroke-[2.5]" />
    <span>Close Window & Exit</span>
  </button>
</div>


      </div>
    </div>
  );
}