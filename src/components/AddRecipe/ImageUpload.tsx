import React from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  setFieldValue: (field: string, value: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  setImagePreview,
  setFieldValue,
}) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Call your image upload API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.data.url;

      setImagePreview(imageUrl);
      setFieldValue('image', imageUrl);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium">Recipe Image</label>
      {imagePreview && (
        <div className="mb-2">
          <Image
            src={imagePreview || '/placeholder-image.jpg'} // Provide a placeholder if no preview is available
            alt="Recipe Preview"
            width={160} // Matches the w-40 in Tailwind (40 x 4 = 160px)
            height={160} // Matches the h-40 in Tailwind
            className="object-cover rounded-md"
          />
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              setFieldValue('image', '');
            }}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ImageUpload;
