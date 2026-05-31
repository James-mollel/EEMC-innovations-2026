// import React, { useState } from "react";
// import IdeaFormStepOnePage from "./Step1Form";
// import IdeaFormStepTwoPage from "./Step2Form";
// import IdeaFormStepThreePage from "./Step3Form";
// import IdeaFormStepFourPage from "./Step4Form";
// import IdeaFormStepFivePage from "./Step5Form";
// import WelcomeModal from "./Welocome";


// import { User2, Lightbulb, FileText, Briefcase, Paperclip, ChevronLeft , Trophy} from "lucide-react";

// const FORM_STEPS = [
//   { id: 1, label: "Personal Info", title: "Personal Information", icon: User2 },
//   { id: 2, label: "Idea Type", title: "Type of Idea", icon: Lightbulb },
//   { id: 3, label: "Description", title: "Idea Description", icon: FileText },
//   { id: 4, label: "Potential", title: "Business Potential", icon: Briefcase },
//   { id: 5, label: "Materials", title: "Supporting Material", icon: Paperclip },
// ];

// export default function MainStepRenderFormPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = FORM_STEPS.length;
//   const [ideaId, setIdeaId] = useState(null);

// const handleNextStep = (idFromStepOne) => {
//   if (idFromStepOne) {
//     setIdeaId(idFromStepOne); 
//   }
//   if (currentStep < totalSteps) {
//     setCurrentStep((prev) => prev + 1);
//   }
// };


//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   // Extract current step details safely
//   const activeStepConfig = FORM_STEPS[currentStep - 1];
//   const ActiveIcon = activeStepConfig?.icon || Lightbulb;


//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-zinc-50 to-slate-100 py-8 px-4 sm:py-16 sm:px-6 lg:px-8 font-sans antialiased selection:bg-indigo-500/10 text-slate-900">
//       <WelcomeModal/>
//       <div className="max-w-xl mx-auto">
        
//         {/* Optional Optional Back Button Link */}
//         {currentStep > 1 && (
//           <button
//             onClick={handlePrevStep}
//             className="group mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
//           >
//             <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
//             Back to previous step
//           </button>
//         )}

//         {/* Main Card Wrapper */}
//         <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sm:shadow-[0_20px_50px_rgba(15,23,42,0.04)] p-5 sm:p-8 transition-all duration-300">
    
//         <div className="text-center py-5">
//            <h1 className="text-2xl" >EEMC <span className="bg-gradient-to-b from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold" > UDOM </span></h1>
//            <div className="flex items-center space-x-2 justify-center">
//              <p>INNOVATIONS & BUSSINESS IDEAS COMPETITION 2026 </p>
//              <Trophy size={24} className="text-yellow-600"/>
//            </div>
//         </div>
          
        
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              
//               <div>
//                 <h2 className="text-sm font-medium text-slate-500">
//                   Step <span className="font-bold text-slate-800">{currentStep}</span> of {totalSteps}
//                 </h2>
//               </div>

           
//               <div className="inline-flex items-center gap-2 self-start sm:self-center text-xs font-medium text-indigo-600 bg-indigo-50/60 border border-indigo-100/80 px-3 py-1.5 rounded-xl shadow-sm transition-all duration-300">
//                 <ActiveIcon className="w-3.5 h-3.5 stroke-[2.5]" />
//                 <span className="truncate max-w-[180px] sm:max-w-none">
//                   {activeStepConfig?.title}
//                 </span>
//               </div>

//             </div>

//             <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(79,70,229,0.3)]"
//                 style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//               ></div>
//             </div>
//           </div>

  
//           <div className="relative min-h-[300px] transition-all duration-300">
//             {currentStep === 1 && (
//               <IdeaFormStepOnePage onNext={handleNextStep} ideaId={ideaId} />
//             )}
            
//             {currentStep === 2 && (
//               <IdeaFormStepTwoPage onNext={handleNextStep} ideaId={ideaId} />
//             )}


//             {currentStep === 3 && (
//               <IdeaFormStepThreePage onNext={handleNextStep} ideaId={ideaId} />
//             )}

//             {currentStep === 4 && (
//               <IdeaFormStepFourPage onNext={handleNextStep} ideaId={ideaId} />
//             )}

//             {currentStep === 5 && (
//               <IdeaFormStepFivePage onNext={handleNextStep}  ideaId={ideaId} />
//             )}
//           </div>

//         </div>

//         <p className="text-center text-[11px] text-slate-400 mt-6 tracking-wide">
//          Your info are  Secured stored.
//         </p>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import IdeaFormStepOnePage from "./Step1Form";
import IdeaFormStepTwoPage from "./Step2Form";
import IdeaFormStepThreePage from "./Step3Form";
import IdeaFormStepFourPage from "./Step4Form";
import IdeaFormStepFivePage from "./Step5Form";
import WelcomeModal from "./Welocome";

