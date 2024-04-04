import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: '#74746E', // Text color
  },
  '& .MuiInputLabel-root': {
    color: '#ACB5BB', // Label text color
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px', // Border radius
    '& fieldset': {
      borderColor: '#DCE4E8', // Border color
    },
    '&:hover fieldset': {
      borderColor: '#DCE4E8', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#DCE4E8', // Border color when focused
    },
  },
});

export default function TextInput({ name ,label ,onChange, onBlur}) {
  return (
    <CustomTextField
      fullWidth name={name}
      id="outlined-basic"
      label={label}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      InputLabelProps={{
        style: { color: '#ACB5BB' }, // Set label color dynamically
      }}
    />
  );
}
