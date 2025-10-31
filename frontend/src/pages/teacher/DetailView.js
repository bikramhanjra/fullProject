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
import Paper from "@mui/material/Paper";

export default function DetailView({ teacher }) {
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
      <Box sx={{ backgroundColor: brown[500], height: "100vh" }}>
        <Container
          sx={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ width: "50vw", height: "80vh", textAlign: "center" }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: "white", marginTop:"1.5rem" }} variant="h3">
                Teacher Details
              </Typography>

              <TableContainer component={Paper} sx={{ width: "30vw", margin: "auto", }}>
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
                        {CourseDetails.map((details) => (
                          <span key={details._id}>  *  {details.courseName}</span>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
