import type { FC } from 'react';
import type { PatientInput } from '../../types';

interface PatientDataSummaryProps {
  data: PatientInput;
}

export const PatientDataSummary: FC<PatientDataSummaryProps> = ({ data }) => {
  return (
    <div className="card p-4 mb-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Patient Summary</h4>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Patient ID:</span>
          <span className="font-medium">P-{Math.floor(Math.random() * 100000)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium">{data.age} years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gender:</span>
          <span className="font-medium capitalize">{data.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">BMI Category:</span>
          <span className="font-medium">
            {data.weight && data.height
              ? (() => {
                  const bmi = data.weight / ((data.height / 100) ** 2);
                  if (bmi < 18.5) return 'Underweight';
                  if (bmi < 25) return 'Normal';
                  if (bmi < 30) return 'Overweight';
                  return 'Obese';
                })()
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
