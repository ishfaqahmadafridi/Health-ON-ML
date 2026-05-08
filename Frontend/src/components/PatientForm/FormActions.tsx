import type { FC } from 'react';

interface FormActionsProps {
  isLoading: boolean;
}

export const FormActions: FC<FormActionsProps> = ({ isLoading }) => {
  return (
    <div className="mt-8">
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 bg-[#2B78C5] text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#2467A9] hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Predict Multi-Risk'
        )}
      </button>
    </div>
  );
};
