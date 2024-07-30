import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const Books = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [image, setImage] = useState('');
  const [documents, setDocuments] = useState([]);

  // Fetch documents from the API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/documents/add-google-drive-link', {
        title,
        description,
        googleDriveLink,
        image,
      });
      console.log(response.data);
      handleClose();
      // Refetch documents after adding a new one
      const updatedResponse = await axios.get('http://localhost:3001/api/documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ position: 'fixed', bottom: 30, right: 16 }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: 'rgba(0,0,0,0.8)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' } }}
          onClick={handleClickOpen}
          endIcon={<AddIcon />}
        >
          Add Your Contribution
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Google Drive Link"
              type="url"
              fullWidth
              variant="outlined"
              value={googleDriveLink}
              onChange={(e) => setGoogleDriveLink(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Image URL"
              type="url"
              fullWidth
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          padding: 2,
          marginTop: '80px', // Adjust margin to place below the navbar
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3, // Space between cards
          justifyContent: 'flex-start'
        }}
      >
        {documents.map((document) => (
          <Card 
            key={document._id}
            sx={{ 
              backgroundColor: 'transparent', 
              position: 'relative', 
              maxWidth: 240, 
              margin: 2, 
              transition: 'transform 0.2s ease-in-out', // Add transition
              '&:hover': {
                transform: 'scale(1.05)', // Add hover effect
              } 
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={document.image || 'https://via.placeholder.com/300'}
              alt="Document"
              sx={{ width: '100%', height: '45vh' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {document.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {document.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={document.googleDriveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Books;
