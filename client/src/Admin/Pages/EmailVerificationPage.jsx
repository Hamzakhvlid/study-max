import React, { useRef, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next box if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const EMAIL_VERIFICATION_API = `${
    import.meta.env.VITE_BACKEND_DOMAIN_NAME
  }/api/authentication/verifyEmail`;

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verification Code:", verificationCode);
    // Add your verification logic here
    const response = axios
      .post(
        EMAIL_VERIFICATION_API,
        { code: verificationCode },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Email verified successfully:", res);
        setLoading(false);
        toast.success("Email Verification Completed");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to verify email:", err);
        setLoading(false);
        toast.error("Invalid Code");
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
            Verify Your Email
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
            Enter the 6-digit code sent to your email address.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>
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
              {!loading && "Verify Email"}
            </Button>
          </form>
          <Typography sx={{ mt: 2, fontSize: "15px", color: "#4d4d4d" }}>
            Didn't received{" "}
            <span
              style={{ color: "#0a66c2", cursor: "pointer" }}
              onClick={() => {
                navigate("/verificationEmailResend");
              }}
            >
              <u>Resend Email</u>
            </span>
          </Typography>
        </Box>
      </Container>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Box>
  );
};

export default EmailVerificationPage;
