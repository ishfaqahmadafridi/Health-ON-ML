import type { FC } from 'react';

export const PredictionButton: FC = () => {
  return (
    <button className="mt-4 w-full py-3 bg-[#2B78C5] hover:bg-[#2466A8] text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95">
      Predict Multi-Risk
    </button>
  );
};
