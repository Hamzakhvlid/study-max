import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetpasswordEmailSentPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#0b355b", // Consistent with button color
              mb: 3,
            }}
          >
            Password Reset Request
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "#555",
            }}
          >
            A password reset link has been sent to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "#0b355b", // Consistent with button color
              "&:hover": {
                backgroundColor: "#3c5d7c",
              },
              fontWeight: "bold",
            }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetpasswordEmailSentPage;
