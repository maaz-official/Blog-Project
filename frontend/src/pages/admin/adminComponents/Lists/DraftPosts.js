import { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import AdminLayout from '../../layout/AdminLayout'; // Import the AdminLayout

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);

  // Simulate fetching draft posts from backend (or fetch from API)
  useEffect(() => {
    // Example data (this should be fetched from the backend or API)
    const draftPosts = [
      {
        id: 1,
        title: 'How to Learn React',
        category: 'Tech',
        content: 'This is a draft post about learning React...',
        createdAt: '2024-09-15',
      },
      {
        id: 2,
        title: 'Understanding JavaScript Closures',
        category: 'Programming',
        content: 'This is a draft post about JavaScript closures...',
        createdAt: '2024-09-18',
      },
      {
        id: 3,
        title: 'React Performance Optimization',
        category: 'Tech',
        content: 'This is a draft post about optimizing performance in React apps...',
        createdAt: '2024-09-20',
      },
    ];
    setDrafts(draftPosts);
  }, []);

  // Handle editing a draft post
  const handleEdit = (id) => {
    console.log(`Editing post with ID: ${id}`);
    // Redirect to the post editor or pass the data to the editor component
  };

  // Handle deleting a draft post
  const handleDelete = (id) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== id);
    setDrafts(updatedDrafts); // In real scenario, call backend API to delete
    console.log(`Deleted post with ID: ${id}`);
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          p: 3,
          maxWidth: '900px', // Adjust the max width to align with the "CreatePost" page
          mx: 'auto',
          borderRadius: '12px',
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: '#1976D2' }}
        >
          Draft Posts
        </Typography>

        {drafts.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#888' }}>
            No drafts available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {drafts.map((draft) => (
              <Grid item xs={12} key={draft.id}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    borderRadius: '12px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976D2' }}>
                    {draft.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#555', mb: 2 }}>
                    {draft.category} | Created at: {new Date(draft.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {draft.content.slice(0, 100)}... {/* Preview first 100 characters */}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mb: { xs: 1, md: 0 }, mr: { xs: 0, md: 2 }, width: { xs: '100%', md: 'auto' } }}
                      onClick={() => handleEdit(draft.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ width: { xs: '100%', md: 'auto' } }}
                      onClick={() => handleDelete(draft.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </AdminLayout>
  );
};

export default Drafts;
