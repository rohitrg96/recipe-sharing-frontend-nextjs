import React, { useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/services/uploadImageService';
import { toast } from 'react-toastify';
import { getAuthToken } from '@/utils/getAuthToken';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Track the selected file
  const [isUploading, setIsUploading] = useState(false); // Track upload state

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file); // Save the selected file
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true); // Start upload process
    try {
      const token = getAuthToken(false, null);
      const response = await uploadImage(selectedFile, token); // Call the upload API
      const imageUrl = response.data.url;
      setImagePreview(imageUrl); // Update the preview
      setFieldValue('image', imageUrl); // Set the form field value
    } catch (error: any) {
      console.error('Image upload failed:', error);
      toast.error(error.response.data?.message);
    } finally {
      setIsUploading(false); // End upload process
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium">Recipe Image</label>
      {imagePreview && (
        <div className="mb-2">
          <Image
            src={imagePreview || '/placeholder-image.jpg'}
            alt="Recipe Preview"
            width={30}
            height={30}
            className="object-cover rounded-md"
          />
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              setFieldValue('image', ''); // Clear the form field
              setSelectedFile(null);
            }}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}
      <div className="flex items-center space-x-4 mt-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {selectedFile && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className={`py-2 px-4 rounded-md text-white ${
              isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
