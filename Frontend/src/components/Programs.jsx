import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';

const Programs = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleButtonClick = (language) => {
    setSelectedLanguage(language);
    // Add additional logic for button click if needed
  };

  return (
    <Box
      sx={{
        position: 'fixed', // Fix the position to the viewport
        top: 65,
        left: 0,
        width: '250px', // Adjust the width as needed
        height: '100vh', // Full viewport height
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparent black background
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center contents horizontally
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.9)', // Subtle shadow for separation
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
        Select Language
      </Typography>
      <Button
        onClick={() => handleButtonClick('C')}
        sx={{
          width: '100%', // Full width of the sidebar
          backgroundColor: selectedLanguage === 'C' ? 'rgba(255, 255, 255, 0.2)' : 'transparent', // Highlight background if selected
          color: selectedLanguage === 'C' ? 'black' : 'white', // Change text color if selected
          border: '1px solid white', // White border
          borderRadius: 1, // Rounded corners
          padding: '8px', // Padding for button
          marginBottom: 1, // Space between buttons
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly visible background on hover
            borderColor: 'white', // Border color on hover
          },
        }}
      >
        C
      </Button>
      <Button
        onClick={() => handleButtonClick('Python')}
        sx={{
          width: '100%', // Full width of the sidebar
          backgroundColor: selectedLanguage === 'Python' ? 'rgba(255, 255, 255, 0.2)' : 'transparent', // Highlight background if selected
          color: selectedLanguage === 'Python' ? 'black' : 'white', // Change text color if selected
          border: '1px solid white', // White border
          borderRadius: 1, // Rounded corners
          padding: '8px', // Padding for button
          marginBottom: 1, // Space between buttons
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly visible background on hover
            borderColor: 'white', // Border color on hover
          },
        }}
      >
        Python
      </Button>
      <Button
        onClick={() => handleButtonClick('JavaScript')}
        sx={{
          width: '100%', // Full width of the sidebar
          backgroundColor: selectedLanguage === 'JavaScript' ? 'rgba(255, 255, 255, 0.2)' : 'transparent', // Highlight background if selected
          color: selectedLanguage === 'JavaScript' ? 'black' : 'white', // Change text color if selected
          border: '1px solid white', // White border
          borderRadius: 1, // Rounded corners
          padding: '8px', // Padding for button
          marginBottom: 1, // Space between buttons
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly visible background on hover
            borderColor: 'white', // Border color on hover
          },
        }}
      >
        JavaScript
      </Button>
    </Box>
  );
};

export default Programs;
