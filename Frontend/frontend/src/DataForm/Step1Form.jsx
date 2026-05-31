import { useState } from 'react';
import api from '../Api/api';
import toast from 'react-hot-toast';
import { 
  User, 
  Phone, 
  Mail, 
  School, 
  GraduationCap, 
  ArrowRight, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

export default function IdeaFormStepOnePage({ onNext, ideaId }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [course, setCourse] = useState("");
  
 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");

    if (digits.startsWith("255")) digits = digits.slice(3);
    else if (digits.startsWith("0")) digits = digits.slice(1);

    if (digits.length > 9) digits = digits.slice(0, 9);

    setPhone(digits);

    if (digits.length === 9) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validate = () => {
    let currentErrors = {};
    
    if (fullName.trim().length < 3) {
      currentErrors.fullName = "Please enter your full name .";
    }

    if (phone.length !== 9) {
      currentErrors.phone = "Please enter a valid 9-digit phone number.";
    }
  
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      currentErrors.email = "Please enter a valid email address.";
    }

    if (institution.trim().length < 3) {
      currentErrors.institution = "Please enter a valid institution or college name.";
    }

    if (course.trim().length < 3) {
      currentErrors.course = "Please specify your course or field of study.";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please resolve the highlighted errors.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();  
      formData.append("full_name", fullName);
      formData.append("phone_number", `+255${phone}`);
      formData.append("email_address", email);
      formData.append("institution_or_college", institution);
      formData.append("course_or_field_of_study", course);
      formData.append("current_step",1)
      formData.append("is_complete", false)

      let nextId = ideaId || localStorage.getItem('current_idea_id');

      if (nextId) {
        await api.patch(`update/idea/${nextId}/`, formData);
        toast.success("🎉 Personal details updated successfully!");
      } else {
        const response = await api.post("create/idea/", formData);
        nextId = response.data.id; 
        toast.success("🎉 Step one saved successfully!");
        // Kwenye Step 1 baada ya kufanya POST kwa mafanikio:
        localStorage.setItem('current_idea_id', nextId);
      }
      
      onNext(nextId);
      
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

  // Shared Tailwind classes for pristine code readability
  const labelClass = "text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
  const iconWrapperClass = "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 transition-colors duration-200";
  const inputBaseClass = "w-full py-3 pr-4 border rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] placeholder:text-slate-400 text-slate-800";
  const errorTextClass = "text-xs text-rose-500 font-medium mt-1.5 flex items-center gap-1.5 animate-fadeIn";

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      
  

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* FULL NAME FIELD */}
        <div className="space-y-1">
          <label className={labelClass}>
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <User className="w-[18px] h-[18px]" />
            </div>
            <input
              type="text"
              placeholder="e.g., Emmanuel Mushi"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              className={`${inputBaseClass} pl-11 ${
                errors.fullName 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* PHONE NUMBER FIELD */}
        <div className="space-y-1">
          <label className={labelClass}>
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative group flex items-center">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500 z-10`}>
              <Phone className="w-[18px] h-[18px]" />
            </div>
            <span className="absolute left-10 text-slate-400 font-semibold border-r border-slate-200 pr-3.5 text-sm tracking-wide select-none">
              +255
            </span>
            <input
              type="tel"
              placeholder="712 345 678"
              value={phone}
              onChange={handlePhoneChange}
              className={`${inputBaseClass} pl-24 tracking-wider ${
                errors.phone 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.phone && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* EMAIL ADDRESS FIELD */}
        <div className="space-y-1">
          <label className={labelClass}>
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <Mail className="w-[18px] h-[18px]" /> {/* FIXED: Changed to Mail icon */}
            </div>
            <input
              type="email"
              placeholder="mushi@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`${inputBaseClass} pl-11 ${
                errors.email 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* INSTITUTION FIELD */}
        <div className="space-y-1">
          <label className={labelClass}>
            Institution or College <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <School className="w-[18px] h-[18px]" /> {/* FIXED: Changed to School icon */}
            </div>
            <input 
              type="text" 
              placeholder="e.g., College of Informatics"
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value);
                if (errors.institution) setErrors((prev) => ({ ...prev, institution: undefined })); // FIXED: Clear correct key
              }}
              className={`${inputBaseClass} pl-11 ${
                errors.institution 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.institution && ( // FIXED: Syntactically broken slash removed
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.institution}
            </p>
          )}
        </div>

        {/* COURSE FIELD */}
        <div className="space-y-1">
          <label className={labelClass}>
            Course or Field of Study <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <div className={`${iconWrapperClass} group-focus-within:text-indigo-500`}>
              <GraduationCap className="w-[18px] h-[18px]" /> {/* FIXED: Changed to GraduationCap icon */}
            </div>
            <input 
              type="text" 
              placeholder="e.g., Software Engineering"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                if (errors.course) setErrors((prev) => ({ ...prev, course: undefined }));
              }}
              className={`${inputBaseClass} pl-11 ${
                errors.course 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/5" 
                  : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.course && (
            <p className={errorTextClass}>
              <AlertCircle className="w-3.5 h-3.5" /> {errors.course}
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
                Saving Changes...
              </>
            ) : (
              <>
                Continue Setup
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}