import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../redux/Slices/messageSlice";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

// Define columns based on your new data structure
const columns = [
  // { field: "id", headerName: "#", width: 80 },
  { field: "idz", headerName: "#", width: 80 },
  { field: "name", headerName: "Name", width: 100 },
  {
    field: "subject",
    headerName: "Subject",
    width: 150,
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

const MiniMessageTable = ({ dateRange }) => {
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
  }));

  return (
    <Box sx={{ height: "25vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={2} 
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        pagination={false} 
        hideFooter={true} 
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#e7edf3",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "black",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "#e7edf3",
          },
          "& .MuiDataGrid-cell": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      />
    </Box>
  );
};

export default MiniMessageTable;
