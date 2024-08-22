import './ManageBook.css'; 
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar2 from './NavBar2';

const ManageBooks = () => {
  // State and effect hooks
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [image, setImage] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Handlers for dialog opening and closing
  const handleClickOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    // Reset form fields
    setTitle('');
    setDescription('');
    setGoogleDriveLink('');
    setImage('');
  };
  const handleClickOpenEdit = (document) => {
    setCurrentDocument(document);
    setTitle(document.title);
    setDescription(document.description);
    setGoogleDriveLink(document.googleDriveLink);
    setImage(document.image);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    // Reset form fields
    setTitle('');
    setDescription('');
    setGoogleDriveLink('');
    setImage('');
    setCurrentDocument(null);
  };

  // Handlers for form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/documents', {
        title,
        description,
        googleDriveLink,
        image,
      });
      console.log(response.data);
      handleCloseAdd();
      // Refetch documents
      const updatedResponse = await axios.get('http://localhost:3000/api/documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || 'An error occurred');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/documents/${currentDocument._id}`, {
        title,
        description,
        googleDriveLink,
        image,
      });
      console.log(response.data);
      handleCloseEdit();
      // Refetch documents
      const updatedResponse = await axios.get('http://localhost:3000/api/documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || 'An error occurred');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/documents/${id}`);
      // Remove deleted document from state
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };

  return (
    <div className="manage-books-container">
      <Navbar2 onAddClick={handleClickOpenAdd} />

      {/* Add Document Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
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
              <Button onClick={handleCloseAdd} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Document Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
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
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <List className="manage-books-list">
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          documents.map((document) => (
            <ListItem
              key={document._id}
              className="manage-books-list-item"
            >
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={document.image || 'https://via.placeholder.com/300'}
                  alt={document.title}
                  className="manage-books-list-item-avatar"
                />
              </ListItemAvatar>
              <ListItemText
                primary={document.title}
                secondary={document.description}
              />
              <div className="manage-books-list-item-buttons">
                <Button
                  size="small"
                  color="primary"
                  href={document.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickOpenEdit(document)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(document._id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </div>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default ManageBooks;
