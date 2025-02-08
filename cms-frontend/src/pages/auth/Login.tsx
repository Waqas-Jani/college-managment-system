import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { emailValidation } from "utils/validations";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email || !emailValidation(formData.email)) {
      console.log("email address", emailValidation(formData.email));
      newErrors.email = "Email is not valid address!";
      valid = false;
    }

    // Password strength check
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Add your login logic here
      console.log("Login successful");
    } else {
      console.log("Login failed");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box component="form" sx={{ p: 4 }} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          margin="normal"
          sx={{ mt: 2 }}
        />

        <FormControl
          component={"div"}
          sx={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <RadioGroup
            row
            defaultValue="student"
            name="role"
            sx={{ display: "flex" }}
            onChange={handleChange}
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="faculty"
              control={<Radio />}
              label="Faculty"
            />
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Studnet"
            />
          </RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember Me"
            sx={{ mt: 1 }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {/* <Link href="#" variant="body2">
            Forgot Password?
          </Link> */}
          <Box mt={1} sx={{ color: "primary.main" }}>
            Don't have an account? Contact with administrator
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
