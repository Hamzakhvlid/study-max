import * as React from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Container,
} from "@mui/material";
import "../App.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import TableAccordion from "./TableAccordion.jsx";

export default function BasicTable() {
  return (
    <div className="">
      <TableContainer className="table-container md:bg-[#f7a400]">
        <Typography
          className="archive text-center text-[#1b1b1be0] sm:my-12 md:my-16"
          sx={{
            fontSize: {
              lg: "2.3rem",
              md: "2.2rem",
              sm: "1.9rem",
              xs: "1.8rem",
            },
          }}
        >
          TECHNICAL DATA & SPECIFICATIONS
        </Typography>
        <Container maxWidth={"lg"}>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Table className="my-5">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    Types of Fans
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    Size(mm)
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    Size(inch)
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    R.P.M
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    Watts
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    Air Delivery
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#0B355B",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      borderRight: "none",
                      paddingX: 3,
                    }}
                    align="center"
                  >
                    Service Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    borderBottom: "2px solid #fde4b3",
                    borderRight: "2px solid #fde4b3",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#BD3D39",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                  >
                    Ceiling Fans
                  </TableCell>
                  <TableCell align="center">
                    900
                    <br />
                    1200
                    <br />
                    1400
                  </TableCell>
                  <TableCell align="center">
                    36
                    <br />
                    48
                    <br />
                    56
                  </TableCell>
                  <TableCell align="center">
                    525
                    <br />
                    425
                    <br />
                    375
                  </TableCell>
                  <TableCell align="center">
                    80
                    <br />
                    90
                    <br />
                    100
                  </TableCell>
                  <TableCell align="center">
                    5000
                    <br />
                    8500
                    <br />
                    11500
                  </TableCell>
                  <TableCell align="center">
                    62.50
                    <br />
                    94.40
                    <br />
                    115.00
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderBottom: "2px solid #fde4b3",
                    borderRight: "2px solid #fde4b3",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#BD3D39",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                  >
                    Pedestal Fans
                  </TableCell>
                  <TableCell align="center">
                    550
                    <br />
                    600
                  </TableCell>
                  <TableCell align="center">
                    22
                    <br />
                    24
                  </TableCell>
                  <TableCell align="center">
                    1350
                    <br />
                    1300
                  </TableCell>
                  <TableCell align="center">
                    110
                    <br />
                    135
                  </TableCell>
                  <TableCell align="center">
                    6500
                    <br />
                    7500
                  </TableCell>
                  <TableCell align="center">
                    59.09
                    <br />
                    55.55
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderBottom: "2px solid #fde4b3",
                    borderRight: "2px solid #fde4b3",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#BD3D39",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                  >
                    Exhaust Fans (Plastic Body)
                  </TableCell>
                  <TableCell align="center">
                    200
                    <br />
                    250
                    <br />
                    300
                  </TableCell>
                  <TableCell align="center">
                    8<br />
                    10
                    <br />
                    12
                  </TableCell>
                  <TableCell align="center">
                    1260
                    <br />
                    1260
                    <br />
                    1175
                  </TableCell>
                  <TableCell align="center">
                    30
                    <br />
                    35
                    <br />
                    45
                  </TableCell>
                  <TableCell align="center">
                    560
                    <br />
                    625
                    <br />
                    775
                  </TableCell>
                  <TableCell align="center">
                    18.67
                    <br />
                    17.85
                    <br />
                    17.22
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderBottom: "2px solid #fde4b3",
                    borderRight: "2px solid #fde4b3",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#BD3D39",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                    }}
                  >
                    Exhaust Fans (Metal Body)
                  </TableCell>
                  <TableCell align="center">
                    200
                    <br />
                    250
                    <br />
                    300
                    <br />
                    350
                    <br />
                    400
                    <br />
                    450
                    <br />
                    500
                    <br />
                    600
                  </TableCell>
                  <TableCell align="center">
                    8<br />
                    10
                    <br />
                    12
                    <br />
                    14
                    <br />
                    16
                    <br />
                    18
                    <br />
                    20
                    <br />
                    24
                  </TableCell>
                  <TableCell align="center">
                    1350
                    <br />
                    1350
                    <br />
                    1350
                    <br />
                    1350
                    <br />
                    1350
                    <br />
                    1200
                    <br />
                    1200
                    <br />
                    1200
                  </TableCell>
                  <TableCell align="center">
                    40
                    <br />
                    50
                    <br />
                    50
                    <br />
                    90
                    <br />
                    90
                    <br />
                    105
                    <br />
                    155
                    <br />
                    185
                  </TableCell>
                  <TableCell align="center">
                    451
                    <br />
                    600
                    <br />
                    750
                    <br />
                    1500
                    <br />
                    1500
                    <br />
                    2500
                    <br />
                    3835
                    <br />
                    3710
                  </TableCell>
                  <TableCell align="center">
                    11.27
                    <br />
                    12.00
                    <br />
                    15.00
                    <br />
                    16.67
                    <br />
                    16.67
                    <br />
                    23.81
                    <br />
                    24.74
                    <br />
                    25.46
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderBottom: "2px solid #fde4b3",
                    borderRight: "2px solid #fde4b3",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      backgroundColor: "#BD3D39",
                      color: "#ffffff",
                      border: "2px solid #F7A400",
                      paddingX: 3,
                      borderBottom: "none",
                    }}
                  >
                    Wall Bracket
                  </TableCell>
                  <TableCell align="center">450</TableCell>
                  <TableCell align="center">18</TableCell>
                  <TableCell align="center">1225</TableCell>
                  <TableCell align="center">65</TableCell>
                  <TableCell align="center">3900</TableCell>
                  <TableCell align="center">60.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Container>

        <div>
          <TableAccordion />
        </div>
        <p className="text-center font-light mt-4 text-base sm:text-sm md:text-lg lg:text-lg xl:text-lg px-4">
          Rated Voltage: 230 ± 10V - AC Cycles: 50 Hz Type: Capacitors for all
          Fans 10% Variation in air delivery & Power Consumption. <br />
          Note: All the specifications mentioned above are in accordance with
          99-99% pure Copper Winding wire.
        </p>
      </TableContainer>
    </div>
  );
}
