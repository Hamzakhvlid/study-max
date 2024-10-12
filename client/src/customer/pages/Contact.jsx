import React, { useState } from "react";
import AccessTime from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const phoneRegExp = /^\d{11}$/;
// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  subject: Yup.string().required("Subject is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number must be exactly 11 digits")
    .required("Phone Number is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const CONTACT_API = `${
    import.meta.env.VITE_BACKEND_DOMAIN_NAME
  }/api/contact/messages`;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(CONTACT_API, values);
        if (response.status === 200 || response.status === 201) {
          toast.success("Message submitted successfully!");
          formik.resetForm();
          setLoading(false);
        }
      } catch (error) {
        toast.error("Error occurred while submitting your message.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Box
        id="contact-us"
        sx={{ position: "relative", zIndex: 43, padding: "6rem 0" }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item lg={8} xs={12}>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Box
                  sx={{
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                    padding: 4,
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      variant="h4"
                      color="#F7941D"
                      sx={{ fontSize: "1.5rem" }}
                    >
                      Get in touch
                    </Typography>
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{
                        fontSize: "2rem",
                        textTransform: "capitalize",
                        fontWeight: 600,
                      }}
                    >
                      Write us a message
                    </Typography>
                  </Box>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item lg={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          variant="outlined"
                          margin="normal"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                          sx={{
                            typography: "body2",
                            "& .MuiOutlinedInput-root.Mui-error": {
                              "& fieldset": {
                                borderColor: "red",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Your Subject"
                          name="subject"
                          variant="outlined"
                          margin="normal"
                          value={formik.values.subject}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.subject &&
                            Boolean(formik.errors.subject)
                          }
                          helperText={
                            formik.touched.subject && formik.errors.subject
                          }
                          sx={{
                            typography: "body2",
                            "& .MuiOutlinedInput-root.Mui-error": {
                              "& fieldset": {
                                borderColor: "red",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Your Email"
                          name="email"
                          type="email"
                          variant="outlined"
                          margin="normal"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          sx={{
                            typography: "body2",
                            "& .MuiOutlinedInput-root.Mui-error": {
                              "& fieldset": {
                                borderColor: "red",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Your Phone"
                          name="phone"
                          variant="outlined"
                          margin="normal"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                          }
                          helperText={
                            formik.touched.phone && formik.errors.phone
                          }
                          sx={{
                            typography: "body2",
                            "& .MuiOutlinedInput-root.Mui-error": {
                              "& fieldset": {
                                borderColor: "red",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          variant="outlined"
                          multiline
                          rows={6}
                          margin="normal"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.message &&
                            Boolean(formik.errors.message)
                          }
                          helperText={
                            formik.touched.message && formik.errors.message
                          }
                          sx={{
                            typography: "body2",
                            "& .MuiOutlinedInput-root.Mui-error": {
                              "& fieldset": {
                                borderColor: "red",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          sx={{
                            paddingX: 5,
                            backgroundColor: "#0B355B",
                            borderRadius: "0px",
                            border: "1px solid #0B355B",
                            fontWeight: "600",
                            width: {
                              xs: "100%",
                              sm: "100%",
                              md: "auto",
                            },
                            boxShadow:
                              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.10) 0px 10px 10px",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#F5F5F5",
                              border: "1px solid #0B355B",
                              color: "#0B355B",
                              fontWeight: "600",
                              transition: "all 0.3s ease",
                              boxShadow:
                                "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </motion.div>
            </Grid>

            <Grid item lg={4} xs={12}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Box
                  sx={{
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
                    padding: 4,
                    borderRadius: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ marginBottom: 4 }}>
                    <Typography
                      variant="h4"
                      color="#333"
                      sx={{ fontSize: "1.25rem" }}
                    >
                      <Phone sx={{ color: "#475F7B", marginRight: 1 }} />
                      Call us Now:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="+92 345 6333393" />
                      </ListItem>
                    </List>
                  </Box>
                  <Box sx={{ marginBottom: 4 }}>
                    <Typography
                      variant="h4"
                      color="#333"
                      sx={{ fontSize: "1.1rem", fontWeight: "600" }}
                    >
                      <Email sx={{ color: "#475F7B", marginRight: 1 }} />
                      Email:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary={<a>info@alnoorfans.com</a>} />
                      </ListItem>
                    </List>
                  </Box>
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      variant="h4"
                      color="#333"
                      sx={{ fontSize: "1.1rem", fontWeight: "600" }}
                    >
                      <LocationOn sx={{ color: "#475F7B", marginRight: 1 }} />
                      Our Address:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="75-B, Small Industrial Estate G.T Road, Industry Area Main Rd II, Small Industrial Area, Gujrat, Punjab 50700" />
                      </ListItem>
                    </List>
                  </Box>
                  <Box sx={{ marginBottom: 4 }}>
                    <Typography
                      variant="h4"
                      color="#333"
                      sx={{ fontSize: "1.1rem", fontWeight: "600" }}
                    >
                      <AccessTime sx={{ color: "#475F7B", marginRight: 1 }} />
                      Business Hours:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Mon-Fri: 9:00 AM - 6:00 PM" />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
          <Grid container paddingY={"80px"}>
            <Grid item xs={12}>
              <Box>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13452.391322360732!2d74.0870268!3d32.5502342!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1b080849b163%3A0x828e413c0dcd9f84!2sAl-Noor%20Fans!5e0!3m2!1sen!2s!4v1724390197720!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </Container>
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Toaster position="bottom-right" />
      </Box>
    </>
  );
};

export default Contact;
