import * as React from 'react';
import Chip from '@mui/material/Chip';

const CategoryChip = ({ category, selected, onSelect }) => {
  return (
    <Chip
      label={category.categoryName}
      variant={selected ? 'filled' : 'outlined'} 
      color="primary" 
      clickable
      onClick={() => onSelect(category._id)}
      sx={{ marginRight: 1, marginBottom: 1 }}
    />
  );
};

export default CategoryChip; 