import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function AuthLayout() {
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
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "#F2EFE7",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}
export default AuthLayout;
