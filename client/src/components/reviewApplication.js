import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';
import { MenuItem } from '@mui/material';

const theme = createTheme();

export default function ReviewApplication() {
  const [loginData, setLoginData] = useState({
    name: '',
    issued_by: '',
    application_status: '',
  });

  const { name, issued_by, application_status } = loginData; //const destructiong for accessing loginData.entry_point etc

  const onInputChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // let navigate = useNavigate();

  const [buttonColor, setButtonColor] = useState('blue');
  const [buttonText, setButtonText] = useState('Generate PDF');

  const handleSubmit = async event => {
    event.preventDefault();
    setButtonColor('red');
    setButtonText('Download Again');
    try {
      axios({
        url: 'http://localhost:5000/api/generatePdf', // Replace with your backend URL
        
        method: 'POST',
        responseType: 'blob', // Use 'blob' to receive binary data
        data: loginData,
      }).then(response => {
        const fileName = response.headers['content-deposition'];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Specify the filename
        document.body.appendChild(link);
        link.click();
        // swal('PDF Generated Succesfully');
      });
    } catch (error) {
      swal('Something went wrong try again');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Application Remarks
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Applicant Name'
              name='name'
              value={name}
              onChange={e => onInputChange(e)}
              autoComplete='Name'
              autoFocus
            />

            <Grid item>
              <TextField
                margin='normal'
                required
                fullWidth
                id='issued_by'
                label='Issued by'
                name='issued_by'
                value={issued_by}
                onChange={e => onInputChange(e)}
                autoComplete='issued_by'
                autoFocus
                select
              >
                <MenuItem value='Chairman'>Chairman</MenuItem>
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                label='Application Status'
                fullWidth
                name='application_status'
                value={application_status}
                onChange={e => onInputChange(e)}
                required
                select
              >
                <MenuItem value='accepted'>Accepted</MenuItem>
                <MenuItem value='rejected'>Rejected</MenuItem>
              </TextField>
            </Grid>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: buttonColor }}
              disabled={
                name.trim() === '' ||
                issued_by.trim() === '' ||
                application_status.trim() === ''
              }
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
