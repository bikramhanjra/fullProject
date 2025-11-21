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
import Snackbar from "@mui/material/Snackbar";

export default function GetCourse({
  onHandleView,
  onHandleUpdateCourse,
  onGetTeacher,
  setCourse,
}) {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(true);

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

  async function handleDelete(data) {
    console.log("it is in dlete btn", data);
    const courseId = data._id;
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/course/${courseId}`,
        {
          method: "DELETE",
          Authorization: `Bearer ${token}`,
        }
      );
      const courseData = await res.json();
      if (courseData.success) {
        handleOpen("Deleted");
        setRefresh(false);
      } else {
        throw new Error(courseData.message);
      }
    } catch (error) {
      handleOpen(error.message);
      console.log("Delete error", error);
    }
  }

  const handleUpdate = async (data) => {
    await onGetTeacher();
    onHandleUpdateCourse(data);
    onHandleView("addCourse", "updateButton");
  };

  async function handleAddCourse() {
    await onGetTeacher();
    onHandleView("addCourse", "addButton");
    setCourse({
      courseName: "",
      capacity: "",
      courseFees: "",
      courseDuration: "",
      courseStartDate: "",
      teacherId: "",
    });
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/course", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const courseData = await res.json();
        console.log(courseData);
        setCourses(courseData.data);
      } catch (err) {
        console.log("error is ", err);
      }
    }
    getData();
  }, [refresh, token]);

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: brown[500],
          height: "100vh",
          minWidth: "380px",
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
          autoHideDuration={4000}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <Typography variant="h2" sx={{ paddingTop: 6 }}>
            Courses List
          </Typography>
          <Box>
            <Button
              sx={{ marginTop: 9, color: "white", backgroundColor: brown[900] }}
              variant="contained"
              onClick={handleAddCourse}
            >
              Add Course
            </Button>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1000, mx: "auto", mt: 3, maxHeight: "60vh" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: brown[900] }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  CourseName
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  TeacherName
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Capacity
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  CourseFees
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  CourseDuration
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Course-Start-Date
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
              {courses.map((courseData) => (
                <TableRow
                  key={courseData._id}
                  sx={{ backgroundColor: brown[500] }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {courseData._id}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.courseName}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.TeacherDetails[0]?.name}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.capacity}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.courseFees}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.courseDuration}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {courseData.courseStartDate}
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
