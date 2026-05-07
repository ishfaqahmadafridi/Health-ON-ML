import type { FC } from 'react';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const BMIDisplay: FC = () => {
  const { data } = useDetailedProfile();

  if (!data || !data.weight || !data.height) return null;

  const heightM = data.height / 100;
  const bmiVal = (data.weight / (heightM * heightM));
  const bmi = bmiVal.toFixed(1);

  const getBMIStatus = (val: number) => {
    if (val < 18.5) return 'Underweight';
    if (val < 25) return 'Normal';
    if (val < 30) return 'Overweight';
    return 'Obese';
  };

  const status = getBMIStatus(bmiVal);
  const isHigh = bmiVal > 25;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">BMI:</label>
      <div className={`px-3 py-2 border rounded-lg text-xs font-bold ${
        isHigh ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-green-50 border-green-200 text-green-700'
      }`}>
        {bmi} ({status})
      </div>
    </div>
  );
};
