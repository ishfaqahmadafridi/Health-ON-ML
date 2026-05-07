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
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-5 border border-gray-100">
      <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Patient Profile & Input Data</h2>

      {/* Personal Info */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Patient ID:</label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">P-10234</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Name:</label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.name}</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Father's Name:</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.fatherName}</div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Contact:</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.contactNumber}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Age:</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.age}</div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Gender:</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 capitalize">{data.gender}</div>
          </div>
        </div>
      </div>

      {/* Biometrics */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">Biometrics</h3>
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Weight:</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.weight} kg</div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Height:</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.height} cm</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">BMI:</label>
          <div className={`px-3 py-2 border rounded-lg text-xs font-bold ${parseFloat(bmi) > 25 ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
            {bmi} ({parseFloat(bmi) < 18.5 ? 'Underweight' : parseFloat(bmi) < 25 ? 'Normal' : parseFloat(bmi) < 30 ? 'Overweight' : 'Obese'})
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">Vital Signs</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Blood Pressure:</label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.bloodPressureSystolic}/{data.bloodPressureDiastolic} mmHg</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Glucose Level:</label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">{data.glucoseLevel} mg/dL</div>
        </div>
      </div>

      {/* SHAP */}
      <div className="pt-2">
        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Feature Importance (SHAP)</h4>
        <div className="space-y-3">
          {[
            { label: 'Glucose', val: 95, color: 'bg-pink-500' },
            { label: 'BP', val: 78, color: 'bg-blue-600' },
            { label: 'Cholesterol', val: 45, color: 'bg-pink-600' },
            { label: 'Age', val: 32, color: 'bg-blue-800' }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-gray-500 min-w-[50px]">{item.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-4 w-full py-3 bg-[#2B78C5] hover:bg-[#2466A8] text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95">
        Predict Multi-Risk
      </button>
    </div>
  );
};
