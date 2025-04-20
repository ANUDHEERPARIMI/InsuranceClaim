import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar
} from "@mui/material";
import { Header } from "../../components";
import { DownloadOutlined } from "@mui/icons-material";
import { tokens } from "../../theme";
const ClaimSt = {
  ON_HOLD: "ON_HOLD",
  ACCEPTED: "ACCEPTED",
  NOT_ACCEPTED: "NOT_ACCEPTED",
};
function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ClaimStatus,SetClaimStatus]=useState(ClaimSt.ON_HOLD);

  useEffect(() => {
      const id = localStorage.getItem("id");//Retrieve ID from localStorage


    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/employees/${id}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");

        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };
    const getstatus = async () => {
      try {
        const response = await fetch(`http://localhost:8084/claims/status/${id}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");

        const d = await response.json();
        SetClaimStatus(String(d));
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getstatus();
    fetchEmployee();
  }, []);

  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      {/* Profile Info Box */}
      {loading ? (
        <Typography variant="h4" textAlign="center" mt={4}>
          Loading Employee Data...
        </Typography>
      ) : employee ? (
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          p="40px"
          borderRadius="16px"
          boxShadow="6px 10px 16px rgba(0,0,0,0.3)"
          sx={{
            border: "3px solid #bbb",
            transition: "all 0.3s ease-in-out",
            '&:hover': { boxShadow: "8px 12px 18px rgba(0,0,0,0.4)" },
            width: "35%",
            margin: "0 auto",
          }}
        >
          <Avatar src="/path-to-profile-photo.jpg" alt="Profile Photo" sx={{ width: 160, height: 160, marginBottom: "20px" }} />
          <Typography variant="h2" fontWeight="bold" sx={{ p: "20px", textAlign: "center" }}>
            {employee.name}
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center" width="100%" p="10px">
            <Box width="48%" sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Employee ID:</Typography>
              <Typography variant="h5">{employee.empId}</Typography>
            </Box>
            <Box width="48%" sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Role:</Typography>
              <Typography variant="h5">{employee.role}</Typography>
            </Box>
            <Box width="48%" mt={2} sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Department:</Typography>
              <Typography variant="h5">{employee.dept}</Typography>
            </Box>
            <Box width="48%" mt={2} sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Address:</Typography>
              <Typography variant="h5">{employee.address}</Typography>
            </Box>
            <Box width="48%" mt={2} sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Manager Id:</Typography>
              <Typography variant="h5">{employee.managerId}</Typography>
            </Box>
            <Box width="48%" mt={2} sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Email:</Typography>
              <Typography variant="h5">{employee.email}</Typography>
            </Box>
            {/* <Box width="48%" mt={2} sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>Status:</Typography>
              <Typography variant="h5">{ClaimStatus}</Typography>
            </Box> */}
          </Box>
        </Box>
      ) : (
        <Typography variant="h4" textAlign="center" mt={4} color="red">
          Employee Not Found
        </Typography>
      )}
    </Box>
  );
}

export default Dashboard;
