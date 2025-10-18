import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { Typography, Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        },
      },
    },
  },
});

export default function AddStudent({onHandleView, onHandleAddStudent, student}) {
  // const [student, setStudent] = useState({
  //   name: "",
  //   email: "",
  //   dob: "",
  //   password: "",
  //   feesPaid: "",
  //   status: "",
  // });

  const handleChange = (data) => {
    onHandleAddStudent(data)
  };

  async function onSubmit(data) {
    console.log(data);

    try {
      const res = await fetch("http://localhost:3000/api/v1/student", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const studentData = await res.json();
      console.log("it is student data", studentData);
      alert("Student is Added")
    } catch (error) {
      console.log("Post Error is", error);
    }
  }

  async function onUpdateSubmit(data) {
    const studentId = data._id;
    console.log(data);

    try {
      
      const res = await fetch(
        `http://localhost:3000/api/v1/student/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const studentData = await res.json();
      console.log("it is student data", studentData);
      alert("Updated")
    } catch (error) {
      console.log("PATCH Error is", error);
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100vw", height: "100vh", bgcolor: brown[500] }}>
          <Container sx={{ width: "45vw", height: "70vh", paddingTop: 10 }}>
            <Typography variant="h1" color="white">
              Add Student
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
                value={student.name}
                onChange={handleChange}
              />
              <TextField
                label="Dob"
                variant="outlined"
                name="dob"
                value={student.dob}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={student.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                value={student.password}
                onChange={handleChange}
              />
              <TextField
                label="Fess Paid"
                variant="outlined"
                name="feesPaid"
                value={student.feesPaid}
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
              </FormControl>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=>onSubmit(student)}
              >
                Add Student
              </Button>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=> onUpdateSubmit(student)}
              >
                Update Student
              </Button>
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={()=> onHandleView("getStudent")}
              >
                Back To List
              </Button>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}
