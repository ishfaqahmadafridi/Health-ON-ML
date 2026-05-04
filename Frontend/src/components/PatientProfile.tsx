import type { PatientInput } from '../types';

interface PatientProfileProps {
  data: PatientInput | null;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="patient-profile">
        <h2>Patient Profile & Input Data</h2>
        <p className="no-data">No patient data loaded</p>
      </div>
    );
  }

  const calculateBMI = (weight: number, height: number) => {
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  const bmi = calculateBMI(data.weight, data.height);

  return (
    <div className="patient-profile">
      <h2>Patient Profile & Input Data</h2>

      <div className="profile-section">
        <h3>Personal Information</h3>
        <div className="profile-field">
          <label>Patient ID:</label>
          <span>P-10234</span>
        </div>
        <div className="profile-field">
          <label>Name:</label>
          <span>{data.gender === 'male' ? 'John' : 'Emily'} {data.age > 50 ? 'Smith' : 'Chen'}</span>
        </div>
        <div className="profile-field">
          <label>Age:</label>
          <span>{data.age}</span>
        </div>
        <div className="profile-field">
          <label>Gender:</label>
          <span className="capitalize">{data.gender}</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Biometrics</h3>
        <div className="profile-field">
          <label>Weight:</label>
          <span>{data.weight} kg</span>
        </div>
        <div className="profile-field">
          <label>Height:</label>
          <span>{data.height} cm</span>
        </div>
        <div className="profile-field">
          <label>BMI:</label>
          <span>
            {bmi}
            <span className="bmi-category">
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

      <div className="profile-section">
        <h3>Vital Signs</h3>
        <div className="profile-field">
          <label>Blood Pressure:</label>
          <span>{data.bloodPressureSystolic}/{data.bloodPressureDiastolic} mmHg</span>
        </div>
        <div className="profile-field">
          <label>Glucose Level:</label>
          <span>{data.glucoseLevel} mg/dL (Fasting)</span>
        </div>
        <div className="profile-field">
          <label>Cholesterol:</label>
          <span>{data.cholesterol} mg/dL</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Lifestyle</h3>
        <div className="profile-field">
          <label>Heart Rate:</label>
          <span>{data.heartRate} bpm</span>
        </div>
        <div className="profile-field">
          <label>Smoking:</label>
          <span className="capitalize">{data.smokingStatus}</span>
        </div>
        <div className="profile-field">
          <label>Activity Level:</label>
          <span className="capitalize">{data.physicalActivityLevel}</span>
        </div>
      </div>

      <div className="profile-importance">
        <h4>Input Feature Importance (SHAP Analysis)</h4>
        <div className="importance-bars">
          <div className="importance-item">
            <span>Glucose</span>
            <div className="importance-bar">
              <div className="importance-fill" style={{ width: '95%', backgroundColor: '#FF6B6B' }}></div>
            </div>
          </div>
          <div className="importance-item">
            <span>BP</span>
            <div className="importance-bar">
              <div className="importance-fill" style={{ width: '78%', backgroundColor: '#FDB913' }}></div>
            </div>
          </div>
          <div className="importance-item">
            <span>Cholesterol</span>
            <div className="importance-bar">
              <div className="importance-fill" style={{ width: '65%', backgroundColor: '#4A90E2' }}></div>
            </div>
          </div>
          <div className="importance-item">
            <span>Age</span>
            <div className="importance-bar">
              <div className="importance-fill" style={{ width: '58%', backgroundColor: '#50C878' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
