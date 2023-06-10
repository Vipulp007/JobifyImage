import { useState } from 'react';
import axios from 'axios';
const ImageUploads = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      console.log('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/image',
        formData
      );
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploads;
