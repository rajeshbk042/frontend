import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { People } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { register } from "../slices/authSlice";

import { logout } from "../slices/authSlice";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import {
  showNotification,
  NotificationType,
  hideNotification,
} from "../slices/notificationSlice";
import dayjs, { Dayjs } from 'dayjs';



const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone_number, setPhoneNum] = useState("");

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (first_name && last_name && dob && phone_number) {

      try {
        await dispatch(
          register({
            first_name,
            last_name,
            dob,
            phone_number
          })
        ).unwrap()
        .then((response) => {
      
          setFirstName("");
          setLastName("");
          // setDob(dayjs());
          setPhoneNum("");

          dispatch(
            showNotification({
              message: "Customer added successfully",
              type: NotificationType.Success,
            })
          );
        
        });

      } catch (e) {
        console.error(e);
        dispatch(
          showNotification({
            message: e.message + ". Please logout and try login again",
            type: NotificationType.Error,
          })
        );
      }
    } else {
      // Show an error message.
      dispatch(
        showNotification({
          message: "Please fill out all the required fields",
          type: NotificationType.Error,
        })
      );
    }
  };


  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <People />
          </Avatar>
          <Typography variant="h5">Add Customer</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>


              <Grid item xs={12}>
                <TextField
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="last_name"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  autoFocus
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100% " }}
                    label="Date of Birth *"
                    required
                    fullWidth
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={(selectedDate) => {
                      const dateString = dayjs(new Date(selectedDate)).format('DD/MM/YYYY')
                      setDob(dateString)
                    }}
                  />
                </LocalizationProvider>
              </Grid>


              <Grid item xs={12}>
                <PhoneInput
                  sx={{ width: "100px" }} specialLabel="Phone Number *"
                  country={'us'}
                  required
                  fullWidth
                  id="phone_number"
                  name="phone_number"
                  value={phone_number}
                  onChange={(phone_number) => {
                    console.log(phone_number)
                    setPhoneNum(phone_number)
                  }}
                  inputProps={{ classes: 'MuiTextField-root' }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Submit
            </Button>

            <Grid container justifyContent="flex-end">

              <Grid item>
                <Link to="/customer-list">View  Customers</Link>
              </Grid>

            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleLogout} to="/">Logout</Link>
              </Grid>
            </Grid>


          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;