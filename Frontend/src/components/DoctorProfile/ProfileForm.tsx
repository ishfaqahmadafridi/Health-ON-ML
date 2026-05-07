import type { FC } from 'react';
import { AvatarUpload } from './AvatarUpload';
import { EditableField } from './EditableField';
import { SpecialtySelector } from './SpecialtySelector';
import { ActionButtons } from './ActionButtons';
import type { Doctor } from '../../types';

interface ProfileFormProps {
  formData: Doctor;
  setFormData: (data: Doctor) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = ({ 
  formData, 
  setFormData, 
  onSave, 
  onCancel 
}) => {
  const isNew = formData.id.startsWith('doc-');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
      <AvatarUpload 
        image={formData.image} 
        onImageChange={(dataUrl) => setFormData({ ...formData, image: dataUrl })} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <EditableField 
          label="Full Name" 
          name="name" 
          value={formData.name} 
          placeholder="e.g., Dr. Jane Smith" 
          onChange={handleChange} 
        />
        <EditableField 
          label="Email Address" 
          name="email" 
          type="email" 
          value={formData.email} 
          placeholder="e.g., jane.smith@hospital.org" 
          onChange={handleChange} 
        />
        <EditableField 
          label="Professional Role" 
          name="role" 
          value={formData.role} 
          placeholder="e.g., Senior Consultant" 
          onChange={handleChange} 
        />
      </div>

      <SpecialtySelector 
        value={formData.specialty || ''} 
        onChange={(val) => setFormData({ ...formData, specialty: val })} 
      />

      <ActionButtons 
        onSave={onSave} 
        onCancel={onCancel} 
        isNew={isNew} 
      />
    </div>
  );
};
