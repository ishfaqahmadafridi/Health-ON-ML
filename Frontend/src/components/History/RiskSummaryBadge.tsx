import type { FC } from 'react';

interface RiskSummaryBadgeProps {
  label: string;
  score: number;
  type: 'heart' | 'diabetes' | 'kidney';
}

export const RiskSummaryBadge: FC<RiskSummaryBadgeProps> = ({ label, score, type }) => {
  const getStyles = () => {
    switch (type) {
      case 'heart':
        return { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' };
      case 'diabetes':
        return { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' };
      case 'kidney':
        return { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' };
      default:
        return { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' };
    }
  };

  const styles = getStyles();

  return (
    <div className={`flex items-center gap-2 px-3 py-2 ${styles.bg} rounded-xl border border-white/50 transition-all hover:scale-[1.02]`}>
      <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></div>
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
      <span className={`ml-auto text-xs font-black ${styles.text}`}>{score}%</span>
    </div>
  );
};
