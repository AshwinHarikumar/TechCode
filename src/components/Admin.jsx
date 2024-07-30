import React from 'react';
import { Button, Box, Typography, Container, Paper, Grid } from '@mui/material';

const Admin = () => {
  return (
    <Container sx={{ marginTop: 1}}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Admin Dashboard
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="primary" fullWidth>
              Manage Users
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="secondary" fullWidth>
              Manage Books
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="success" fullWidth>
              Manage Programs
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="warning" fullWidth>
              Manage Notes
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="error" fullWidth>
              Manage Tech news
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Admin;
