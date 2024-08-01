import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Dialog, DialogTitle, DialogContent, CircularProgress, Alert, Divider } from '@mui/material';
import axios from 'axios';
import Navbar from './NavBar';

const CMenu = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/c-programs'); // Replace with your API endpoint
                setPrograms(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleCardClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/c-programs/${id}`);
            setSelectedProgram(response.data);
            setDialogOpen(true);
        } catch (err) {
            setError(err);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedProgram(null);
    };

    if (loading) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Alert severity="error">Error loading programs: {error.message}</Alert>
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {programs.map((program) => (
                        <Card 
                            key={program._id} 
                            sx={{ 
                                maxWidth: 300, 
                                marginBottom: 2, 
                                cursor: 'pointer', 
                                textAlign: 'center', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center',
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                },
                            }} 
                            onClick={() => handleCardClick(program._id)}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {program.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {program.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                {selectedProgram && (
                    <Dialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        maxWidth="md"
                        fullWidth
                        sx={{ 
                            '& .MuiPaper-root': {
                                borderRadius: 3, 
                                padding: 2,
                                boxShadow: 24,
                            },
                            '& .MuiDialogTitle-root': {
                                backgroundColor: '#1976d2',
                                color: 'white',
                            },
                            '& .MuiDialogContent-root': {
                                padding: 2,
                            }
                        }}
                    >
                        <DialogTitle>
                            <Typography variant="h6">{selectedProgram.title}</Typography>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                                {selectedProgram.description}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
                                <strong>Code:</strong> {selectedProgram.code}
                            </Typography>
                            <Divider sx={{ mb: 2, mt: 2 }} />
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', backgroundColor: '#e8f5e9', padding: 2, borderRadius: 1 }}>
                                <strong>Algorithm:</strong> {selectedProgram.algorithm}
                            </Typography>
                        </DialogContent>
                    </Dialog>
                )}
            </Box>
        </>
    );
};

export default CMenu;
