import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router";
import cmsImg from "assets/cms.png";

function LandingPage() {
  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          height: "100vh",
          width: "100%",
          alignItems: "center",
          bgcolor: "red",
        }}
      >
        <Box
          component={"div"}
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "#BBE3FA",
            height: "100%",
            px: { xs: 0, md: 5 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            College Management System
          </Typography>
          <Typography
            variant="caption"
            component={"p"}
            sx={{ fontSize: 15, letterSpacing: 3 }}
          >
            Streamline college operations with a comprehensive management
            system. Efficiently manage students, faculty, courses, and more...
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <NavLink to={"/login"}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: "white", px: 5 }}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to={"/register"}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: "white", px: 5 }}
              >
                Register
              </Button>
            </NavLink>
          </Stack>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "#F2EFE7",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              //   maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 550 },
              objectFit: "contain",
            }}
            alt="College management system"
            src={cmsImg}
          />
        </Box>
      </Box>
    </Container>
  );
}
export default LandingPage;
