import React from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
  maxWidth: "450px",
  margin: "50px auto",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "15px",
  backgroundColor: theme.palette.background?.paper,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  marginBottom: "25px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const ProfileButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  padding: "10px 25px",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
  },
}));

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer who loves to code and explore new technologies.",
    profilePicture: "https://via.placeholder.com/150", // Placeholder image URL
  };

  return (
    <ProfileContainer>
      <ProfileAvatar alt={user.name} src={user.profilePicture} />
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ marginBottom: "20px" }}
      >
        {user.email}
      </Typography>
      <Typography
        variant="body2"
        sx={{ margin: "20px 0", textAlign: "center" }}
      >
        {user.bio}
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <ProfileButton variant="contained" color="primary">
          Edit Profile
        </ProfileButton>
        <ProfileButton variant="outlined" color="secondary">
          Log Out
        </ProfileButton>
      </Box>
    </ProfileContainer>
  );
};

export default UserProfile;
