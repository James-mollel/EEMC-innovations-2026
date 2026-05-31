import { useState, useEffect } from 'react';
import api from '../Api/api';
import toast from 'react-hot-toast';
import { ArrowRight, Loader2, MessageCircle, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IdeaFormStepFivePage({ onNext, ideaId }) {
  const [ideaData, setIdeaData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // WhatsApp admin number (Tanzania format)
  const whatsappNumber = '255764819872'; // 0764819872
  const adminName = 'Elisha kikoti';


  const activeIdeaId = ideaId || localStorage.getItem('current_idea_id');
    

  // Fetch idea details on mount
  
  useEffect(() => {
    const fetchIdea = async () => {
      // Kama hakuna ID, zima loading na usiendelee
      if (!activeIdeaId) {
        setLoadingData(false);
        return;
      }

      try {
        const resp = await api.get(`update/idea/${activeIdeaId}/`);
        setIdeaData(resp.data);
      } catch (error) {
        toast.error('Failed to load submission details.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchIdea();
  }, [activeIdeaId]);



  // Build WhatsApp message
  const buildWhatsAppMessage = () => {
    if (!ideaData) return '';
    return encodeURIComponent(
      `*Innovation Submission - Documents*\n\n` +
      `📌 Submission ID: ${ideaData.submission_id}\n` +
      `👤 Full Name: ${ideaData.full_name}\n` +
      `📧 Email: ${ideaData.email_address}\n` +
      `📱 Phone: ${ideaData.phone_number}\n` +
      `🏫 Institution: ${ideaData.institution_or_college}\n\n` +
      `Please find attached my proposal documents. Thank you.`
    );
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`;

  // Copy details to clipboard
  const copyToClipboard = () => {
    const text = `Submission ID: ${ideaData.submission_id}\nFull Name: ${ideaData.full_name}\nEmail: ${ideaData.email_address}\nPhone: ${ideaData.phone_number}\nInstitution: ${ideaData.institution_or_college}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Details copied!');
    setTimeout(() => setCopied(false), 2000);
  };


  // Loading state
  if (loadingData) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!ideaData) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center text-red-500">
        Could not load your submission data. Please go back.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Final Step – Send Documents via WhatsApp</h2>
        <p className="text-xs text-slate-500 mt-1">
          Your idea is almost complete. Please send your supporting documents to our WhatsApp number below.
        </p>
      </div>

      {/* User Details Card */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mb-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Details</h3>
          <button
            onClick={copyToClipboard}
            className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-slate-500 text-xs">Submission ID</span>
            <p className="font-semibold text-slate-800">{ideaData.submission_id}</p>
          </div>
          <div>
            <span className="text-slate-500 text-xs">Full Name</span>
            <p className="font-semibold text-slate-800">{ideaData.full_name}</p>
          </div>
          <div>
            <span className="text-slate-500 text-xs">Email</span>
            <p className="font-semibold text-slate-800 break-all">{ideaData.email_address}</p>
          </div>
          <div>
            <span className="text-slate-500 text-xs">Phone</span>
            <p className="font-semibold text-slate-800">{ideaData.phone_number}</p>
          </div>
          <div className="col-span-2">
            <span className="text-slate-500 text-xs">Institution / College</span>
            <p className="font-semibold text-slate-800">{ideaData.institution_or_college}</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Link Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-semibold text-sm bg-green-500 hover:bg-green-600 text-white shadow-md transition-all duration-200 mb-4"
      >
        <MessageCircle className="w-5 h-5" />
        Send Documents to {adminName} via WhatsApp
        <ArrowRight className="w-4 h-4" />
      </a>

      <p className="text-[11px] text-slate-400 text-center mb-6">
        Click the button above to open WhatsApp with your details pre-filled. Attach your documents and send.
      </p>
    </div>
  );
}