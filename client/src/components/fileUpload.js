import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      swal(`${response.data.message}`);

      console.log(response.data.message); // Handle the response from the server
    } catch (error) {
      swal(`${error.response.data.message}`);

      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} required />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
};

export default Upload;
