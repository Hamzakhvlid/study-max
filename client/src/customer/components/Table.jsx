import * as React from 'react';
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material';
import '../pages/styles.css'
  
  function createData(name, calories, fat, carbs, protein, pro) {
    return { name, calories, fat, carbs, protein, pro };
  }
  
  const rows = [
    createData('Ceiling Fans',[ '900/ ', '900/ ', '900 '] , 6.0, 24, 8.0, 23),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 34),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9,),
  ];
  
  export default function BasicTable() {


  return (
    <TableContainer  className='table-container relative z-30' >

<div id='legend' className='legend absolute -top-4 p-5 overflow-visible  z-50 mx-auto'>
  <span>
    <h2 className=' archive text-2xl'>ENERGY</h2>
    <p className='yellow oregano -mt-5 text-3xl'>Saver Technology</p>
  </span>
  <span className='text-center'>
    <h2 className=' archive text-2xl'>99.99% Pure</h2>
    <p className='yellow oregano -mt-5 text-3xl '>Copper Wiver</p>
  </span>
  <span>
    <h2 className=' archive text-2xl'>RANGE OF</h2>
    <p className='yellow oregano -mt-5 text-3xl'>Quality Products</p>
  </span>
</div>

          <h2 className=' archive text-center text-[#d52720] text-4xl mt-14'>
    TECHNICAL DATA <br /> & SPECIFICATIONS
  </h2>
 
 <div>
 <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Types of Fans</TableCell>
              <TableCell align="center">Size(mm)</TableCell>
              <TableCell align="center">Size(inch)</TableCell>
              <TableCell align="center">R.P.M</TableCell>
              <TableCell align="center">Watts</TableCell>
              <TableCell align="center">Air Delivery</TableCell>
              <TableCell align="center">Service Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Ceiling Fans</TableCell>
              <TableCell align="center">900<br />1200<br />1400</TableCell>
              <TableCell align="center">36<br />48<br />56</TableCell>
              <TableCell align="center">525<br />425<br />375</TableCell>
              <TableCell align="center">80<br />90<br />100</TableCell>
              <TableCell align="center">5000<br />8500<br />11500</TableCell>
              <TableCell align="center">62.50<br />94.40<br />115.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Pedestal Fans</TableCell>
              <TableCell align="center">550<br />600</TableCell>
              <TableCell align="center">22<br />24</TableCell>
              <TableCell align="center">1350<br />1300</TableCell>
              <TableCell align="center">110<br />135</TableCell>
              <TableCell align="center">6500<br />7500</TableCell>
              <TableCell align="center">59.09<br />55.55</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Exhaust Fans (Plastic Body)</TableCell>
              <TableCell align="center">200<br />250<br />300</TableCell>
              <TableCell align="center">8<br />10<br />12</TableCell>
              <TableCell align="center">1260<br />1260<br />1175</TableCell>
              <TableCell align="center">30<br />35<br />45</TableCell>
              <TableCell align="center">560<br />625<br />775</TableCell>
              <TableCell align="center">18.67<br />17.85<br />17.22</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Exhaust Fans (Metal Body)</TableCell>
              <TableCell align="center">
                200<br />250<br />300<br />350<br />400<br />450<br />500<br />600
              </TableCell>
              <TableCell align="center">
                8<br />10<br />12<br />14<br />16<br />18<br />20<br />24
              </TableCell>
              <TableCell align="center">
                1350<br />1350<br />1350<br />1350<br />1350<br />1200<br />1200<br />1200
              </TableCell>
              <TableCell align="center">
                40<br />50<br />50<br />90<br />90<br />105<br />155<br />185
              </TableCell>
              <TableCell align="center">
                451<br />600<br />750<br />1500<br />1500<br />2500<br />3835<br />3710
              </TableCell>
              <TableCell align="center">
                11.27<br />12.00<br />15.00<br />16.67<br />16.67<br />23.81<br />24.74<br />25.46
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Wall Bracket</TableCell>
              <TableCell align="center">450</TableCell>
              <TableCell align="center">18</TableCell>
              <TableCell align="center">1225</TableCell>
              <TableCell align="center">65</TableCell>
              <TableCell align="center">3900</TableCell>
              <TableCell align="center">60.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
</div>
      <p className="text-center raleway-lite mt-4">
      Rated Volatage : 230 ± IOV- AC Cycles : 50 Hz Type : Capacitors for all Fans
10% Variation in air delivery & Power Consumption.
Note: All the specifications mentioned above are in accordance with 99-99% pure Copper Windig wire.
      </p>
    </TableContainer>
  );
}
