import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function AccessKeys() {
  const [accessKeys, setAccessKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKey, setNewKey] = useState(null);

  useEffect(() => {
    fetchAccessKeys();
  }, []);

  const fetchAccessKeys = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/accessKeys`
      );
      setAccessKeys(response.data);
    } catch (error) {
      console.error("Error fetching access keys:", error);
      toast.error("Failed to fetch access keys");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the new key");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/accessKeys`,
        { name: newKeyName }
      );
      setNewKey(response.data);
      setAccessKeys(prevKeys => [...prevKeys, response.data]);
      setNewKeyName('');
      toast.success('New access key generated!');
    } catch (error) {
      console.error("Error generating access key:", error);
      toast.error("Failed to generate access key");
    }
  };

  const handleRevokeKey = async (keyId) => {
    if (window.confirm('Are you sure you want to revoke this access key?')) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/accessKeys/${keyId}`
        );
        setAccessKeys(prevKeys => prevKeys.filter(key => key._id !== keyId));
        toast.success('Access key revoked!');
      } catch (error) {
        console.error("Error revoking access key:", error);
        toast.error("Failed to revoke access key");
      }
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key)
      .then(() => toast.success('Access key copied to clipboard!'))
      .catch(() => toast.error('Failed to copy access key!'));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Access Keys
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              label="Enter key name"
              variant="outlined"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              fullWidth
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleGenerateKey}
            >
              Generate New Key
            </Button>
          </Box>

          {newKey && (
            <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {newKey.key}
              </Typography>
              <IconButton size="small" onClick={() => handleCopyKey(newKey.key)}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessKeys.map((key) => (
              <TableRow key={key._id}>
                <TableCell>{key.name}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>{key.key}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleCopyKey(key.key)}>
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleRevokeKey(key._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {accessKeys.length === 0 && (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
          No access keys generated yet.
        </Typography>
      )}
    </Box>
  );
}