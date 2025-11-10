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

export default function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (user) => {
    const { name, value } = user.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  async function validations() {
    if (!user.name) {
      return { isValid: false, message: "name is required" };
    }
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
      const res = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log("this is data from backend", data);
      navigate("/");
      setUser({ name: "", email: "", password: "" });
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
            Sign Up
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                id="name"
                type="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="abc"
                fullWidth
              />
            </FormControl>
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
              Sign Up
            </Button>

            <Typography sx={{ textAlign: "center", mt: 1 }}>
              Alrealy have an account?{" "}
              <Link href="/" variant="body2">
                Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </Stack>
    </>
  );
}
