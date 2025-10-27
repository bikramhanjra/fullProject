import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";


export default function AddTeacher({onHandleView, onHandleAddTeacher, teacher}) {

  const handleChange = (data) => {
    onHandleAddTeacher(data)
  };

  async function onSubmit(data) {
    console.log(data);

    try {
      const res = await fetch("http://localhost:3000/api/v1/teacher", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const teacherData = await res.json();
      console.log("it is student data", teacherData);
      alert("Teacher is Added")
    } catch (error) {
      console.log("Post Error is", error);
    }
  }

  async function onUpdateSubmit(data) {
    const teacherId = data._id;
    console.log(data);

    try {
      
      const res = await fetch(
        `http://localhost:3000/api/v1/teacher/${teacherId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const teacherData = await res.json();
      console.log("it is student data", teacherData);
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
              Add Teacher
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
                label="Name"
                variant="outlined"
                name="name"
                value={teacher.name}
                onChange={handleChange}
              />
              <TextField
                label="Dob"
                variant="outlined"
                name="dob"
                value={teacher.dob}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={teacher.email}
                onChange={handleChange}
              />
              <TextField
                label="Salary"
                variant="outlined"
                name="salary"
                value={teacher.salary}
                onChange={handleChange}
              />
              
              {/* <FormControl
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
                <InputLabel id="status-label" sx={{ color: "white" }}>
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  label="Status"
                  sx={{ color: "white" }}
                  name="status"
                  value={student.status}
                  onChange={handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inActive">In Active</MenuItem>
                </Select>
              </FormControl> */}
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=>onSubmit(teacher)}
              >
                Add Teacher
              </Button>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=> onUpdateSubmit(teacher)}
              >
                Update Teacher
              </Button>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=> onHandleView("getTeacher")}
              >
                Back To List
              </Button>
            </Box>
          </Container>
        </Box>
    </>
  );
}
