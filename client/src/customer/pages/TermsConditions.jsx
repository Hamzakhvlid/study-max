import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
const TermsAndConditions = () => {
  // Animation variants for section transitions
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: { xs: 4, md: 8 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={fadeInUp}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "2rem" },
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: { xs: "1rem", md: "1rem" },
            textAlign: "center",
            lineHeight: 1.7,
            mx: { xs: 2, md: 0 },
          }}
        >
          Welcome to Al-noor Fans! By purchasing our products, you agree to our
          shipping policies, which include delivery times, costs, and return
          procedures. Please review all details before completing your order to
          ensure a smooth shopping experience.
        </Typography>
      </motion.div>

      {/* Section 1 */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={fadeInUp}
      >
        <Box sx={{ mt: { xs: 4, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.25rem", md: "1.75rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Shipping Information
              </Typography>

              {/* Accordion for TCS Shipping */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    TCS Shipping
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    We are pleased to offer shipping services for Al-Noor Fans
                    through TCS. Below are the available options:
                  </Typography>

                  {/* Standard Shipping Section */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Standard Shipping:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Cost:</strong> 500 PKR
                    </Typography>
                    <Typography variant="body2">
                      <strong>Delivery Time:</strong> 3-5 days
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Note:</strong> Overland shipping is used for this
                      method. We charge a flat rate of 500 PKR, and the
                      estimated delivery time is 3-5 days. This method ensures a
                      reliable and cost-effective solution for our customers.
                    </Typography>
                  </Box>

                  {/* Overnight Shipping Section */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Overnight Shipping:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Cost:</strong> Customer’s Responsibility
                    </Typography>
                    <Typography variant="body2">
                      <strong>Delivery Time:</strong> 1-2 Days
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Note:</strong> If you need overnight delivery, you
                      can arrange and pay for the shipping yourself using your
                      preferred courier service. Once the product is handed over
                      to TCS, we depend on their services for timely delivery.
                      We will work closely with TCS to resolve any issues and
                      keep you updated. You can track your order via the Track
                      Order link or the TCS website.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Accordion for CAREGO Cargo */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    CAREGO Cargo
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography variant="body2">
                      <strong>Cost:</strong> 500 PKR
                    </Typography>
                    <Typography variant="body2">
                      <strong>Delivery Time:</strong> 1-3 days
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Method:</strong> Customer Pickup or delivery at
                      your doorstep (with extra charges). The CAREGO Cargo
                      option ensures a quick turnaround for your order, with a
                      delivery time of approximately 1-3 days.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6, duration: 0.5 }}
        variants={fadeInUp}
      >
        <Box sx={{ mt: { xs: 4, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.25rem", md: "1.75rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Refund Policy
              </Typography>

              {/* Accordion for Refund Overview */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Overview
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Our refund and returns policy lasts for 15 days from the
                    date of purchase. If 15 days have passed since your
                    purchase, unfortunately, we cannot offer you a full refund
                    or exchange.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    To be eligible for a return, the item must be unused and in
                    its original condition and packaging. Certain types of goods
                    are exempt from being returned, including:
                  </Typography>
                  <ul>
                    <li>Fan bodies that have been dropped</li>
                    <li>Bent blades</li>
                    <li>Used fans</li>
                    <li>Over-voltage applied products</li>
                    <li>Products with self-repaired circuits</li>
                  </ul>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    If eligible, you may either request a replacement or have
                    the product repaired and returned within 5-7 days. Refunds
                    are not typically offered unless in special cases.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Accordion for Refund Process */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Refund Process
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Once your return is received and inspected, we will notify
                    you of the approval or rejection of your refund via email.
                    If approved, your refund will be processed and a credit will
                    be applied to your original method of payment within a
                    certain amount of days.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    If you haven’t received a refund yet, first check your bank
                    account, then contact your bank. There may be a processing
                    delay. If you still have not received your refund, please
                    contact us at <Link href="tel:+000000000">+000000000</Link>.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Accordion for Sale Items */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Sale Items
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Only regular priced items may be refunded. Sale items cannot
                    be refunded.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Accordion for Exchanges */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Exchanges
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    We replace items only if they are defective or damaged. If
                    you need to exchange an item, contact us at{" "}
                    <Link href="tel:+000000000">+000000000</Link> and send your
                    item to:
                    <strong>
                      {" "}
                      Al-Noor Electric Industries, 75-B Small Industrial Estate
                      Area Gujrat 50700, Punjab Pakistan
                    </strong>
                    .
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Accordion for Shipping Returns */}
              <Accordion
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    Shipping Returns
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    To return your product, mail it to:{" "}
                    <strong>
                      Al-Noor Electric Industries, 75-B Small Industrial Estate
                      Area Gujrat 50700, Punjab Pakistan
                    </strong>
                    . You are responsible for shipping costs. If you receive a
                    refund, return shipping costs will be deducted.
                  </Typography>
                  <Typography variant="body2">
                    Consider using a trackable shipping service or purchasing
                    shipping insurance for more expensive items.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Contact Information */}
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Section 4 */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8, duration: 0.5 }}
        variants={fadeInUp}
      >
        <Box sx={{ mt: { xs: 4, md: 8 } }}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                fontWeight: "bold",
                mb: 3,
              }}
            >
              Warranty Claim
            </Typography>

            {/* Accordion for Terms & Conditions */}
            <Accordion
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">
                  Terms & Conditions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Inverter fan motors are covered by a 2-year repair warranty
                  starting from the purchase date, subject to specific terms:
                </Typography>
                <ul>
                  <li>
                    The repair warranty excludes damages caused by accidents,
                    attempted repairs, negligence, or customer mishandling.
                  </li>
                  <li>
                    Motor burnout due to voltage fluctuations or water seepage
                    (except waterproof ceiling fans) is not included.
                  </li>
                  <li>
                    Correct Motor Controller connections as per manual
                    instructions are necessary.
                  </li>
                  <li>
                    The repair warranty is void if the Motor Controller is
                    damaged by being connected to a dimmer.
                  </li>
                  <li>Breakage of parts is not covered under the warranty.</li>
                  <li>
                    Components such as remotes and the Motor Controller have a
                    1-year repair warranty from the purchase date.
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>

            {/* Accordion for Warranty Claims Process */}
            <Accordion
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">
                  Warranty Claims Process
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  To make a warranty claim:
                </Typography>
                <ul>
                  <li>
                    The warranty card must be completed, signed, and stamped by
                    the authorized dealer.
                  </li>
                  <li>
                    Warranty card alterations, such as cutting or overwriting,
                    will not be accepted.
                  </li>
                  <li>
                    In cases not covered by the warranty, service and
                    replacement charges will apply.
                  </li>
                  <li>
                    Replacement for non-repairable manufacturing faults requires
                    approval from the authorized service provider.
                  </li>
                  <li>
                    The company is not responsible for indirect, incidental, or
                    consequential damages from using Al-Noor Fans products.
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>

            {/* Accordion for Replacement Warranty */}
            <Accordion
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight="bold">
                  Replacement Warranty
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  The replacement warranty is valid for 10 days only from the
                  date of purchase. After that, products will not be replaced;
                  instead, repair and replacement charges for components will
                  apply.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Need help?
              </Typography>
              <Typography variant="body2">
                Contact us at{" "}
                <Link href="mailto:******@company.com">******@company.com</Link>{" "}
                for any questions related to refunds and returns.
              </Typography>
            </Box>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default TermsAndConditions;
