// import { Box, Button, TextField, useMediaQuery, List, ListItem, ListItemText } from "@mui/material";
// import { styled } from '@mui/material/styles';
// import { Header } from "../../components";
// import { Formik } from "formik";
// import * as yup from "yup";

// const initialValues = {
//   policyNumber: "",
//   claimAmount: "",
//   dateOfIncident: "",
//   incidentDescription: "",
//   contact: "",
//   address: "",
//   proofFile: null,
//   employeeId: "",
// };

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const claimSchema = yup.object().shape({
//   policyNumber: yup.string().required("Policy Number is required"),
//   claimAmount: yup.number().required("Claim Amount is required"),
//   dateOfIncident: yup.date().required("Date of Incident is required"),
//   incidentDescription: yup.string().required("Incident Description is required"),
//   contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Contact Number is required"),
//   address: yup.string().required("Address is required"),
//   employeeId: yup.string().required("Employee ID is required"),
//   proofFile: yup.mixed().required("You need to provide a file").test("fileType", "Invalid file type", (value) => {
//     return value && value.type === "application/pdf"; // Example: allow only PDF files
//   }),
// });

// const Form = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   const handleFormSubmit = async (values, actions) => {
//     try {
//       const formData = new FormData();
//       formData.append("policyNumber", values.policyNumber);
//       formData.append("claimAmount", values.claimAmount);
//       formData.append("dateOfIncident", values.dateOfIncident);
//       formData.append("incidentDescription", values.incidentDescription);
//       formData.append("contact", values.contact);
//       formData.append("address", values.address);
//       formData.append("employeeId", values.employeeId);
//       if (values.proofFile) {
//         formData.append("proofFile", values.proofFile);
//       }

//       const response = await fetch("http://localhost:8082/api/claim-form/submit", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Claim submitted successfully!");
//         actions.resetForm({ values: initialValues });
//       } else {
//         alert("Submission failed!");
//       }
//     } catch (error) {
//       console.error("Error submitting form", error);
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="APPLY FOR INSURANCE CLAIM" subtitle="Submit Your Claim Details" />

//       <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={claimSchema}>
//         {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
//           <form onSubmit={handleSubmit}>
//             <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
              
//               <TextField fullWidth variant="filled" type="text" label="Policy Number" onBlur={handleBlur}
//                 onChange={handleChange} value={values.policyNumber} name="policyNumber"
//                 error={touched.policyNumber && Boolean(errors.policyNumber)} helperText={touched.policyNumber && errors.policyNumber}
//                 sx={{ gridColumn: "span 2" }} />

//               <TextField fullWidth variant="filled" type="number" label="Claim Amount" onBlur={handleBlur}
//                 onChange={handleChange} value={values.claimAmount} name="claimAmount"
//                 error={touched.claimAmount && Boolean(errors.claimAmount)} helperText={touched.claimAmount && errors.claimAmount}
//                 sx={{ gridColumn: "span 2" }} />

//               <TextField fullWidth variant="filled" type="date" label="Date of Incident" onBlur={handleBlur}
//                 onChange={handleChange} value={values.dateOfIncident} name="dateOfIncident" InputLabelProps={{ shrink: true }}
//                 error={touched.dateOfIncident && Boolean(errors.dateOfIncident)} helperText={touched.dateOfIncident && errors.dateOfIncident}
//                 sx={{ gridColumn: "span 4" }} />

//               <TextField fullWidth variant="filled" type="text" label="Incident Description" onBlur={handleBlur}
//                 onChange={handleChange} value={values.incidentDescription} name="incidentDescription" multiline rows={4}
//                 error={touched.incidentDescription && Boolean(errors.incidentDescription)} helperText={touched.incidentDescription && errors.incidentDescription}
//                 sx={{ gridColumn: "span 4" }} />

//               <TextField fullWidth variant="filled" type="text" label="Contact Number" onBlur={handleBlur}
//                 onChange={handleChange} value={values.contact} name="contact"
//                 error={touched.contact && Boolean(errors.contact)} helperText={touched.contact && errors.contact}
//                 sx={{ gridColumn: "span 4" }} />

//               <TextField fullWidth variant="filled" type="text" label="Address" onBlur={handleBlur}
//                 onChange={handleChange} value={values.address} name="address"
//                 error={touched.address && Boolean(errors.address)} helperText={touched.address && errors.address}
//                 sx={{ gridColumn: "span 4" }} />

//               <TextField fullWidth variant="filled" type="text" label="Employee ID" onBlur={handleBlur}
//                 onChange={handleChange} value={values.employeeId} name="employeeId"
//                 error={touched.employeeId && Boolean(errors.employeeId)} helperText={touched.employeeId && errors.employeeId}
//                 sx={{ gridColumn: "span 4" }} />
//             </Box>

//             <Button
//               component="label"
//               variant="contained"
//               tabIndex={-1}
//             >
//               Upload Proof File
//               <VisuallyHiddenInput
//                 type="file"
//                 onChange={(e) => setFieldValue("proofFile", e.currentTarget.files[0])}
//                 value={""} // Reset the value to allow re-selection
//               />
//             </Button>

//             <Box mt="20px">
//               <strong>Uploaded Documents:</strong>
//               <List>
//                 {values.proofFile ? (
//                   <ListItem>
//                     <ListItemText primary={values.proofFile.name} />
//                   </ListItem>
//                 ) : (
//                   <ListItem>
//                     <ListItemText primary="No file uploaded" />
//                   </ListItem>
//                 )}
//               </List>
//             </Box>

//             <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">Submit Claim</Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default Form;
// import React from "react";
// import { Box, Button, TextField, useMediaQuery, List, ListItem, ListItemText } from "@mui/material";
// import { styled } from '@mui/material/styles';
// import { Formik } from "formik";
// import * as yup from "yup";
// import axios from 'axios';

// // Initial values matching the ClaimForm entity
// const initialValues = {
//   empid: "",
//   policyNumber: "",
//   claimAmount: "",
//   dateOfIncident: "",
//   incidentDescription: "",
//   contactNumber: "",
//   address: "",
//   doctorEmail: "",
//   proofFile: null,
//   doctorName: "",
// };

// // Styles for hidden input for file upload button
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// // Regex for phone validation (You can adjust the regex as needed)
// const phoneRegExp = /^[0-9]{10}$/;

// // Yup validation schema
// const claimSchema = yup.object().shape({
//   empid: yup.string().required("Employee ID is required"),
//   policyNumber: yup.string().required("Policy Number is required"),
//   claimAmount: yup.string().required("Claim Amount is required"),
//   dateOfIncident: yup.string().required("Date of Incident is required"),
//   incidentDescription: yup.string().required("Incident Description is required"),
//   contactNumber: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Contact Number is required"),
//   address: yup.string().required("Address is required"),
//   doctorEmail: yup.string().email("Invalid email").required("Doctor Email is required"),
//   doctorName: yup.string().required("Doctor Name is required"),
//   proofFile: yup.mixed().required("You need to provide a file").test("fileType", "Invalid file type", (value) => {
//     return value && value.type === "application/pdf"; // Example: allow only PDF files
//   }),
// });

// const ClaimForm = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   const handleFormSubmit = async (values, actions) => {
//     try {
//       const formData = new FormData();
//       formData.append("empid", Number(values.empid));  // Ensure empid is a number
//       formData.append("policyNumber", Number(values.policyNumber));  // Ensure policyNumber is a number
//       formData.append("claimAmount", Number(values.claimAmount));  // Ensure claimAmount is a number
//       formData.append("dateOfIncident", values.dateOfIncident);
//       formData.append("incidentDescription", values.incidentDescription);
//       formData.append("contactNumber", values.contactNumber);
//       formData.append("address", values.address);
//       formData.append("doctorEmail", values.doctorEmail);
//       formData.append("doctorName", values.doctorName);
//       if (values.proofFile) {
//         formData.append("file", values.proofFile); // Corrected to 'file'
//       }

//       const response = await axios.post("http://localhost:8083/api/claim-form/submit", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         alert("Claim submitted successfully!");
//         actions.resetForm({ values: initialValues });
//       } else {
//         alert("Submission failed!");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error.response?.data || error.message);
//       alert("Submission failed! Please try again.");
//     }
//   };

//   return (
//     <Box m="20px">
//       <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={claimSchema}>
//         {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
//           <form onSubmit={handleSubmit}>
//             <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
//               <TextField fullWidth variant="filled" type="text" label="Employee ID" onBlur={handleBlur}
//                 onChange={handleChange} value={values.empid} name="empid"
//                 error={touched.empid && Boolean(errors.empid)} helperText={touched.empid && errors.empid}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Policy Number" onBlur={handleBlur}
//                 onChange={handleChange} value={values.policyNumber} name="policyNumber"
//                 error={touched.policyNumber && Boolean(errors.policyNumber)} helperText={touched.policyNumber && errors.policyNumber}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Claim Amount" onBlur={handleBlur}
//                 onChange={handleChange} value={values.claimAmount} name="claimAmount"
//                 error={touched.claimAmount && Boolean(errors.claimAmount)} helperText={touched.claimAmount && errors.claimAmount}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Date of Incident" onBlur={handleBlur}
//                 onChange={handleChange} value={values.dateOfIncident} name="dateOfIncident" InputLabelProps={{ shrink: true }}
//                 error={touched.dateOfIncident && Boolean(errors.dateOfIncident)} helperText={touched.dateOfIncident && errors.dateOfIncident}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Incident Description" onBlur={handleBlur}
//                 onChange={handleChange} value={values.incidentDescription} name="incidentDescription" multiline rows={4}
//                 error={touched.incidentDescription && Boolean(errors.incidentDescription)} helperText={touched.incidentDescription && errors.incidentDescription}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Contact Number" onBlur={handleBlur}
//                 onChange={handleChange} value={values.contactNumber} name="contactNumber"
//                 error={touched.contactNumber && Boolean(errors.contactNumber)} helperText={touched.contactNumber && errors.contactNumber}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Address" onBlur={handleBlur}
//                 onChange={handleChange} value={values.address} name="address"
//                 error={touched.address && Boolean(errors.address)} helperText={touched.address && errors.address}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Doctor Email" onBlur={handleBlur}
//                 onChange={handleChange} value={values.doctorEmail} name="doctorEmail"
//                 error={touched.doctorEmail && Boolean(errors.doctorEmail)} helperText={touched.doctorEmail && errors.doctorEmail}
//                 sx={{ gridColumn: "span 4" }} />
//               <TextField fullWidth variant="filled" type="text" label="Doctor Name" onBlur={handleBlur}
//                 onChange={handleChange} value={values.doctorName} name="doctorName"
//                 error={touched.doctorName && Boolean(errors.doctorName)} helperText={touched.doctorName && errors.doctorName}
//                 sx={{ gridColumn: "span 4" }} />
//             </Box>

//             <Button component="label" variant="contained" tabIndex={-1}>
//               Upload Proof File
//               <VisuallyHiddenInput
//                 type="file"
//                 onChange={(e) => setFieldValue("proofFile", e.currentTarget.files[0])}
//                 value={""} // Reset the value to allow re-selection
//               />
//             </Button>

//             <Box mt="20px">
//               <strong>Uploaded Documents:</strong>
//               <List>
//                 {values.proofFile ? (
//                   <ListItem>
//                     <ListItemText primary={values.proofFile.name} />
//                   </ListItem>
//                 ) : (
//                   <ListItem>
//                     <ListItemText primary="No file uploaded" />
//                   </ListItem>
//                 )}
//               </List>
//             </Box>

//             <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">Submit Claim</Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default ClaimForm;
import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Card, CardContent } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';

const initialValues = { empid: "", policyNumber: "", claimAmount: "", dateOfIncident: "", incidentDescription: "", contactNumber: "", address: "", doctorEmail: "", proofFile: null, doctorName: "" };

const VisuallyHiddenInput = styled('input')({ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1, });

const phoneRegExp = /^[0-9]{10}$/;

const claimSchema = yup.object().shape({
  empid: yup.string().required("Employee ID is required"),
  policyNumber: yup.string().required("Policy Number is required"),
  claimAmount: yup.string().required("Claim Amount is required"),
  dateOfIncident: yup.string().required("Date of Incident is required"),
  incidentDescription: yup.string().required("Incident Description is required"),
  contactNumber: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Contact Number is required"),
  address: yup.string().required("Address is required"),
  doctorEmail: yup.string().email("Invalid email").required("Doctor Email is required"),
  doctorName: yup.string().required("Doctor Name is required"),
  proofFile: yup.mixed().required("You need to provide a file").test("fileType", "Invalid file type", (value) => value && value.type === "application/pdf"),
});

const ClaimForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleFormSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("empid", Number(values.empid));
      formData.append("policyNumber", Number(values.policyNumber));
      formData.append("claimAmount", Number(values.claimAmount));
      formData.append("dateOfIncident", values.dateOfIncident);
      formData.append("incidentDescription", values.incidentDescription);
      formData.append("contactNumber", values.contactNumber);
      formData.append("address", values.address);
      formData.append("doctorEmail", values.doctorEmail);
      formData.append("doctorName", values.doctorName);
      if (values.proofFile) formData.append("file", values.proofFile);

      const response = await axios.post("http://localhost:8083/api/claim-form/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (response.status === 200) {
        alert("Claim submitted successfully!");
        actions.resetForm({ values: initialValues });
      } else {
        alert("Submission failed!");
      }
    } catch (error) {
      alert("Submission failed! Please try again.");
    }
  };

  const claimSamples = [
    {  policyNumber: "5001", claimAmount: "2000", dateOfIncident: "2024-02-01" },
    {  policyNumber: "5002", claimAmount: "3500", dateOfIncident: "2024-01-15" },
    { policyNumber: "5003", claimAmount: "5000", dateOfIncident: "2024-01-30" },
  ];

  return (
    <Box m="20px">
      <Box display="flex" gap="20px" mb="20px">
        {claimSamples.map((claim, index) => (
          <Card key={index} onClick={() => { setSelectedClaim(claim); setOpen(true); }} sx={{ cursor: "pointer", p: 2, width: "30%", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">Claim {index + 1}</Typography>
              <Typography>Policy: {claim.policyNumber}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Claim Details</DialogTitle>
        <DialogContent>
          {selectedClaim && Object.entries(selectedClaim).map(([key, value]) => (
            <Typography key={key}><strong>{key}:</strong> {value}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={claimSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
              {Object.keys(initialValues).map((key) => (
                key !== "proofFile" && <TextField key={key} fullWidth variant="filled" label={key} onBlur={handleBlur} onChange={handleChange} value={values[key]} name={key} error={touched[key] && Boolean(errors[key])} helperText={touched[key] && errors[key]} sx={{ gridColumn: "span 4" }} />
              ))}
            </Box>
            <Button component="label" variant="contained">Upload Proof File
              <VisuallyHiddenInput type="file" onChange={(e) => setFieldValue("proofFile", e.currentTarget.files[0])} />
            </Button>
            <List>
              {values.proofFile ? (<ListItem><ListItemText primary={values.proofFile.name} /></ListItem>) : (<ListItem><ListItemText primary="No file uploaded" /></ListItem>)}
            </List>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">Submit Claim</Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClaimForm;
