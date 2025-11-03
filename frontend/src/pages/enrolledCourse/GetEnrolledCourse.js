import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { brown } from "@mui/material/colors";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function GetEnrolledCourse({
  onHandleView,
  setEnrolledCourse,
  onHandleUpdateEnrolledCourse,
  getStudent,
  getCourse,
}) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [refresh, setRefresh] = useState(true);

  async function handleDelete(data) {
    console.log("it is in dlete btn", data);
    const courseId = data._id;
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/enrolled/${courseId}`,
        {
          method: "DELETE",
        }
      );
      const courseData = await res.json();
      console.log("This is Delete Result", courseData);
      setRefresh(false);
    } catch (error) {
      console.log("Delete error", error);
    }
  }

  const handleUpdate = (data) => {
    onHandleUpdateEnrolledCourse(data);
    onHandleView("addEnrolledCourse", "updateButton");
  };

  async function handleAddEnrolledCourse() {
    await getStudent();
    await getCourse();
    onHandleView("addEnrolledCourse", "addButton");
    setEnrolledCourse({
      studentId: "",
      courseId: "",
    });
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/enrolled");
        const courseData = await res.json();
        console.log(courseData.data);
        setEnrolledCourses(courseData.data);
      } catch (err) {
        console.log("error is ", err);
      }
    }
    getData();
  }, [refresh]);

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: brown[500],
          height: "100vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 40 }}>
          <Typography variant="h2" sx={{ paddingTop: 4 }}>
            EnrolledCourse List
          </Typography>
          <Box>
            <Button
              sx={{ marginTop: 9, color: "white", backgroundColor: brown[900] }}
              variant="contained"
              onClick={handleAddEnrolledCourse}
            >
              Add EnrolledCourse
            </Button>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1000, mx: "auto", mt: 3 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: brown[900] }}>
                <TableCell sx={{ color: "white" }}>Enrolled-ID</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  StudentName
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  CourseName
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Update
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolledCourses.map((courseData) => (
                <TableRow
                  key={courseData._id}
                  sx={{ backgroundColor: brown[500] }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {courseData._id}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.StudentDetails[0].name}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.CourseDetails[0].courseName}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    <IconButton onClick={() => handleUpdate(courseData)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    <IconButton onClick={() => handleDelete(courseData)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
