import * as React from 'react';
import { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Grid,
} from "@mui/material";

import { People } from '@mui/icons-material';
import { customers } from "../slices/authSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { Link } from "react-router-dom";



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'First name', width: 130 },
  { field: 'last_name', headerName: 'Last name', width: 130 },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    width: 130,
  },
  {
    field: 'phone_number',
    headerName: 'Phone Number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    
  },
];

export default function CustomerList() {

  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      dispatch(
        customers()
      ).unwrap().then((response) => { setData(response);console.info(">>>>>", response)});
    } catch (e) {
      console.error("catched error",  e);
    }
  }, []);

  
  
  return (
    <>
    <Container maxWidth="lg">
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
          <Box sx={{ mt: 1 }}></Box>
    
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />

    </Box>

    <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register">Add Customer</Link>
              </Grid>
            </Grid>
        
      </Container>
      </>
  );
}
