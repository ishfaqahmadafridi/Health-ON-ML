export interface Doctor {
  id: string;
  name: string;
  email: string;
  role: string;
  specialty?: string;
  image: string | null; // base64 string
}

export interface DoctorState {
  doctors: Doctor[];
  currentDoctorId: string | null;
}
