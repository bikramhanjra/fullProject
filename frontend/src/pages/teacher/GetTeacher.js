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

export default function GetTeacher({onHandleView, onHandleUpdateTeacher}) {
  const [teachers, setTeachers] = useState([]);
  const [refresh ,setRefresh] = useState(true);

  async function handleDelete(data) {
    console.log("it is in dlete btn", data);
    const teacherId = data._id;
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/teacher/${teacherId}`,
        {
          method: "DELETE",
        }
      );
      const teacherData = await res.json();
      console.log("This is Delete Result", teacherData);
      setRefresh(false)
    } catch (error) {
      console.log("Delete error", error);
    }
  }

  const handleUpdate = (data) => {
    onHandleUpdateTeacher(data)
    onHandleView("addTeacher")
  };

  const handleAddTeacher = () =>{
    onHandleView("addTeacher")
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/teacher");
        const teacherData = await res.json();
        console.log(teacherData);
        setTeachers(teacherData.data);
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
            Teachers List
          </Typography>
          <Box>
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={handleAddTeacher}
            >
              Add Teacher
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
                  Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  D.O.B
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Email
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Salary
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
              {teachers.map((teacherData) => (
                <TableRow
                  key={teacherData._id}
                  sx={{ backgroundColor: brown[500] }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {teacherData._id}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {teacherData.name}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {teacherData.dob}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {teacherData.email}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {teacherData.salary}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    <IconButton onClick={() => handleUpdate(teacherData)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    <IconButton onClick={() => handleDelete(teacherData)}>
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
