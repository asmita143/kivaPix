import React, { useState } from "react";

type FileUploadProps = {
  onFileChange: (file: File | null) => void; // Callback function to pass the selected file back to the parent
};

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileChange(file);

      // Create a temporary URL to display the image preview
      const imageUrl = URL.createObjectURL(file);
      setCoverPhotoUrl(imageUrl);
    }
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="coverPhoto"
        className="block text-sm font-medium text-gray-900"
      >
        Cover photo
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <div className="mt-4 flex text-sm text-gray-600">
            <label
              htmlFor="coverPhoto"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="coverPhoto"
                name="coverPhoto"
                type="file"
                onChange={handleCoverPhotoChange}
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {/* Show the uploaded image preview */}
      {coverPhotoUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            Cover Photo Preview:
          </h3>
          <img
            src={coverPhotoUrl}
            alt="Cover"
            className="mt-2 max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
