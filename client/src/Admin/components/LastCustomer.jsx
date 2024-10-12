import { Box, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../redux/Slices/messageSlice';
import MessagesTable from './MessagesTable';
import MiniMessageTable from './MiniMessageTable.jsx';

const LastCustomer = ({dateRange}) => {
  const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);

    const { data, isLoading, isError } = useSelector((state) => state.messages);
  
    useEffect(() => {
      if (data.data) {
        setMessages(data.data);
      }
    }, [data.data]);
    useEffect(() => {
      dispatch(fetchMessages(dateRange));
    }, [dispatch, dateRange]);

    return (
        <Box sx={{ display: "grid", gridTemplateRows: "repeat(4, 1fr)" }}>
            <Typography sx={{ mx: 2, mt: 2 }} variant='h6'>
                Customer Support
            </Typography>
            <Box sx={{ gridRow: "2/5", display: "flex", alignItems: "center", justifyContent: "center " }}>
            {Array.isArray(messages) ? <Box>
                <MiniMessageTable  dateRange={dateRange}/>
            </Box> : <ChatIcon sx={{ fontSize: "60px", color: "gray", opacity:0.3 }} />}
            
 

            </Box>
        </Box>
    )
}

export default LastCustomer
