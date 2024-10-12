import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../redux/Slices/messageSlice";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const columns = [

  { field: "idz", headerName: "#", width: 30 },

  { field: "name", headerName: "Name", width: 200 },
  {
    field: "subject",
    headerName: "Subject",
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  { field: "phone", headerName: "Phone", width: 200 },
  {
    field: "message",
    headerName: "Message",
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {params.value}
      </Box>
    ),
  },
];

const MessagesTable = ({ dateRange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  if (isLoading)
    return (
      <div
        style={{
          height: "50vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  if (isError) return <div>Error fetching messages</div>;

  const handleRowClick = (params) => {
    const messageId = params.row.id;
    navigate(`/admin/message-page/${messageId}`);
  };
  // Format data to fit DataGrid structure
  const rows = messages.map((item, index) => ({
    idz:index + 1,
    id: item._id,
    name: item.name,
    subject: item.subject,
    email: item.email,
    phone: item.phone,
    message: item.message,
  }));

  return (
    <Box sx={{ height: "74vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[8]}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#e7edf3",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "black",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "#e7edf3", // Change this to your desired background color
          },
          "& .MuiDataGrid-cell": {
            overflow: "hidden", // Ensures cell content doesn't overflow
            textOverflow: "ellipsis", // Adds ellipsis when text overflows
            whiteSpace: "nowrap", // Prevents text from wrapping
          },
        }}
      />
    </Box>
  );
};

export default MessagesTable;
