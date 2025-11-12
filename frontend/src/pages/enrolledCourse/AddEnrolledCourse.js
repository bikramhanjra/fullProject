import { Typography, Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function AddCourse({
  onHandleView,
  handleAddEnrolledCourse,
  enrolledCourse,
  viewButton,
  student,
  course,
}) {
  const handleChange = (data) => {
    handleAddEnrolledCourse(data);
  };

  async function onSubmit(data) {
    console.log(data);

    try {
      const res = await fetch("http://localhost:3000/api/v1/enrolled", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const courseData = await res.json();
      console.log("it is enrolledCourse data", courseData);
      alert("enrolledCourse is Added");
      onHandleView("getEnrolledCourse")
    } catch (error) {
      console.log("Post Error is", error);
    }
  }

  async function onUpdateSubmit(data) {
    const enrolledId = data._id;
    console.log(data);

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/enrolled/${enrolledId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          }, 
        }
      );
      const courseData = await res.json();
      console.log("it is enrolledCourse data", courseData);
      alert("Updated");
    } catch (error) {
      console.log("PATCH Error is", error);
    }
  }

  return (
    <>
      <Box sx={{ height: "100vh", bgcolor: brown[500] }}>
        <Container sx={{ width: "36vw", height: "90vh", paddingTop: 10 }}>
          <Typography variant="h2" textAlign="center" color="white">
            {viewButton === "addButton"
              ? "Add enrolledCourse"
              : "Update enrolledCourse"}
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "25ch",
                color: "white",
                marginTop: 6,
                marginLeft: "1.5rem",
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
             {student.map((studentData) => (
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
                 {course.map((courseData) => (
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
