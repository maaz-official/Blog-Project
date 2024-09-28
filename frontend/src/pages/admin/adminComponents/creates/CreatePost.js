import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, Typography, FormControl, InputLabel, Grid, IconButton, useMediaQuery } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import QuillEditor from '../../quill/QuillEditor';  // Import the QuillEditor component
import AdminLayout from '../../layout/AdminLayout';  // Import the AdminLayout

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');  // Content managed via QuillEditor
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);  // Image upload
  const [imageError, setImageError] = useState(false);  // Main image validation error

  const isMobile = useMediaQuery('(max-width:600px)');

  // Sample data for categories, tags, and authors
  const availableCategories = ['Tech', 'Lifestyle', 'Business', 'Health', 'Education'];
  const availableTags = ['React', 'JavaScript', 'Web Development', 'SEO', 'Programming'];
  const availableAuthors = ['John Doe', 'Jane Smith', 'Alex Johnson'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      setImageError(true);
      return;
    }

    const postData = {
      title,
      category,
      tags,
      content,
      seoTitle,
      seoDescription,
      author,
      uploadedImage,
    };
    console.log('Post Data:', postData);
    // Perform API call here
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setImageError(false); // Reset error on successful image upload
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout> {/* Wrap CreatePost inside AdminLayout */}
      <Box
        p={isMobile ? 2 : 4}
        maxWidth="900px"
        mx="auto"
        sx={{
          borderRadius: '12px',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          fontWeight="bold"
          mb={isMobile ? 3 : 4}
          sx={{ color: '#1976D2', textAlign: 'center' }}
        >
          Create a New Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 2, '& .MuiInputLabel-root': { color: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#1976D2' }}>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  required
                  sx={{ mb: 2 }}
                >
                  {availableCategories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#1976D2' }}>Tags</InputLabel>
                <Select
                  multiple
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  label="Tags"
                  sx={{ mb: 2 }}
                >
                  {availableTags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Post Author */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#1976D2' }}>Author</InputLabel>
                <Select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  label="Author"
                  required
                  sx={{ mb: 2 }}
                >
                  {availableAuthors.map((author, index) => (
                    <MenuItem key={index} value={author}>
                      {author}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* SEO Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SEO Title"
                variant="outlined"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                sx={{ mb: 2 }}
                helperText={`${seoTitle.length} / 60 characters`}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SEO Description"
                variant="outlined"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                multiline
                rows={2}
                sx={{ mb: 2 }}
                helperText={`${seoDescription.length} / 160 characters`}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12} md={6}>
              <Typography>Upload Main Image (Required)</Typography>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                <PhotoCamera />
              </IconButton>
              {uploadedImage && (
                <Box mt={2}>
                  <img src={uploadedImage} alt="Preview" style={{ width: '100%', maxHeight: '200px', borderRadius: '5px' }} />
                </Box>
              )}
              {imageError && (
                <Typography color="error" variant="caption">
                  Please upload a main image for the post.
                </Typography>
              )}
            </Grid>

            {/* QuillEditor Integration */}
            <Box
              mb={4}
              sx={{
                borderRadius: '16px',
                padding: isMobile ? 2 : 4,
                border: '1px solid #e0e0e0',
                width: '100%',
              }}
            >
              <QuillEditor 
                value={content} 
                onChange={(value) => setContent(value)}  // Pass content state to QuillEditor
              />
            </Box>
          </Grid>

          {/* Submit and Preview Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ py: 1.5, '&:hover': { backgroundColor: '#f5f5f5' } }}
              >
                Preview Post
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  backgroundColor: '#1976D2',
                  '&:hover': {
                    backgroundColor: '#1565C0',
                  },
                }}
              >
                Create Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AdminLayout>  // Close AdminLayout here
  );
};

export default CreatePost;
