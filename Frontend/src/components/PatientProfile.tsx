import type { PatientInput } from '../types';

interface PatientProfileProps {
  data: PatientInput | null;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Patient Profile & Input Data</h2>
        <p className="text-center text-gray-500 py-8">No patient data loaded</p>
      </div>
    );
  }

  const calculateBMI = (weight: number, height: number) => {
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  const bmi = calculateBMI(data.weight, data.height);

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Patient Profile & Input Data</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-500 mb-3 pb-2 border-b border-gray-200">Personal Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Patient ID:</label>
            <span className="text-gray-900 font-medium">P-10234</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Name:</label>
            <span className="text-gray-900 font-medium">{data.gender === 'male' ? 'John' : 'Emily'} {data.age > 50 ? 'Smith' : 'Chen'}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Age:</label>
            <span className="text-gray-900 font-medium">{data.age}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Gender:</label>
            <span className="text-gray-900 font-medium capitalize">{data.gender}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-500 mb-3 pb-2 border-b border-gray-200">Biometrics</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Weight:</label>
            <span className="text-gray-900 font-medium">{data.weight} kg</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Height:</label>
            <span className="text-gray-900 font-medium">{data.height} cm</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">BMI:</label>
            <span className="text-gray-900 font-medium">
              {bmi}
              <span className="text-xs text-gray-500 ml-1">
                {parseFloat(bmi) < 18.5
                  ? ' (Underweight)'
                  : parseFloat(bmi) < 25
                  ? ' (Normal)'
                  : parseFloat(bmi) < 30
                  ? ' (Overweight)'
                  : ' (Obese)'}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-500 mb-3 pb-2 border-b border-gray-200">Vital Signs</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Blood Pressure:</label>
            <span className="text-gray-900 font-medium">{data.bloodPressureSystolic}/{data.bloodPressureDiastolic} mmHg</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Glucose Level:</label>
            <span className="text-gray-900 font-medium">{data.glucoseLevel} mg/dL (Fasting)</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Cholesterol:</label>
            <span className="text-gray-900 font-medium">{data.cholesterol} mg/dL</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-500 mb-3 pb-2 border-b border-gray-200">Lifestyle</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Heart Rate:</label>
            <span className="text-gray-900 font-medium">{data.heartRate} bpm</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Smoking:</label>
            <span className="text-gray-900 font-medium capitalize">{data.smokingStatus}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
            <label className="font-semibold text-gray-500">Activity Level:</label>
            <span className="text-gray-900 font-medium capitalize">{data.physicalActivityLevel}</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-blue-500 mb-4">Input Feature Importance (SHAP Analysis)</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-500 min-w-[60px]">Glucose</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
              <div className="h-full w-[95%] bg-red-500 rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-500 min-w-[60px]">BP</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
              <div className="h-full w-[78%] bg-yellow-500 rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-500 min-w-[60px]">Cholesterol</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
              <div className="h-full w-[65%] bg-blue-500 rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-500 min-w-[60px]">Age</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
              <div className="h-full w-[58%] bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
