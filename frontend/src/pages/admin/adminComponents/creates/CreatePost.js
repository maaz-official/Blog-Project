import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Select, MenuItem, Typography, FormControl, InputLabel, Grid, IconButton, Stack, useMediaQuery } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Import highlight.js theme
import { PhotoCamera, UploadFile } from '@mui/icons-material';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [status, setStatus] = useState('draft'); // For post status
  const [summary, setSummary] = useState(''); // Optional summary
  const [author, setAuthor] = useState(''); // For selecting the author
  const [wordCount, setWordCount] = useState(0); // Word counter for content
  const [uploadedImage, setUploadedImage] = useState(null); // For image upload
  const [uploadedFile, setUploadedFile] = useState(null); // For file upload
  const [imageError, setImageError] = useState(false); // For main image validation

  const isMobile = useMediaQuery('(max-width:600px)');

  // Sample data for categories, tags, and authors
  const availableCategories = ['Tech', 'Lifestyle', 'Business', 'Health', 'Education'];
  const availableTags = ['React', 'JavaScript', 'Web Development', 'SEO', 'Programming'];
  const availableAuthors = ['John Doe', 'Jane Smith', 'Alex Johnson'];

  // Syntax highlighting setup for code blocks
  useEffect(() => {
    hljs.configure({
      languages: ['javascript', 'html', 'css', 'python', 'bash', 'json'],
    });
  }, []);

  // Handle content change and word count
  const handleContentChange = (value) => {
    setContent(value);
    setWordCount(value.replace(/<(.|\n)*?>/g, '').split(/\s+/).filter((word) => word.length > 0).length);
  };

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
      status,
      summary,
      author,
      uploadedImage,
      uploadedFile,
    };
    console.log('Post Data:', postData);
    // Perform API call here
  };

  // Handle post preview
  const handlePreview = () => {
    if (!uploadedImage) {
      setImageError(true);
      return;
    }
    const postPreviewData = {
      title,
      category,
      tags,
      content,
      seoTitle,
      seoDescription,
      summary,
      author,
      status: 'Preview',
    };
    console.log('Preview Data:', postPreviewData);
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  // Reset form
  const handleReset = () => {
    setTitle('');
    setCategory('');
    setTags([]);
    setContent('');
    setSeoTitle('');
    setSeoDescription('');
    setStatus('draft');
    setSummary('');
    setAuthor('');
    setUploadedImage(null);
    setUploadedFile(null);
    setWordCount(0);
  };

  return (
    <Box
      p={isMobile ? 2 : 4}
      maxWidth="900px"
      mx="auto"
      sx={{
        backgroundColor: '#fff',
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

          {/* Post Summary */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Post Summary (Optional)"
              variant="outlined"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Post Status */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#1976D2' }}>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                sx={{ mb: 2 }}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
            </FormControl>
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

          {/* File Upload for Code Files */}
          <Grid item xs={12} md={6}>
            <Typography>Upload Project Files (Optional)</Typography>
            <IconButton color="primary" aria-label="upload file" component="label">
              <input hidden accept=".js,.html,.css,.py" type="file" onChange={handleFileUpload} />
              <UploadFile />
            </IconButton>
            {uploadedFile && (
              <Typography variant="body2" color="textSecondary" mt={2}>
                {uploadedFile.name}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Post Content */}
        <Box mb={4}>
          <Typography mb={1} fontWeight="medium">
            Content
          </Typography>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow"
            modules={quillModules}
            formats={quillFormats}
            style={{ 
              height: isMobile ? '200px' : '300px', 
              borderRadius: '10px', 
              backgroundColor: '#f9f9f9', 
              border: '1px solid #e0e0e0' 
            }}
          />
          <Typography variant="caption" color="textSecondary">
            Word Count: {wordCount}
          </Typography>
        </Box>

        {/* Submit and Preview Buttons */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handlePreview}
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
        <Button
          variant="text"
          color="error"
          onClick={handleReset}
          fullWidth
          sx={{ mt: 2 }}
        >
          Reset Form
        </Button>
      </form>
    </Box>
  );
};

// Custom Quill modules and formats for code blocks
const quillModules = {
  syntax: true, // Enable syntax highlighting
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'code-block'],
    [{ align: [] }],
    ['clean'], // Clear formatting
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'image',
  'code-block',
  'align',
];

export default CreatePost;
