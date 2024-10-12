import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import "../App.css";
import ceilingFan from "../images/ceiling-fan.svg";
import { Container } from "@mui/material";

export default function TableAccordion() {
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: "50px" }}>
      <div className="md:hidden">
        <Accordion
          sx={{ backgroundColor: "#f7a400", minWidth: "200px" }}
          className="bg-[]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={ceilingFan} width="50" alt="" />
            <span className="m-auto min-w-0 archive text-[#4a3100] text-lg">
              Ceiling Fans
            </span>
          </AccordionSummary>
          <AccordionDetails className="overflow-x-scroll max-w-[95vw]">
            <table className="rounded-lg overflow-x-scroll">
              <thead className="">
                <tr
                  style={{
                    backgroundColor: "#0B355B",
                    color: "#fff",
                  }}
                >
                  <th className="p-2 font-light">Size (mm)</th>
                  <th className="p-2 font-light">Size (inch)</th>
                  <th className="p-2 font-light">R.P.M</th>
                  <th className="p-2 font-light">Watts</th>
                  <th className="p-2 font-light">Air Delivery</th>
                  <th className="p-2 font-light">Service Value</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-b border-white">
                  <td className="p-4">900</td>
                  <td className="p-4">36</td>
                  <td className="p-4">525</td>
                  <td className="p-4">80</td>
                  <td className="p-4">5000</td>
                  <td className="p-4">62.50</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">1200</td>
                  <td className="p-4">48</td>
                  <td className="p-4">425</td>
                  <td className="p-4">90</td>
                  <td className="p-4">8500</td>
                  <td className="p-4">94.40</td>
                </tr>
                <tr className="">
                  <td className="p-4">1400</td>
                  <td className="p-4">56</td>
                  <td className="p-4">375</td>
                  <td className="p-4">100</td>
                  <td className="p-4">11500</td>
                  <td className="p-4">115.00</td>
                </tr>
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
        {/* /////////////////////////////// */}
        <Accordion
          sx={{
            backgroundColor: "#f7a400",
            marginTop: "20px",
            borderRadius: "3px",
          }}
          className="bg-[]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={ceilingFan} width="50" alt="" />
            <span className="m-auto min-w-0 archive text-[#4a3100] text-lg">
              Pedestal Fans
            </span>
          </AccordionSummary>
          <AccordionDetails className="overflow-x-scroll max-w-[95vw]">
            <table className="rounded-lg overflow-x-scroll ">
              <thead className="">
                <tr
                  style={{
                    backgroundColor: "#0B355B",
                    color: "#fff",
                  }}
                >
                  <th className="p-2 font-light">Size (mm)</th>
                  <th className="p-2 font-light">Size (inch)</th>
                  <th className="p-2 font-light">R.P.M</th>
                  <th className="p-2 font-light">Watts</th>
                  <th className="p-2 font-light">Air Delivery</th>
                  <th className="p-2 font-light">Service Value</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-b border-white">
                  <td className="p-4">550</td>
                  <td className="p-4">22</td>
                  <td className="p-4">1350</td>
                  <td className="p-4">110</td>
                  <td className="p-4">6500</td>
                  <td className="p-4">59.09</td>
                </tr>
                <tr className="">
                  <td className="p-4">600</td>
                  <td className="p-4">24</td>
                  <td className="p-4">1300</td>
                  <td className="p-4">135</td>
                  <td className="p-4">7500</td>
                  <td className="p-4">55.55</td>
                </tr>
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
        {/* /////////////////////////////// */}
        <Accordion
          sx={{
            backgroundColor: "#f7a400",
            marginTop: "20px",
            borderRadius: "3px",
          }}
          className="bg-[]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={ceilingFan} width="50" alt="" />
            <span className="m-auto min-w-0 archive text-[#4a3100] text-lg">
              Exhaust Fans (Plastic Body)
            </span>
          </AccordionSummary>
          <AccordionDetails className="overflow-x-scroll max-w-[95vw]">
            <table className="rounded-lg overflow-x-scroll ">
              <thead className="">
                <tr
                  style={{
                    backgroundColor: "#0B355B",
                    color: "#fff",
                  }}
                >
                  <th className="p-2 font-light">Size (mm)</th>
                  <th className="p-2 font-light">Size (inch)</th>
                  <th className="p-2 font-light">R.P.M</th>
                  <th className="p-2 font-light">Watts</th>
                  <th className="p-2 font-light">Air Delivery</th>
                  <th className="p-2 font-light">Service Value</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-b border-white">
                  <td className="p-4">200</td>
                  <td className="p-4">8</td>
                  <td className="p-4">1260</td>
                  <td className="p-4">30</td>
                  <td className="p-4">560</td>
                  <td className="p-4">18.67</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">250</td>
                  <td className="p-4">10</td>
                  <td className="p-4">1260</td>
                  <td className="p-4">35</td>
                  <td className="p-4">625</td>
                  <td className="p-4">17.85</td>
                </tr>
                <tr className=" ">
                  <td className="p-4">300</td>
                  <td className="p-4">12</td>
                  <td className="p-4">1175</td>
                  <td className="p-4">45</td>
                  <td className="p-4">775</td>
                  <td className="p-4">17.22</td>
                </tr>
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
        {/* /////////////////////////////// */}
        <Accordion
          sx={{
            backgroundColor: "#f7a400",
            marginTop: "20px",
            borderRadius: "3px",
          }}
          className="bg-[]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={ceilingFan} width="50" alt="" />
            <span className="m-auto min-w-0 archive text-[#4a3100] text-lg">
              Exhaust Fans (Metal Body)
            </span>
          </AccordionSummary>
          <AccordionDetails className="overflow-x-scroll max-w-[95vw]">
            <table className="rounded-lg overflow-x-scroll ">
              <thead className="">
                <tr
                  style={{
                    backgroundColor: "#0B355B",
                    color: "#fff",
                  }}
                >
                  <th className="p-2 font-light">Size (mm)</th>
                  <th className="p-2 font-light">Size (inch)</th>
                  <th className="p-2 font-light">R.P.M</th>
                  <th className="p-2 font-light">Watts</th>
                  <th className="p-2 font-light">Air Delivery</th>
                  <th className="p-2 font-light">Service Value</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-b border-white">
                  <td className="p-4">200</td>
                  <td className="p-4">8</td>
                  <td className="p-4">1350</td>
                  <td className="p-4">40</td>
                  <td className="p-4">451</td>
                  <td className="p-4">11.27</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">250</td>
                  <td className="p-4">10</td>
                  <td className="p-4">1350</td>
                  <td className="p-4">50</td>
                  <td className="p-4">600</td>
                  <td className="p-4">12.00</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">300</td>
                  <td className="p-4">12</td>
                  <td className="p-4">1350</td>
                  <td className="p-4">50</td>
                  <td className="p-4">750</td>
                  <td className="p-4">15.00</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">350</td>
                  <td className="p-4">14</td>
                  <td className="p-4">1350</td>
                  <td className="p-4">90</td>
                  <td className="p-4">1500</td>
                  <td className="p-4">16.67</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">400</td>
                  <td className="p-4">16</td>
                  <td className="p-4">1350</td>
                  <td className="p-4">90</td>
                  <td className="p-4">1500</td>
                  <td className="p-4">16.67</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">450</td>
                  <td className="p-4">18</td>
                  <td className="p-4">1200</td>
                  <td className="p-4">105</td>
                  <td className="p-4">2500</td>
                  <td className="p-4">23.81</td>
                </tr>
                <tr className=" border-b border-white">
                  <td className="p-4">500</td>
                  <td className="p-4">20</td>
                  <td className="p-4">1200</td>
                  <td className="p-4">155</td>
                  <td className="p-4">3835</td>
                  <td className="p-4">24.74</td>
                </tr>
                <tr className="">
                  <td className="p-4">600</td>
                  <td className="p-4">24</td>
                  <td className="p-4">1200</td>
                  <td className="p-4">185</td>
                  <td className="p-4">3710</td>
                  <td className="p-4">25.46</td>
                </tr>
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
        {/* /////////////////////////////// */}
        <Accordion
          sx={{
            backgroundColor: "#f7a400",
            marginTop: "20px",
            borderRadius: "3px",
          }}
          className="bg-[]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={ceilingFan} width="50" alt="" />
            <span className="m-auto min-w-0 archive text-[#4a3100] text-lg">
              Wall Bracket
            </span>
          </AccordionSummary>
          <AccordionDetails className="overflow-x-scroll max-w-[95vw]">
            <table className="rounded-lg overflow-x-scroll ">
              <thead className="">
                <tr
                  style={{
                    backgroundColor: "#0B355B",
                    color: "#fff",
                  }}
                >
                  <th className="p-2 font-light">Size (mm)</th>
                  <th className="p-2 font-light">Size (inch)</th>
                  <th className="p-2 font-light">R.P.M</th>
                  <th className="p-2 font-light">Watts</th>
                  <th className="p-2 font-light">Air Delivery</th>
                  <th className="p-2 font-light">Service Value</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="">
                  <td className="p-4">450</td>
                  <td className="p-4">18</td>
                  <td className="p-4">1225</td>
                  <td className="p-4">65</td>
                  <td className="p-4">3900</td>
                  <td className="p-4">60.00</td>
                </tr>
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}
