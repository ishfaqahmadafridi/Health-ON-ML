import type { FC } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { usePatientForm } from '../../hooks/form/usePatientForm';

interface FormActionsProps {
  isLoading: boolean;
}

export const FormActions: FC<FormActionsProps> = ({ isLoading }) => {
  const { resetForm } = usePatientForm();

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8">
      <button
        type="submit"
        disabled={isLoading}
        className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 active:scale-95"
      >
        <Send className="w-4 h-4" />
        {isLoading ? 'Processing Diagnosis...' : 'Submit Assessment'}
      </button>

      <button
        type="button"
        onClick={resetForm}
        className="px-8 py-4 bg-gray-50 text-gray-500 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100 active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};
