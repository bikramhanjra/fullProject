import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { brown} from "@mui/material/colors";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function GetCourse({onHandleView, onHandleUpdateCourse}) {
  const [course, setCourse] = useState([]);
  const [refresh ,setRefresh] = useState(true);

  async function handleDelete(data) {
    console.log("it is in dlete btn", data);
    const courseId = data._id;
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/course/${courseId}`,
        {
          method: "DELETE",
        }
      );
      const courseData = await res.json();
      console.log("This is Delete Result", courseData);
      setRefresh(false)
    } catch (error) {
      console.log("Delete error", error);
    }
  }

  const handleUpdate = (data) => {
    onHandleUpdateCourse(data)
    onHandleView("addCourse")
  };

  const handleAddCourse = () =>{
    onHandleView("addCourse")
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/course");
        const courseData = await res.json();
        console.log(courseData);
        setCourse(courseData.data);
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
          <Typography variant="h1" sx={{ paddingTop: 4 }}>
            Courses List
          </Typography>
          <Box>
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={handleAddCourse}
            >
              Add Course
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
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Course-Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Capacity
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Course-Fees
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Course-Duration
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
              {course.map((courseData) => (
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
