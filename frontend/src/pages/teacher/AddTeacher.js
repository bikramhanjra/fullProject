import TextField from "@mui/material/TextField";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";

export default function AddTeacher({
  onHandleView,
  onHandleAddTeacher,
  teacher,
  viewButton,
}) {
  const token = localStorage.getItem("token");
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: "",
    vertical: "top",
    horizontal: "right",
  });

  const handleOpen = (message) => {
    setSnackBar({
      open: true,
      message,
      vertical: "top",
      horizontal: "right",
    });
  };

  const handleClose = () => {
    setSnackBar({ ...snackbar, open: false });
  };

  const handleChange = (data) => {
    onHandleAddTeacher(data);
  };

  async function onSubmit(data) {
    const emailFormat = await checkFormat(data);

    try {
      if (!emailFormat.isValid) {
        throw new Error(emailFormat.message);
      }
      const res = await fetch("http://localhost:3000/api/v1/teacher", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const teacherData = await res.json();
      if (teacherData.success === true) {
        handleOpen("Added");
        setTimeout(() => {
          onHandleView("getTeacher");
        }, 2000);
      } else {
        throw new Error(teacherData.message);
      }
    } catch (error) {
      console.log(error);
      handleOpen(error.message);
    }
  }

   async function checkFormat(data) {
    if (!data.email) {
      return { isValid: false, message: "Email is required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { isValid: false, message: "Invalid Email Format" };
    }
    if (!data.dob){
      return {isValid : false, message: "Dob is required"}
    }
    return { isValid: true };
  }

  async function onUpdateSubmit(data) {
    const teacherId = data._id;
    const emailFormat = await checkFormat(data);

    try {
      if (!emailFormat.isValid) {
        throw new Error(emailFormat.message);
      }
      const res = await fetch(
        `http://localhost:3000/api/v1/teacher/${teacherId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const teacherData = await res.json();
      if (teacherData.success === true) {
        handleOpen("Updated");
        setTimeout(() => {
          onHandleView("getTeacher");
        }, 2000);
      } else {
        throw new Error(teacherData.message);
      }
    } catch (error) {
      console.log(error);
      handleOpen(error.message);
    }
  }

  return (
    <>
      <Box
        sx={{
          minWidth: "380px",
          bgcolor: brown[500],
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
        <Container
          sx={{
            width: { sx: 0, sm: "50vw", md: "65vw", lg: "60vw", xl: "36vw" },
            height: {
              xs: "53rem",
              sm: "54rem",
              md: "80vh",
            },
            paddingTop: {
              xs: "1rem",
              md: "1rem",
              lg: "2rem",
              xl: "5rem",
            },
          }}
        >
          <Typography variant="h2" textAlign="center" color="white">
            {viewButton === "addButton" ? "Add Teacher" : "Update Teacher"}
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
              value={teacher.name}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Dob"
                name="dob"
                value={teacher.dob ? dayjs(teacher.dob) : null}
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
              value={teacher.email}
              type="email"
              onChange={handleChange}
            />
            <TextField
              label="Salary"
              variant="outlined"
              name="salary"
              type="number"
              inputProps={{ min: 0 }}
              value={teacher.salary}
              onChange={handleChange}
            />

            {/* <FormControl
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
              </FormControl> */}

            {viewButton === "addButton" ? (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onSubmit(teacher)}
              >
                Add Teacher
              </Button>
            ) : (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onUpdateSubmit(teacher)}
              >
                Update Teacher
              </Button>
            )}
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={() => onHandleView("getTeacher")}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
