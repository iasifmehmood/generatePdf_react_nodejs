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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';
import { MenuItem } from '@mui/material';

const theme = createTheme();

export default function SignIn() {
  const [loginData, setLoginData] = useState({
    name: '',
    issued_by: '',
    application_status: '',
  });

  const { name, issued_by, application_status } = loginData; //const destructiong for accessing loginData.entry_point etc

  const onInputChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let response = await axios.post(
        'http://localhost:4000/api/generatePdf',
        loginData
      ); //, logIn
      swal(response.data.message);
      navigate('/');
    } catch (error) {
      swal(error.response.data.message);
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
            sx={{ mt: 1 }}
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
              sx={{ mt: 3, mb: 2 }}
            >
              Generate PDF
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}