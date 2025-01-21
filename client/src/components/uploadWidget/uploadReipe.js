import React, { useEffect, useRef } from 'react';

const UploadRecipe = ({ uwConfig, setPhoto }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    if (!window.cloudinary || !uploadButtonRef.current) return;

    // Initialize the upload widget
    uploadWidgetRef.current = window.cloudinary.createUploadWidget(
      { ...uwConfig },
      (error, result) => {
        if (!error && result.event === 'success') {
          console.log('Upload successful:', result.info);

          // Update state with the new image URL
          setPhoto(result.info.secure_url);
        } else if (error) {
          console.error('Upload error:', error);
        }
      }
    );

    const handleUploadClick = () => {
      if (uploadWidgetRef.current) {
        uploadWidgetRef.current.open();
      }
    };

    const buttonElement = uploadButtonRef.current;
    buttonElement.addEventListener('click', handleUploadClick);

    // Cleanup event listener
    return () => {
      buttonElement.removeEventListener('click', handleUploadClick);
    };
  }, [uwConfig, setPhoto]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload Image
    </button>
  );
};

export default UploadRecipe;
