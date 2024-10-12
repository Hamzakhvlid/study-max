import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png";
import login_img from "../../assets/images/login_img.jpg";
import { fetchUserData } from "../../redux/Slices/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

// APIs
const LOGIN_API = `${
  import.meta.env.VITE_BACKEND_DOMAIN_NAME
}/api/authentication/login`;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Singleuser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    axios
      .post(LOGIN_API, values, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        navigate("/");
        dispatch(fetchUserData({ id: res.data.user._id }));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 0,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "0px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              maxHeight: "90vh",
              margin: { xs: 2, sm: 4 }, // Adjusted margin for better responsiveness
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flex: "1",
                overflow: "hidden",
                backgroundImage: `url(${login_img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Form Section */}
            <Box
              sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: { xs: 3, md: 5 },
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    height: "50px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ touched, errors }) => (
                  <Form style={{ width: "100%" }}>
                    <Field name="email">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          type="email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          sx={{ marginBottom: 3 }}
                          error={touched.email && Boolean(errors.email)}
                          helperText={
                            touched.email && <ErrorMessage name="email" />
                          }
                          InputProps={{
                            sx: {
                              borderColor:
                                touched.email && Boolean(errors.email)
                                  ? "red"
                                  : "inherit",
                              "&:focus": {
                                borderColor:
                                  touched.email && Boolean(errors.email)
                                    ? "red"
                                    : "inherit",
                              },
                            },
                          }}
                        />
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          type="password"
                          label="Password"
                          variant="outlined"
                          fullWidth
                          sx={{ marginBottom: 3 }}
                          error={touched.password && Boolean(errors.password)}
                          helperText={
                            touched.password && <ErrorMessage name="password" />
                          }
                          InputProps={{
                            sx: {
                              borderColor:
                                touched.password && Boolean(errors.password)
                                  ? "red"
                                  : "inherit",
                              "&:focus": {
                                borderColor:
                                  touched.password && Boolean(errors.password)
                                    ? "red"
                                    : "inherit",
                              },
                            },
                          }}
                        />
                      )}
                    </Field>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#0b355b",
                        color: "white",
                        borderRadius: "0px",
                        paddingX: "40px",
                        "&:hover": { backgroundColor: "#3c5d7c" },
                        width: "100%",
                      }}
                    >
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body2">
                    Don't have an account?
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#0a66c2",
                      cursor: "pointer",
                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    <u>Sign up</u>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    color: "#0a66c2",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "600" }}
                    onClick={() => navigate("/forgotPass")}
                  >
                    <u>Forgot Password</u>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Box>
  );
}
