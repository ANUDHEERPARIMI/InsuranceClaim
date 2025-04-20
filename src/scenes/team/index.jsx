import { useState, useEffect } from "react";
import { Box, Button, Link, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

// Define the ClaimStatus Enum-like object
const ClaimStatus = {
  ON_HOLD: "ON_HOLD",
  ACCEPTED: "ACCEPTED",
  NOT_ACCEPTED: "NOT_ACCEPTED",
};

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [claims, setClaims] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8084/claims/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const claimsWithId = data.map((claim) => ({
  //         ...claim,
  //         id: claim.empid, // Use 'empid' as the unique 'id' for the DataGrid
  //       }));
  //       setClaims(claimsWithId);
  //     })
  //     .catch((error) => console.error("Error fetching claims:", error));
  // }, []);
  useEffect(() => {
    fetch("http://localhost:8073/claims")
      .then((response) => response.json())
      .then((data) => {
        const claimsWithId = data.map((claim) => ({
          ...claim,
          id: claim.empid, // Use 'empid' as the unique 'id' for the DataGrid
        }));
        setClaims(claimsWithId);
      })
      .catch((error) => console.error("Error fetching claims:", error));
  }, []);

  const handleStatusChange = (empid, status) => {
    fetch(`http://localhost:8084/claims/update-status/${empid}?status=${status}`, {
      method: "PUT",
    })
      .then((response) => response.text())
      .then(() => {
        setClaims((prevClaims) =>
          prevClaims.filter((claim) => claim.empid !== empid)
        );
      })
      .catch((error) => console.error("Error updating claim status:", error));
  };
  

  const columns = [
    {
      field: "id",
      headerName: "Employee ID",
      width: 100,
      renderCell: (params) => {
        const filePath = params.row.filePath; 
        return (
          <Link
            href={`http://localhost:8084/uploads/${filePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.value}
          </Link>
        );
      }
      
    },
    { field: "policyNumber", headerName: "Policy Number", flex: 1 },
    { field: "claimAmount", headerName: "Claim Amount", type: "number", flex: 1 },
    { field: "dateOfIncident", headerName: "Date of Incident", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "incidentDescription", headerName: "Incident Description", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "doctorEmail", headerName: "Doctor Email", flex: 1 },
    { field: "doctorName", headerName: "Doctor Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleStatusChange(params.row.id, ClaimStatus.ACCEPTED)}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleStatusChange(params.row.id, ClaimStatus.NOT_ACCEPTED)}
            sx={{ ml: 1 }}
          >
            Deny
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Claims" subtitle="Managing Claims" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
          "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
        }}
      >
        <DataGrid
          rows={claims}
          columns={columns}
          pageSize={10}
          rowHeight={60}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Team;
// import { useState, useEffect } from "react";
// import { Box, Button, Link, useTheme, Modal, Typography, Card, CardContent, Grid } from "@mui/material";
// import { Header } from "../../components";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";

// const ClaimStatus = {
//   ON_HOLD: "ON_HOLD",
//   ACCEPTED: "ACCEPTED",
//   NOT_ACCEPTED: "NOT_ACCEPTED",
// };

// const Team = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [claims, setClaims] = useState([]);
//   const [selectedClaim, setSelectedClaim] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   // useEffect(() => {
//   //   fetch("http://localhost:8084/claims/all")
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       const claimsWithId = data.map((claim) => ({
//   //         ...claim,
//   //         id: claim.empid,
//   //       }));
//   //       setClaims(claimsWithId);
//   //     })
//   //     .catch((error) => console.error("Error fetching claims:", error));
//   // }, []);
//     useEffect(() => {
//     fetch("http://localhost:8073/claims")
//       .then((response) => response.json())
//       .then((data) => {
//         const claimsWithId = data.map((claim) => ({
//           ...claim,
//           id: claim.empid, // Use 'empid' as the unique 'id' for the DataGrid
//         }));
//         setClaims(claimsWithId);
//       })
//       .catch((error) => console.error("Error fetching claims:", error));
//   }, []);
  

//   const handleStatusChange = (empid, status) => {
//     fetch(`http://localhost:8084/claims/update-status/${empid}?status=${status}`, {
//       method: "PUT",
//     })
//       .then((response) => response.text())
//       .then(() => {
//         setClaims((prevClaims) => prevClaims.filter((claim) => claim.empid !== empid));
//       })
//       .catch((error) => console.error("Error updating claim status:", error));
//   };

//   const handleOpenModal = (claim) => {
//     setSelectedClaim(claim);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const staticClaims = [
//     { id: 1, title: "Policy#1 (90123)", description: "Covers medical expenses", policyNumber: "H123456" },
//     { id: 2, title: "Policy#2 (90345)", description: "Covers vehicle damages", policyNumber: "V987654" },
//     { id: 3, title: "Policy#3 (90658)", description: "Covers property loss", policyNumber: "P567890" },
//   ];

//   const columns = [
//     { field: "id", headerName: "Employee ID", width: 100 },
//     { field: "policyNumber", headerName: "Policy Number", flex: 1 },
//     { field: "claimAmount", headerName: "Claim Amount", type: "number", flex: 1 },
//     { field: "dateOfIncident", headerName: "Date of Incident", flex: 1 },
//     { field: "contactNumber", headerName: "Contact Number", flex: 1 },
//     { field: "incidentDescription", headerName: "Incident Description", flex: 1 },
//     { field: "address", headerName: "Address", flex: 1 },
//     { field: "doctorEmail", headerName: "Doctor Email", flex: 1 },
//     { field: "doctorName", headerName: "Doctor Name", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 2,
//       renderCell: (params) => (
//         <>
//           <Button variant="contained" color="success" onClick={() => handleStatusChange(params.row.id, ClaimStatus.ACCEPTED)}>
//             Accept
//           </Button>
//           <Button variant="contained" color="error" onClick={() => handleStatusChange(params.row.id, ClaimStatus.NOT_ACCEPTED)} sx={{ ml: 1 }}>
//             Deny
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="Claims" subtitle="Managing Claims" />

//       {/* Static Data Blocks */}
//       <Grid container spacing={2} mt={2}>
//         {staticClaims.map((claim) => (
//           <Grid item xs={4} key={claim.id}>
//             <Card sx={{ cursor: "pointer", backgroundColor: colors.blueAccent[700], color: "white" }} onClick={() => handleOpenModal(claim)}>
//               <CardContent>
//                 <Typography variant="h6">{claim.title}</Typography>
//                 <Typography variant="body2">{claim.description}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Claims Table */}
//       <Box mt="40px" height="75vh" sx={{ "& .MuiDataGrid-root": { border: "none" }, "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] }, "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] } }}>
//         <DataGrid rows={claims} columns={columns} pageSize={10} rowHeight={60} checkboxSelection />
//       </Box>

//       {/* Modal for Claim Details */}
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "white",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           {selectedClaim && (
//             <>
//               <Typography variant="h6" gutterBottom>
//                 {selectedClaim.title}
//               </Typography>
//               <Typography variant="body1">Description: {selectedClaim.description}</Typography>
//               <Typography variant="body1">Policy Number: {selectedClaim.policyNumber}</Typography>
//             </>
//           )}
//           <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Team;
