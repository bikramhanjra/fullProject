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

export default function GetStudent({
  onHandleView,
  onHandleUpdateStudent,
  setStudent,
}) {
  const token = localStorage.getItem("token");
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
    const studentId = data._id;
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/student/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const studentData = await res.json();
      if (!studentData.success) {
        throw new Error(studentData.message);
      }
      setRefresh((prev) => !prev);
      handleOpen("Student Deleted");
    } catch (error) {
      console.log("Delete error", error);
    }
  }

  const handleUpdate = (data) => {
    onHandleUpdateStudent(data);
    onHandleView("addStudent", "updateButton");
  };

  const handleAddStudent = () => {
    onHandleView("addStudent", "addButton");
    setStudent(() => ({
      name: "",
      email: "",
      dob: "",
      password: "",
      feesPaid: "",
      status: "",
    }));
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/student", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const studentData = await res.json();
        console.log(studentData);
        setStudents(studentData.data);
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
          minHeight: "600px",
        }}
      >
        {" "}
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
            Students List
          </Typography>
          <Box>
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900], color: "white" }}
              variant="contained"
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1000,
            mx: "auto",
            mt: 3,
            maxHeight: "60vh",
          }}
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
                  Password
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Fess Paid
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Status
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
              {students?.map((studentData) => (
                <TableRow
                  key={studentData._id}
                  sx={{ backgroundColor: brown[500] }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {studentData._id}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {studentData.name}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {studentData.dob}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {studentData.email}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {studentData.password}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {studentData.feesPaid}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {studentData.status}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    <IconButton onClick={() => handleUpdate(studentData)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    <IconButton onClick={() => handleDelete(studentData)}>
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
