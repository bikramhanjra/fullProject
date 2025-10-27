import TextField from "@mui/material/TextField";
import { Typography, Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
export default function AddCourse({onHandleView, onHandleAddCourse, course, teachers}) {

  const handleChange = (data) => {
    onHandleAddCourse(data)
  };


  async function onSubmit(data) {
    console.log(data);

    try {
      const res = await fetch("http://localhost:3000/api/v1/course", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const courseData = await res.json();
      console.log("it is course data", courseData);
      alert("Course is Added")
    } catch (error) {
      console.log("Post Error is", error);
    }
  }

  async function onUpdateSubmit(data) {
    const courseId = data._id;
    console.log(data);

    try {
      
      const res = await fetch(
        `http://localhost:3000/api/v1/course/${courseId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const courseData = await res.json();
      console.log("it is Course data", courseData);
      alert("Updated")
    } catch (error) {
      console.log("PATCH Error is", error);
    }
  }

  return (
    <>
        <Box sx={{height: "100vh", bgcolor: brown[500] }}>
          <Container sx={{ width: "45vw", height: "70vh", paddingTop: 10 }}>
            <Typography variant="h1" color="white">
              Add Course
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "25ch",
                  color: "white",
                  marginTop: 6,
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
                variant="outlined"
                name="capacity"
                value={course.capacity}
                onChange={handleChange}
              />
              <TextField
                label="CourseFees"
                variant="outlined"
                name="courseFees"
                value={course.courseFees}
                onChange={handleChange}
              />
              <TextField
                label="CourseDuration"
                variant="outlined"
                name="courseDuration"
                value={course.courseDuration}
                onChange={handleChange}
              />
              <TextField
                label="CourseStartDate"
                variant="outlined"
                name="courseStartDate"
                value={course.courseStartDate}
                onChange={handleChange}
              />
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
                  {teachers.map((teacher)=>(
                    <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=>onSubmit(course)}
              >
                Add Course
              </Button>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=> onUpdateSubmit(course)}
              >
                Update Course
              </Button>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=> onHandleView("getCourse")}
              >
                Back To List
              </Button>
            </Box>
          </Container>
        </Box>
    </>
  );
}
