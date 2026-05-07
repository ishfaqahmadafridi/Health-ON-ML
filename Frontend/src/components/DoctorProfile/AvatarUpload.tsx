import { useRef, type FC } from 'react';
import { Camera } from 'lucide-react';
import { handleImageUploadHelper } from '../../utils/image';

interface AvatarUploadProps {
  image: string | null;
  onImageChange: (dataUrl: string) => void;
}

export const AvatarUpload: FC<AvatarUploadProps> = ({ image, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUploadHelper(file, onImageChange);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div 
        className="relative w-32 h-32 rounded-[32px] overflow-hidden group cursor-pointer shadow-xl transition-all hover:scale-105 active:scale-95"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          {image ? (
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-10 h-10 text-gray-300" />
          )}
        </div>
        
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Change Photo</span>
        </div>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleChange} 
      />
      
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
        Professional Photo Required
      </p>
    </div>
  );
};
