import type { FC } from 'react';
import { KeyFactorsChart } from '../KeyFactorsChart';

export const KeyFactorsSection: FC = () => {
  return (
    <div className="card p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">📊 Key Contributing Factors</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <KeyFactorsChart
            disease="heart"
            factors={[
              { name: 'BP', value: 85 },
              { name: 'Cholesterol', value: 72 },
              { name: 'Age', value: 65 },
            ]}
          />
        </div>
        <div>
          <KeyFactorsChart
            disease="diabetes"
            factors={[
              { name: 'Glucose', value: 95 },
              { name: 'BMI', value: 78 },
              { name: 'Activity Level', value: 62 },
            ]}
          />
        </div>
        <div>
          <KeyFactorsChart
            disease="kidney"
            factors={[
              { name: 'BP', value: 88 },
              { name: 'Cholesterol', value: 72 },
              { name: 'Age', value: 75 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
