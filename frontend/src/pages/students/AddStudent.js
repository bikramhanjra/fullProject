import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { Typography, Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";

export default function AddStudent({
  onHandleView,
  onHandleAddStudent,
  viewButton,
  student,
}) {
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (data) => {
    onHandleAddStudent(data);
  };

  const [snackbar, setSnackBar] = useState({
    open: false,
    message: "",
    vertical: "top",
    horizontal: "right",
  });

  const handleOpen = (message) => {
    setSnackBar((prev) => ({ ...prev, open: true, message: message }));
  };

  const handleClose = () => {
    setSnackBar({ ...snackbar, open: false });
  };

  async function onSubmit(data) {
    console.log(data);
    // const emailFormat = await checkFormat(data);

    // if (!emailFormat.isValid) {
    //   handleOpen(emailFormat.message);
    //   return;
    // }

    try {
      const res = await fetch("http://localhost:3000/api/v1/student", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const studentData = await res.json();
      if (!studentData.success && studentData.errors) {
        const error = studentData.errors[0].msg;
        handleOpen(error);
        return;
      } else if (studentData.success === true) {
        handleOpen("Student Added");
        setTimeout(function () {
          onHandleView("getStudent");
        }, 2000);
      } else {
        throw new Error(studentData.message);
      }
    } catch (error) {
      handleOpen(error.message);
      console.log("Post Error is", error);
    }
  }

  // async function checkFormat(data) {
  //   if (!data.email) {
  //     return { isValid: false, message: "Email is required" };
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(data.email)) {
  //     return { isValid: false, message: "Invalid Email Format" };
  //   }
  //   if (!data.dob) {
  //     return { isValid: false, message: "Dob is required" };
  //   }
  //   return { isValid: true };
  // }

  async function onUpdateSubmit(data) {
    const studentId = data._id;
    console.log(data);
    // const emailFormat = await checkFormat(data);

    // if (!emailFormat.isValid) {
    //   handleOpen(emailFormat.message);
    //   return;
    // }

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/student/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const studentData = await res.json();
      console.log("it is student data", studentData);
      if (!studentData.success && studentData.errors) {
        const error = studentData.errors[0].msg;
        handleOpen(error);
        return;
      } else if (studentData.success === true) {
        handleOpen("Student Updated");
        setTimeout(function () {
          onHandleView("getStudent");
        }, 2000);
      } else {
        throw new Error(studentData.message);
      }
    } catch (error) {
      handleOpen(error.message);
      console.log("PATCH Error is", error);
    }
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: brown[500],
          minWidth: "380px",
        }}
      >
        <Container
          sx={{
            width: { sx: 0, sm: "50vw", md: "65vw", lg: "60vw", xl: "36vw" },
            height: {
              xs: "63rem",
              sm: "64rem",
              md: "90vh",
            },
            paddingTop: {
              xs: "1rem",
              md: "1rem",
              lg: "2rem",
              xl: "5rem",
            },
          }}
        >
          <Snackbar
            anchorOrigin={{
              vertical: snackbar.vertical,
              horizontal: snackbar.horizontal,
            }}
            open={snackbar.open}
            onClose={handleClose}
            message={snackbar.message}
            key={snackbar.vertical + snackbar.horizontal}
            autoHideDuration={5000}
          />
          <Typography variant="h2" textAlign="center" color="white">
            {viewButton === "addButton" ? "Add Student" : "Update Student"}
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "25ch",
                color: "white",
                marginTop: 6,
                marginLeft: { xs: "4rem", md: "1.5rem" },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Dob"
                name="dob"
                value={student.dob ? dayjs(student.dob) : null}
                onChange={(newValue) => {
                  if (dayjs.isDayjs(newValue) && newValue.isValid()) {
                    handleChange({
                      target: {
                        name: "dob",
                        value: newValue.toISOString(),
                      },
                    });
                  } else {
                    handleChange({
                      target: {
                        name: "dob",
                        value: "",
                      },
                    });
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={student.email}
              onChange={handleChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={student.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Fees Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Fees-amount"
                name="feesPaid"
                value={student.feesPaid}
                type="number"
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
              }}
            >
              <InputLabel id="status-label" sx={{ color: "white" }}>
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                sx={{ color: "white" }}
                name="status"
                value={student.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inActive">In Active</MenuItem>
              </Select>
            </FormControl>
            {viewButton === "addButton" ? (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onSubmit(student)}
              >
                Add Student
              </Button>
            ) : (
              <Button
                sx={{
                  marginTop: 9,
                  backgroundColor: brown[900],
                  marginLeft: "2rem",
                }}
                variant="contained"
                onClick={() => onUpdateSubmit(student)}
              >
                Update Student
              </Button>
            )}

            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={() => onHandleView("getStudent")}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
