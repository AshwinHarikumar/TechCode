import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Programs = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = (language) => {
        setSelectedLanguage(language);
        switch (language) {
            case 'C':
                navigate('/c');
                break;
            case 'Python':
                navigate('/python');
                break;
            case 'JAVA':
                navigate('/java');
                break;
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 65,
                left: 0,
                width: '250px',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.9)',
                zIndex: 1000,
            }}
        >
            <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
                Select Language
            </Typography>
            <Button
                onClick={() => handleButtonClick('C')}
                sx={{
                    width: '100%',
                    backgroundColor: selectedLanguage === 'C' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: selectedLanguage === 'C' ? 'black' : 'white',
                    border: '1px solid white',
                    borderRadius: 1,
                    padding: '8px',
                    marginBottom: 1,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                    },
                }}
            >
                C
            </Button>
            <Button
                onClick={() => handleButtonClick('Python')}
                sx={{
                    width: '100%',
                    backgroundColor: selectedLanguage === 'Python' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: selectedLanguage === 'Python' ? 'black' : 'white',
                    border: '1px solid white',
                    borderRadius: 1,
                    padding: '8px',
                    marginBottom: 1,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                    },
                }}
            >
                Python
            </Button>
            <Button
                onClick={() => handleButtonClick('JAVA')}
                sx={{
                    width: '100%',
                    backgroundColor: selectedLanguage === 'JAVA' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: selectedLanguage === 'JAVA' ? 'black' : 'white',
                    border: '1px solid white',
                    borderRadius: 1,
                    padding: '8px',
                    marginBottom: 1,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                    },
                }}
            >
                JAVA
            </Button>
        </Box>
    );
};

export default Programs;
