import React from 'react';
import { Typography, Box } from '@mui/material';

const ColorDisplay = ({ item }) => {
  const colorItems = item.split(',').map(part => part.trim());
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {colorItems.map((colorItem, index) => {
        const [value, color, percentage] = colorItem.split('->').map(part => part.trim());
        
        return (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: color,
                border: '1px solid #ccc',
                borderRadius: 1,
              }}
            />
             {color}
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                wordWrap: "break-word",
              }}
            >
              {`${value} -> ${percentage}`}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ColorDisplay;