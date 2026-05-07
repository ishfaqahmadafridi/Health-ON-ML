import { type FC } from 'react';
import type { DiseaseRisk } from '../../../types';
import { getRiskColor, getRiskDescription, getDiseaseGuidance } from '../../../utils/riskCalculator';

// Sub-components
import { RiskCardHeader } from './RiskCardHeader';
import { RiskScoreDisplay } from './RiskScoreDisplay';
import { RiskGuidance } from './RiskGuidance';
import { RiskProgressBar } from './RiskProgressBar';

export interface RiskCardProps {
  disease: 'heart' | 'diabetes' | 'kidney';
  title: string;
  icon: React.ReactNode;
  risk: DiseaseRisk;
}

export const RiskCard: FC<RiskCardProps> = ({ disease, title, icon, risk }) => {
  const color = getRiskColor(risk.level);
  const description = getRiskDescription(risk.level);
  const guidance = getDiseaseGuidance(disease, risk.level);

  return (
    <div className="bg-white rounded-[32px] p-7 shadow-xl shadow-blue-500/5 border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group">
      <RiskCardHeader title={title} icon={icon} />
      
      <RiskScoreDisplay 
        score={risk.riskScore} 
        level={risk.level} 
        color={color} 
      />
      
      <RiskGuidance 
        description={description} 
        guidance={guidance} 
      />
      
      <RiskProgressBar 
        score={risk.riskScore} 
        color={color} 
      />
    </div>
  );
};
