import { Box, IconButton, useTheme, Tooltip, Autocomplete, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const sidebarOptions = [
    { label: "Dashboard", route: "/UserDashboard" },
    { label: "Profile", route: "/profile" },
    { label: "My Stocks", route: "/mystock" },
    { label: "Purchase", route: "/purchase" },
    { label: "Market Stocks", route: "/marketstock" },
    { label: "TradeBridge", route: "/tradebridge" },
    { label: "Insights", route: "/insights" },
    { label: "Calendar", route: "/calendar" },
    
    
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSelect = (event, value) => {
    if (value && value.route) {
      navigate(value.route);
    }
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
      <Box width="240px" />

      {/* Search bar */}
      <Box flexGrow={1} display="flex" justifyContent="flex-start" ml={2}>
        <Autocomplete
          options={sidebarOptions}
          getOptionLabel={(option) => option.label}
          sx={{
            width: 300,
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : "#fff",
            borderRadius: "6px",
            boxShadow: theme.palette.mode === "light" ? "0 0 4px rgba(0,0,0,0.1)" : "none",
          }}
          onChange={handleSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search pages..."
              InputProps={{
                ...params.InputProps,
                sx: {
                  color: theme.palette.mode === "dark" ? colors.grey[100] : "#000",
                  pl: 1,
                },
              }}
            />
          )}
        />
      </Box>

      {/* Right icons */}
      <Box display="flex" gap={1}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>

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