import { User2, Lightbulb, FileText, Briefcase, Paperclip, ChevronLeft, Trophy } from "lucide-react";

const FORM_STEPS = [
  { id: 1, label: "Personal Info", title: "Personal Information", icon: User2 },
  { id: 2, label: "Idea Type", title: "Type of Idea", icon: Lightbulb },
  { id: 3, label: "Description", title: "Idea Description", icon: FileText },
  { id: 4, label: "Potential", title: "Business Potential", icon: Briefcase },
  { id: 5, label: "Materials", title: "Supporting Material", icon: Paperclip },
];

export default function MainStepRenderFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = FORM_STEPS.length;

  const [ideaId, setIdeaId] = useState(null);
  const [typeOfIdea, setTypeOfIdea] = useState(null);


 const handleNextStep = (idFromStepOne, chosenTrack) => {
    if (idFromStepOne) {
      setIdeaId(idFromStepOne); 
    }
    
    if (chosenTrack) {
      setTypeOfIdea(chosenTrack); 
    }

    if (currentStep === 3 && (chosenTrack === "Innovation" || typeOfIdea === "Innovation")) {  
      setCurrentStep(5);
    } else if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };


  const handlePrevStep = () => {
    if (currentStep === 5 && typeOfIdea === "Innovation") {
      setCurrentStep(3); 
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Safe check for current active step details
  const activeStepConfig = FORM_STEPS[currentStep - 1];
  const ActiveIcon = activeStepConfig?.icon || Lightbulb;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-zinc-50 to-slate-100 py-8 px-4 sm:py-16 sm:px-6 lg:px-8 font-sans antialiased selection:bg-emerald-500/20 text-slate-900">
      <WelcomeModal />
      
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* PREMIUM SILICON VALLEY HEADER SECTION */}
        <div className="text-center space-y-4 pb-2">
          {/* Floating Premium Icon Badge */}
          <div className="inline-flex relative items-center justify-center pt-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-b from-amber-50 to-amber-100/60 border border-amber-200/50 shadow-[0_2px_8px_rgba(245,158,11,0.05)]">
              <Trophy className="w-5 h-5 text-amber-600 stroke-[1.5]" />
            </div>
          </div>

          {/* Core Branding */}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              EEMC <span className="bg-gradient-to-b from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold">DODOMA</span>
            </h1>
            <p className="text-xs font-semibold tracking-wide text-emerald-700 bg-emerald-50/80 border border-emerald-100/60 rounded-full py-1 px-3 inline-block shadow-inner">
              Innovations & Business Ideas Competition 2026
            </p>
          </div>
        </div>

        {/* Action Controls & Form Card Wrapper */}
        <div className="relative">
          {/* Back Button positioned clean and tight layout */}
          {currentStep > 1 && (
            <button
              onClick={handlePrevStep}
              className="group absolute -top-7 left-1 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors duration-200"
            >
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back
            </button>
          )}

          {/* Main Card Wrapper */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[24px] border border-slate-200/60 shadow-[0_8px_32px_-6px_rgba(15,23,42,0.02),0_24px_64px_-12px_rgba(15,23,42,0.06)] p-6 sm:p-8 transition-all duration-300">
      
            {/* Step Status Sub-Header Dashboard */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <div>
                  <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Step <span className="font-bold text-slate-800 normal-case">{currentStep}</span> <span className="text-slate-300">/</span> {totalSteps}
                  </h2>
                </div>

                {/* Status Indicator Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/80 shadow-sm transition-all duration-300">
                  <ActiveIcon className="w-3.5 h-3.5 text-slate-500 stroke-[1.75]" />
                  <span>{activeStepConfig?.title}</span>
                </div>
              </div>

              {/* Ultra Smooth Premium Progress Bar */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Dynamic Step Content Rendering */}
            <div className="relative min-h-[280px] transition-all duration-300">
              {currentStep === 1 && (
                <IdeaFormStepOnePage onNext={handleNextStep} ideaId={ideaId} />
              )}
              
              {currentStep === 2 && (
                <IdeaFormStepTwoPage onNext={handleNextStep} ideaId={ideaId} />
              )}

              {currentStep === 3 && (
                <IdeaFormStepThreePage onNext={handleNextStep} ideaId={ideaId} typeOfIdea={typeOfIdea} />
              )}

              {currentStep === 4 && (
                <IdeaFormStepFourPage onNext={handleNextStep} ideaId={ideaId} />
              )}

              {currentStep === 5 && (
                <IdeaFormStepFivePage onNext={handleNextStep} ideaId={ideaId} />
              )}
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-slate-400/80 tracking-wide">
          Your data is encrypted and securely pipelines to our private registries.
        </p>
      </div>
    </div>
  );
}