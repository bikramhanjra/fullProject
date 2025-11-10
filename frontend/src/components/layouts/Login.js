import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { brown } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const handleChange = (user) => {
    const { name, value } = user.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  async function validations() {
    if (!user.email) {
      return { isValid: false, message: "Email is required" };
    }
    if (!user.password) {
      return { isValid: false, message: "Password is required" };
    }

    return { isValid: true, message: "Requirements are fulfilled" };
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validation = await validations(user);

      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      const res = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json()
      console.log(data)
      if(!data.status){
        throw new Error(data.message)
      }

      navigate("/student")
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", backgroundColor: brown[500] }}
      >
        <Card sx={{ p: 4, width: "100%", maxWidth: 400, boxShadow: 3 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Login
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="your@email.com"
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="••••••"
                fullWidth
              />
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              Log In
            </Button>

            <Typography sx={{ textAlign: "center", mt: 1 }}>
              Don’t have an account?{" "}
              <Link href="/signUp" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </Stack>
    </>
  );
}
