
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  policyNumber: "",
  claimAmount: "",
  dateOfIncident: "",
  incidentDescription: "",
  contact: "",
  address: "",
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const claimSchema = yup.object().shape({
  policyNumber: yup.string().required("Policy Number is required"),
  claimAmount: yup.number().required("Claim Amount is required"),
  dateOfIncident: yup.date().required("Date of Incident is required"),
  incidentDescription: yup.string().required("Incident Description is required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Contact Number is required"),
  address: yup.string().required("Address is required"),
});

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://localhost:8081/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Claim submitted successfully!");
        actions.resetForm({ values: initialValues });
      } else {
        alert("Submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="APPLY FOR INSURANCE CLAIM" subtitle="Submit Your Claim Details" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={claimSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
              
              <TextField fullWidth variant="filled" type="text" label="Policy Number" onBlur={handleBlur}
                onChange={handleChange} value={values.policyNumber} name="policyNumber"
                error={touched.policyNumber && Boolean(errors.policyNumber)} helperText={touched.policyNumber && errors.policyNumber}
                sx={{ gridColumn: "span 2" }} />

              <TextField fullWidth variant="filled" type="number" label="Claim Amount" onBlur={handleBlur}
                onChange={handleChange} value={values.claimAmount} name="claimAmount"
                error={touched.claimAmount && Boolean(errors.claimAmount)} helperText={touched.claimAmount && errors.claimAmount}
                sx={{ gridColumn: "span 2" }} />

              <TextField fullWidth variant="filled" type="date" label="Date of Incident" onBlur={handleBlur}
                onChange={handleChange} value={values.dateOfIncident} name="dateOfIncident" InputLabelProps={{ shrink: true }}
                error={touched.dateOfIncident && Boolean(errors.dateOfIncident)} helperText={touched.dateOfIncident && errors.dateOfIncident}
                sx={{ gridColumn: "span 4" }} />

              <TextField fullWidth variant="filled" type="text" label="Incident Description" onBlur={handleBlur}
                onChange={handleChange} value={values.incidentDescription} name="incidentDescription" multiline rows={4}
                error={touched.incidentDescription && Boolean(errors.incidentDescription)} helperText={touched.incidentDescription && errors.incidentDescription}
                sx={{ gridColumn: "span 4" }} />

              <TextField fullWidth variant="filled" type="text" label="Contact Number" onBlur={handleBlur}
                onChange={handleChange} value={values.contact} name="contact"
                error={touched.contact && Boolean(errors.contact)} helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }} />

              <TextField fullWidth variant="filled" type="text" label="Address" onBlur={handleBlur}
                onChange={handleChange} value={values.address} name="address"
                error={touched.address && Boolean(errors.address)} helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }} />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">Submit Claim</Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
