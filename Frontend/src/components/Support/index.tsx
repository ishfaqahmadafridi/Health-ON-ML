import type { FC } from 'react';
import { Mail, Phone, MessageSquare, HelpCircle } from 'lucide-react';

export const SupportView: FC = () => {
  return (
    <div className="max-w-5xl mx-auto w-full p-6 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-[#0B3B6F] tracking-tight mb-3">Help & Support</h1>
        <p className="text-gray-500 font-medium max-w-xl mx-auto">
          Need assistance with the Clinical Dashboard? We're here to help. Reach out to our technical team or browse common questions below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-500/5 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
          <p className="text-sm text-gray-500 mb-4">Get help via email within 24 hours.</p>
          <a href="mailto:support@healthonml.org" className="text-sm font-bold text-blue-600 hover:text-blue-700">support@healthonml.org</a>
        </div>
        
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-500/5 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4">
            <Phone size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Phone Support</h3>
          <p className="text-sm text-gray-500 mb-4">Available Mon-Fri, 9am - 5pm EST.</p>
          <a href="tel:+18005550199" className="text-sm font-bold text-green-600 hover:text-green-700">+1 (800) 555-0199</a>
        </div>
        
        <div className="bg-[#0B3B6F] p-6 rounded-[32px] shadow-xl text-center flex flex-col items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/20 w-full h-full transform transition-transform group-hover:scale-110"></div>
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4 relative z-10">
            <MessageSquare size={24} />
          </div>
          <h3 className="font-bold text-white mb-1 relative z-10">Live Chat</h3>
          <p className="text-sm text-blue-200 mb-4 relative z-10">Chat instantly with our technical team.</p>
          <button className="text-sm font-bold bg-white text-[#0B3B6F] px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors relative z-10">
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
          <HelpCircle className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">How are the risk scores calculated?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Risk scores are generated using advanced machine learning models trained on extensive clinical datasets. 
              The system analyzes multi-variate factors including vitals, demographics, and biometrics to compute a composite risk percentage.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Can I edit patient data after prediction?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              To ensure data integrity, prediction history is immutable. If you need to correct patient data, please submit a new assessment via the Analysis tab.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Why isn't the Doctor Profile saving my changes?</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ensure you have filled out all mandatory fields such as the Practitioner Name. Also verify that your network connection to the backend server is stable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
