import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { brown } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddTeacher({
  onHandleView,
  onHandleAddTeacher,
  teacher,
  viewButton,
}) {
  const handleChange = (data) => {
    onHandleAddTeacher(data);
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
      alert("Teacher is Added");
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
      alert("Updated");
    } catch (error) {
      console.log("PATCH Error is", error);
    }
  }

  return (
    <>
      <Box sx={{ height: "100vh", bgcolor: brown[500] }}>
        <Container sx={{ width: "36vw", height: "90vh", paddingTop: 10 }}>
          <Typography variant="h2" textAlign="center" color="white">
            {viewButton === "addButton" ? "Add Teacher" : "Update Teacher"}
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "25ch",
                color: "white",
                marginTop: 6,
                marginLeft: "1.5rem",
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Dob"
                name="dob"
                value={teacher.dob ? dayjs(teacher.dob) : null}
                onChange={(newValue) => {
                  if (dayjs.isDayjs(newValue) && newValue.isValid()) {
                    handleChange({
                      target: {
                        name: "dob",
                        value: newValue.toISOString(),
                      },
                    });
                  } else { 
                    handleChange({
                      target: {
                        name: "dob",
                        value: "",
                      },
                    });
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={teacher.email}
              type="email"
              onChange={handleChange}
            />
            <TextField
              label="Salary"
              variant="outlined"
              name="salary"
              type="number"
              inputProps={{ min: 0 }}
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

            {viewButton === "addButton" ? (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onSubmit(teacher)}
              >
                Add Teacher
              </Button>
            ) : (
              <Button
                sx={{ marginTop: 9, backgroundColor: brown[900] }}
                variant="contained"
                onClick={() => onUpdateSubmit(teacher)}
              >
                Update Teacher
              </Button>
            )}
            <Button
              sx={{ marginTop: 9, backgroundColor: brown[900] }}
              variant="contained"
              onClick={() => onHandleView("getTeacher")}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
