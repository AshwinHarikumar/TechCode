import React from 'react';
import { Typography, Grid, Container, Box, IconButton } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import './HomePage.css';
import '@fontsource/poppins'; // Importing Poppins font
import '@fontsource/raleway'; // Importing Raleway font

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const items = [
    { title: 'E-Books', icon: <BookIcon fontSize="large" />, link: '/books' },
    { title: 'Code Snippets', icon: <CodeIcon fontSize="large" />, link: '/programs' },
    { title: 'Tech News', icon: <NewspaperIcon fontSize="large" />, link: '/technews' }
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '4rem' }}>
      <Box
        sx={{
          textAlign: 'center',
          position: 'relative',
          ...(isMobile && {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1531498660131-423fbd68ea52)', // Updated image URL
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.5,
              zIndex: -1
            }
          })
        }}
      >
        <Typography
          variant="h3"
          className="styledTitle"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.3rem', md: '2.8rem' },
            paddingX: { xs: '1rem', sm: '2rem' },
            marginBottom: '1rem',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Poppins, sans-serif',
            color: isMobile ? '#fff' : '#000',
            zIndex: 1
          }}
        >
          Welcome to TechCodeHub
        </Typography>
        <Typography
          variant="h6"
          className="styledDescription"
          sx={{
            margin: 'auto',
            maxWidth: { xs: '100%', sm: '80%', md: '70%' },
            marginTop: '0.5rem',
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
            paddingX: { xs: '1rem', sm: '2rem' },
            color: isMobile ? '#fff' : '#555',
            lineHeight: '1.6',
            letterSpacing: '0.5px',
            fontFamily: 'Raleway, sans-serif',
            zIndex: 1
          }}
        >
          Discover curated E-Books, Code Snippets, and Tech News to support your learning journey.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: '3rem' }}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{ 
                textAlign: 'center', 
                padding: '1rem',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                ...(isMobile && {
                  padding: '1rem',
                  // Hide description on mobile
                  '& .description': { display: 'none' }
                })
              }}
            >
              <IconButton
                sx={{ 
                  fontSize: '4rem', 
                  color: '#333', 
                  marginBottom: '0.5rem', 
                  borderRadius: '50%', 
                  backgroundColor: '#f0f0f0', 
                  padding: '1rem',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px -2px 4px rgba(255, 255, 255, 0.5)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3), inset 0px -2px 8px rgba(255, 255, 255, 0.5)'
                  }
                }}  
                onClick={() => window.location.href = item.link}
              >
                {item.icon}
              </IconButton>
              <Typography
                variant="body1"
                sx={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem', 
                  color: '#333',  
                  fontFamily: 'Poppins, sans-serif' 
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
