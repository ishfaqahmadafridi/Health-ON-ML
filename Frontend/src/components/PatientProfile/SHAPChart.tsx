import type { FC } from 'react';
import { SHAPFeatureItem } from './SHAPFeatureItem';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const SHAPChart: FC = () => {
  const { shapFeatures } = useDetailedProfile();

  return (
    <div className="space-y-3">
      {shapFeatures.map((item) => (
        <SHAPFeatureItem 
          key={item.label} 
          label={item.label} 
          val={item.val} 
          color={item.color} 
        />
      ))}
    </div>
  );
};
