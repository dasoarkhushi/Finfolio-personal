import { Box, IconButton, useTheme, Tooltip } from "@mui/material"; // 🔄 Tooltip added
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout"; // ✅ NEW: Logout icon
import { useNavigate } from "react-router-dom"; // ✅ NEW: for redirect

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // ✅ for navigation

  // ✅ Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // redirect to homepage
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: colors.primary[400],
      }}
    >
      {/* Sidebar width offset */}
      <Box width="240px" />

      {/* Centered Search Bar */}
      <Box flexGrow={1} display="flex" justifyContent="flex-start" ml={2}>
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={
            theme.palette.mode === "dark"
              ? colors.primary[600]
              : "#ffffff"
          }
          borderRadius="3px"
          width="100%"
          maxWidth="400px"
          boxShadow={
            theme.palette.mode === "light" ? "0 0 4px rgba(0,0,0,0.1)" : "none"
          }
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color:
                theme.palette.mode === "dark"
                  ? colors.grey[100]
                  : "#000000",
            }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? colors.grey[100]
                    : colors.grey[800],
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Right Icons */}
      <Box display="flex" gap={1}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/* ✅ Logout Icon */}
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
