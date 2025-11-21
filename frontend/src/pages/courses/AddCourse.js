import TextField from "@mui/material/TextField";
import { Typography, Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

export default function AddCourse({
  onHandleView,
  onHandleAddCourse,
  course,
  teachers,
  viewButton,
}) {
  const handleChange = (data) => {
    onHandleAddCourse(data);
  };
  const token = localStorage.getItem("token");
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
    const format = await checkFormat(data);

    if (!format.isValid) {
      handleOpen(format.message);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/course", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const courseData = await res.json();
      console.log("it is course data", courseData);
      if (courseData.success) {
        handleOpen("Course Added");
        setTimeout(() => {
          onHandleView("getCourse");
        }, 2000);
      } else {
        throw new Error(courseData.message);
      }
    } catch (error) {
      handleOpen(error.message);
      console.log("Post Error is", error);
    }
  }
  async function checkFormat(data) {
    if (!data.courseName) {
      return { isValid: false, message: "Course Name is Required" };
    }
    if (!data.teacherId) {
      return { isValid: false, message: "Teacher Name is Required" };
    }
    if (!data.courseDuration) {
      return { isValid: false, message: "Course Duration is Required" };
    }
    return { isValid: true };
  }
  async function onUpdateSubmit(data) {
    const courseId = data._id;
    console.log(data);
    const format = await checkFormat(data);

    if (!format.isValid) {
      handleOpen(format.message);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/course/${courseId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const courseData = await res.json();
      console.log("it is Course data", courseData);
      if (courseData.success) {
        handleOpen("Course Updated");
        setTimeout(() => {
          onHandleView("getCourse");
        }, 2000);
      } else {
        throw new Error(courseData.message);
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
            width: { sx: 0, sm: "100vw", md: "65vw", lg: "60vw", xl: "36vw" },
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
          <Typography variant="h2" textAlign="center" color="white">
            {viewButton === "addButton" ? "Add Course" : "Update Course"}
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
              label="CourseName"
              variant="outlined"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
            />
            <TextField
              label="Capacity"
              type="number"
              variant="outlined"
              name="capacity"
              value={course.capacity}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Course Fees
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="CourseFees"
                name="courseFees"
                value={course.courseFees}
                onChange={handleChange}
              />
            </FormControl>
            <TextField
              label="CourseDuration"
              variant="outlined"
              name="courseDuration"
              value={course.courseDuration}
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="CourseStartDate"
                name="courseStartDate"
                value={
                  course.courseStartDate ? dayjs(course.courseStartDate) : null
                }
                onChange={(newValue) => {
                  if (dayjs.isDayjs(newValue) && newValue.isValid()) {
                    handleChange({
                      target: {
                        name: "courseStartDate",
                        value: newValue.toISOString(),
                      },
                    });
                  } else {
                    handleChange({
                      target: {
                        name: "courseStartDate",
                        value: "",
                      },
                    });
                  }
                }}
              />
            </LocalizationProvider>
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
              <InputLabel id="teacher-label" sx={{ color: "white" }}>
                Teacher-id
              </InputLabel>
              <Select
                labelId="teacher-label"
                label="teacherId"
                sx={{ color: "white" }}
                name="teacherId"
                value={course.teacherId}
                onChange={handleChange}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {viewButton === "addButton" ? (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onSubmit(course)}
              >
                Add Course
              </Button>
            ) : (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onUpdateSubmit(course)}
              >
                Update Course
              </Button>
            )}
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={() => onHandleView("getCourse")}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
