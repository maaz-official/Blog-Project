import React from 'react';
import { useGetUsersQuery } from '../../../../slices/userApiSlice'; // Import the hook
import { Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Chip, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the trash icon
import AdminLayout from '../../layout/AdminLayout'; // Import AdminLayout
import Loader from '../../../../components/Loader'; // Import Loader component
import Message from '../../../../components/Message'; // Import Message component

function ListAllUsers() {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  // Function to handle delete action (you can implement the actual delete logic)
  const handleDelete = (id) => {
    console.log('Delete user with ID:', id);
    // Implement the delete logic here, e.g., call API to delete the user
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: '1000px', mx: 'auto', p: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#333',
              p: 2,
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          >
            Authors Table
          </Typography>

          {/* Loader and Error Handling */}
          {isLoading && <Loader />} {/* Show Loader while loading */}
          {isError && <Message variant="error">{error?.data?.message || 'Something went wrong!'}</Message>} {/* Show Error message */}

          {/* User Table */}
          {!isLoading && !isError && (
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#6c757d' }}>AUTHOR</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#6c757d' }}>ROLE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#6c757d' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#6c757d' }}>REG. DATE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#6c757d' }}></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    {/* AUTHOR - with Avatar and Name */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={user.profileImage} alt={user.fullName} sx={{ mr: 2 }} />
                        <Box>
                          <Typography fontWeight="bold">{user.fullName || user.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* ROLE */}
                    <TableCell>
                      <Typography fontWeight="bold">{user.isAdmin ? 'Admin' : 'User'}</Typography>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      {user.isAdmin ? (
                        <Chip label="ONLINE" color="success" size="small" />
                      ) : (
                        <Chip label="OFFLINE" color="default" size="small" />
                      )}
                    </TableCell>

                    {/* REG. DATE */}
                    <TableCell>
                      {/* Use createdAt from the database */}
                      <Typography>{new Date(user.createdAt).toLocaleDateString()}</Typography>
                    </TableCell>

                    {/* ACTION BUTTONS - Edit and Delete */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                          Edit
                        </Button>
                        <IconButton color="error" onClick={() => handleDelete(user._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
}

export default ListAllUsers;
