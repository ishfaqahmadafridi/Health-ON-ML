/**
 * Compresses an image data URL using a canvas to reduce its size for storage.
 */
export const compressImage = (
  dataUrl: string,
  maxWidth: number = 256,
  maxHeight: number = 256,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = (err) => reject(err);
    img.src = dataUrl;
  });
};

/**
 * Handles the file input change event for image uploads.
 */
export const handleImageUploadHelper = async (
  file: File,
  onComplete: (dataUrl: string) => void
) => {
  const reader = new FileReader();
  reader.onloadend = async () => {
    try {
      const compressed = await compressImage(reader.result as string);
      onComplete(compressed);
    } catch (error) {
      console.error('Image compression failed:', error);
    }
  };
  reader.readAsDataURL(file);
};
