import React from 'react';
import { Typography, Grid, Paper, Container } from '@mui/material';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="root">
      <Container maxWidth="md">
        <Paper className="styledPaper">
          <Typography variant="h4" gutterBottom className="styledTypography">
            Welcome to TechCodeHub
          </Typography>
          <Typography variant="body1" gutterBottom className="styledTypography">
            Your go-to place for the latest tech tutorials, code snippets, and tech news. Whether you are a beginner or an experienced developer, we have something for everyone.
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: '2rem' }}>
            <Grid item xs={12} sm={6}>
              <div className="gridItem">
                <Typography variant="h6" className="styledTypography">Latest Tutorials</Typography>
                <Typography variant="body2" className="styledTypography">
                  Check out our latest tutorials on web development, data science, and more.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="gridItem">
                <Typography variant="h6" className="styledTypography">Code Snippets</Typography>
                <Typography variant="body2" className="styledTypography">
                  Find and share code snippets to help you build your next project faster.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="gridItem">
                <Typography variant="h6" className="styledTypography">Tech News</Typography>
                <Typography variant="body2" className="styledTypography">
                  Stay updated with the latest tech news and trends from around the world.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default HomePage;
