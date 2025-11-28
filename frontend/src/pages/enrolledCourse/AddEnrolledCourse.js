import { Typography, Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

export default function AddCourse({
  onHandleView,
  handleAddEnrolledCourse,
  enrolledCourse,
  viewButton,
  student,
  course,
}) {
  const token = localStorage.getItem("token");
  const handleChange = (data) => {
    handleAddEnrolledCourse(data);
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
    try {
      const res = await fetch("http://localhost:3000/api/v1/enrolled", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const enrolledData = await res.json();

      if (!enrolledData.success && enrolledData.errors) {
        const error = enrolledData.errors[0].msg;
        console.log("htis is error", error)
        handleOpen(error);
      } else if (enrolledData.success === true) {
        handleOpen("EnrolledCourse is Added");
        setTimeout(() => {
          onHandleView("getEnrolledCourse");
        }, 2000);
      } else {
        throw new Error(enrolledData.message);
      }
    } catch (error) {
      handleOpen(error.message);
      console.log("Post Error is", error);
    }
  }

  async function onUpdateSubmit(data) {
    const enrolledId = data._id;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/enrolled/${enrolledId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const enrolledData = await res.json();
      if (!enrolledCourse.success && enrolledCourse.errors) {
        const error = enrolledCourse.errors[0].msg;
        handleOpen(error);
      } else if (enrolledData.success) {
        handleOpen("EnrolledCourse Updated");
        setTimeout(() => {
          onHandleView("getEnrolledCourse");
        }, 3000);
      } else {
        throw new Error(enrolledData.message);
      }
    } catch (error) {
      console.log("PATCH Error is", error);
    }
  }

  return (
    <>
      <Box sx={{ height: "100vh", bgcolor: brown[500], minWidth: "380px" }}>
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
            width: { xs: "100vw", sm: "50vw", md: "36vw" },
            height: "90vh",
            paddingTop: 10,
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "4rem" } }}
            textAlign="center"
            color="white"
          >
            {viewButton === "addButton"
              ? "Add EnrolledCourse"
              : "Update EnrolledCourse"}
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "25ch",
                color: "white",
                marginTop: 6,
                marginLeft: { xs: "", sm: "0px", md: "1.5rem" },
              },
            }}
            noValidate
            autoComplete="off"
          >
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
              <InputLabel id="student-label" sx={{ color: "white" }}>
                Student-Name
              </InputLabel>
              <Select
                labelId="student-label"
                label="studentId"
                sx={{ color: "white" }}
                name="studentId"
                value={enrolledCourse.studentId}
                onChange={handleChange}
              >
                {student?.map((studentData) => (
                  <MenuItem key={studentData._id} value={studentData._id}>
                    {studentData.name}
                  </MenuItem>
                ))}
              </Select>
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
              <InputLabel id="course-label" sx={{ color: "white" }}>
                Course-Name
              </InputLabel>
              <Select
                labelId="course-label"
                label="courseId"
                sx={{ color: "white" }}
                name="courseId"
                value={enrolledCourse.courseId}
                onChange={handleChange}
              >
                {course?.map((courseData) => (
                  <MenuItem key={courseData._id} value={courseData._id}>
                    {courseData.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {viewButton === "addButton" ? (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onSubmit(enrolledCourse)}
              >
                Add enrolledCourse
              </Button>
            ) : (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onUpdateSubmit(enrolledCourse)}
              >
                Update enrolledCourse
              </Button>
            )}
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={() => onHandleView("getEnrolledCourse")}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
