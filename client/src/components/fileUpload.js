import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!selectedFile) {
      swal('Please select a file to upload.');
      return;
    }

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
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h2' gutterBottom>
          File Upload
        </Typography>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} sm={6}>
                <input
                  type='file'
                  onChange={handleFileChange}
                  required
                  style={{ display: 'none' }}
                  id='fileInput'
                />
                <label htmlFor='fileInput'>
                  <Button
                    variant='outlined'
                    color='primary'
                    component='span'
                    startIcon={<CloudUploadIcon />}
                  >
                    Select File
                  </Button>
                </label>
                {!selectedFile && (
                  <Typography variant='caption' color='error'>
                    File upload is required.
                  </Typography>
                )}
                {selectedFile && (
                  <div>
                    <Typography variant='body1'>
                      <strong>Name:</strong> {selectedFile.name}
                    </Typography>
                    <Typography variant='body1'>
                      <strong>Size:</strong> {selectedFile.size} bytes
                    </Typography>
                    <Typography variant='body1'>
                      <strong>Last Modified:</strong>{' '}
                      {selectedFile.lastModifiedDate.toLocaleString()}
                    </Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Upload;

// No styling

// import React, { useState } from 'react';
// import axios from 'axios';
// import swal from 'sweetalert';

// const Upload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = event => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async event => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/upload',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       swal(`${response.data.message}`);

//       console.log(response.data.message); // Handle the response from the server
//     } catch (error) {
//       swal(`${error.response.data.message}`);

//       console.error(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       <form onSubmit={handleSubmit}>
//         <input type='file' onChange={handleFileChange} required />
//         <button type='submit'>Upload</button>
//       </form>
//     </div>
//   );
// };

// export default Upload;
