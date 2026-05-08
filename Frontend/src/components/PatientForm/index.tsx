import type { FC, ReactNode } from 'react';
import { PatientFormProvider } from '../../context/form/PatientFormContext';
import { usePatientForm } from '../../hooks/form/usePatientForm';
import type { PatientInput } from '../../types';

interface PatientFormProps {
  onSubmit: (data: PatientInput) => void;
  isLoading: boolean;
}

const FieldRow: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <div className="flex items-center gap-2 mb-1.5">
    <label className="text-[11px] font-bold text-gray-700 w-[110px] shrink-0 uppercase tracking-tight">
      {label}
    </label>
    <div className="flex-1 flex items-center gap-2">
      {children}
    </div>
  </div>
);

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mt-4 mb-2">
    {title}
  </h3>
);

const InputClass = "w-full px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-900 outline-none focus:border-blue-500 shadow-sm transition-all";
const SelectClass = "w-full px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-900 outline-none focus:border-blue-500 shadow-sm transition-all appearance-none";

const PatientFormContent: FC<PatientFormProps> = ({ onSubmit, isLoading }) => {
  const { formData, handleChange } = usePatientForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Calculate BMI
  const heightInMeters = formData.height / 100;
  const bmi = heightInMeters > 0 ? (formData.weight / (heightInMeters * heightInMeters)).toFixed(1) : "0.0";
  const bmiNum = parseFloat(bmi);
  let bmiStatus = "Normal";
  let bmiColor = "bg-gray-50";
  if (bmiNum < 18.5) { bmiStatus = "Underweight"; bmiColor = "bg-yellow-50 text-yellow-700"; }
  else if (bmiNum >= 25 && bmiNum < 30) { bmiStatus = "Overweight"; bmiColor = "bg-orange-50 text-orange-700"; }
  else if (bmiNum >= 30) { bmiStatus = "Obese"; bmiColor = "bg-red-50 text-red-700"; }

  // Fallback random ID for UI consistency if empty
  const patientId = "P-" + Math.floor(10000 + Math.random() * 90000);

  return (
    <form onSubmit={handleSubmit} className="bg-[#F8FAFC] rounded-xl border border-gray-200 p-4 shadow-sm w-full font-sans">
      <h2 className="text-[14px] font-black text-gray-900 uppercase tracking-tight mb-4 pb-2 border-b border-gray-200">
        PATIENT PROFILE & INPUT DATA
      </h2>

      {/* Basic Info */}
      <FieldRow label="Patient ID:">
        <input type="text" readOnly value={patientId} className={`${InputClass} bg-gray-50 text-gray-500`} />
      </FieldRow>
      <FieldRow label="Name:">
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className={InputClass} placeholder="Enter name" />
      </FieldRow>
      <FieldRow label="Age:">
        <input type="number" name="age" value={formData.age} onChange={handleChange} min="1" max="120" required className={InputClass} />
      </FieldRow>
      <FieldRow label="Gender:">
        <select name="gender" value={formData.gender} onChange={handleChange} className={SelectClass}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </FieldRow>

      <SectionHeader title="BIOMETRICS" />
      <FieldRow label="Weight:">
        <div className="relative w-full">
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className={InputClass} />
          <span className="absolute right-2 top-1.5 text-[10px] text-gray-400 font-bold">kg</span>
        </div>
      </FieldRow>
      <FieldRow label="Height:">
        <div className="relative w-full">
          <input type="number" name="height" value={formData.height} onChange={handleChange} required className={InputClass} />
          <span className="absolute right-2 top-1.5 text-[10px] text-gray-400 font-bold">cm</span>
        </div>
      </FieldRow>
      <FieldRow label="BMI:">
        <input type="text" readOnly value={`${bmi} (${bmiStatus})`} className={`${InputClass} ${bmiColor} font-bold`} />
      </FieldRow>

      <SectionHeader title="VITAL SIGNS" />
      <FieldRow label="Blood Pressure:">
        <div className="flex items-center gap-1 w-full">
          <input type="number" name="systolicBP" value={formData.systolicBP} onChange={handleChange} required className={InputClass} />
          <span className="text-gray-400 font-bold text-xs">/</span>
          <input type="number" name="diastolicBP" value={formData.diastolicBP} onChange={handleChange} required className={InputClass} />
          <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap ml-1">mmHg</span>
        </div>
      </FieldRow>
      <FieldRow label="Glucose Level:">
        <div className="flex items-center gap-1 w-full">
          <select name="glucose" value={formData.glucose} onChange={handleChange} className={SelectClass}>
            <option value="Normal">Normal</option>
            <option value="Pre-diabetic">Pre-diabetic</option>
            <option value="Diabetic">Diabetic</option>
          </select>
        </div>
      </FieldRow>
      <FieldRow label="Cholesterol:">
        <div className="flex items-center gap-1 w-full">
          <select name="cholesterol" value={formData.cholesterol} onChange={handleChange} className={SelectClass}>
            <option value="Normal">Normal</option>
            <option value="Borderline">Borderline</option>
            <option value="High">High</option>
          </select>
        </div>
      </FieldRow>

      <SectionHeader title="LIFESTYLE" />
      <FieldRow label="Heart Rate:">
        <div className="relative w-full">
          <input type="number" name="heartRate" value={formData.heartRate || 72} onChange={handleChange} required className={InputClass} />
          <span className="absolute right-2 top-1.5 text-[10px] text-gray-400 font-bold">bpm</span>
        </div>
      </FieldRow>
      <FieldRow label="Smoking:">
        <select name="smoker" value={formData.smoker} onChange={handleChange} className={SelectClass}>
          <option value="No">No</option>
          <option value="Previous">Previous</option>
          <option value="Yes">Yes</option>
        </select>
      </FieldRow>
      <FieldRow label="Activity Level:">
        <select name="active" value={formData.active} onChange={handleChange} className={SelectClass}>
          <option value="No">Low</option>
          <option value="Yes">Moderate / High</option>
        </select>
      </FieldRow>

      {/* SHAP Chart Placeholder matching image */}
      <div className="mt-6 mb-4">
        <h3 className="text-[11px] font-black text-gray-900 tracking-tight mb-2">
          Input Feature Importance (SHAP Analysis)
        </h3>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><span className="w-16 text-[9px] text-right text-gray-500 font-bold">Glucose</span><div className="h-2.5 bg-[#E11D48] rounded-r" style={{width: '90%'}}></div></div>
          <div className="flex items-center gap-2"><span className="w-16 text-[9px] text-right text-gray-500 font-bold">BP</span><div className="h-2.5 bg-[#D946EF] rounded-r" style={{width: '50%'}}></div></div>
          <div className="flex items-center gap-2"><span className="w-16 text-[9px] text-right text-gray-500 font-bold">Cholesterol</span><div className="h-2.5 bg-[#EC4899] rounded-r" style={{width: '30%'}}></div></div>
          <div className="flex items-center gap-2"><span className="w-16 text-[9px] text-right text-gray-500 font-bold">Age</span><div className="h-2.5 bg-[#8B5CF6] rounded-r" style={{width: '20%'}}></div></div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[13px] py-2.5 rounded shadow-md transition-colors uppercase tracking-widest mt-2 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Predict Multi-Risk'}
      </button>
    </form>
  );
};

export const PatientForm: FC<PatientFormProps> = (props) => {
  return (
    <PatientFormProvider>
      <PatientFormContent {...props} />
    </PatientFormProvider>
  );
};
