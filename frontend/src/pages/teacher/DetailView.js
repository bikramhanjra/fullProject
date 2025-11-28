import Box from "@mui/material/Box";
import { brown } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function DetailView({ teacher, onHandleView }) {
  const [CourseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/course/teacherId/${teacher._id}`
        );
        const courseData = await res.json();
        console.log("courseData", courseData);

        setCourseDetails(courseData.data);
      } catch (err) {
        console.log("error is ", err);
      }
    }
    getData();
  }, [teacher]);
  // console.log("teacher data", teacher)
  // console.log("this is teacherdetails", teacherDetails)
  return (
    <>
      <Box
        sx={{ backgroundColor: brown[500], height: {xs:"900px",md:"90vh"}, minWidth: "380px" }}
      >
        <Container
          sx={{
            height: "45vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth:"355px"
          }}
        >
          <Card
            sx={{
              marginTop:{xs:"40rem", sm:"21rem"},
              width: { xs: "100%", sm: "50vw" },
              height: {xs:"750px",sm:"80vh"},
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "white", marginTop: "1rem" }}
                variant="h2"
              >
                Teacher Details
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ width: {sx:"90vw"}, margin: "auto", marginTop: "1rem", minWidth:"355px" }}
              >
                <Table
                  sx={{
                    "& td, & th": { fontSize: "1.3rem" },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID : {teacher._id} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Name : {teacher.name} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dob: {teacher.dob} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email : {teacher.email} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Salary : {teacher.salary} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        CourseDeatils :
                        {CourseDetails?.map((details) => (
                          <span key={details._id}> * {details.courseName}</span>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </CardContent>
            <Button
              sx={{ marginTop: 2, backgroundColor: "GrayText" }}
              variant="contained"
              onClick={() => onHandleView("getTeacher")}
            >
              List
            </Button>
          </Card>
        </Container>
      </Box>
    </>
  );
}
