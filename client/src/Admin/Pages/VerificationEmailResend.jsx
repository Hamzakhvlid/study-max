import React, { useState } from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerificationEmailResend = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const EMAIL_REQUEST_API = `${
    import.meta.env.VITE_BACKEND_DOMAIN_NAME
  }/api/authentication/verificationEmailResend`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Add your email submission logic here
    axios
      .post(EMAIL_REQUEST_API, { email }, { withCredentials: true })
      .then((res) => {
        console.log("Verification email sent:", res);
        setLoading(false);
        toast.success("Verification email sent");
        setTimeout(() => {
          navigate("/emailverification");
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to send verification email:", err);
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

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
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 0,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#0b355b", // Using the button color from SignUp page
              mb: 2,
            }}
          >
            Verify Your Account
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "#555", fontSize: "13px" }}
          >
            Enter your email address to receive a verification Token.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#0b355b",
                borderRadius: "0px",
                "&:hover": {
                  backgroundColor: "#3c5d7c",
                },
                fontWeight: "bold",
              }}
            >
              {loading && <CircularProgress size={24} color="inherit" />}
              {!loading && "Send Verification Email"}
            </Button>
          </form>
        </Box>
      </Container>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Box>
  );
};

export default VerificationEmailResend;
