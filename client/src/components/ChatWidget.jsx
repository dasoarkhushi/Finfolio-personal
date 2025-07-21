/*  import React from "react";

export default function ChatWidget() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#3ab58a",
        zIndex: 9999,
        boxShadow: "0 4px 20px rgba(253, 42, 42, 0.57)",
        overflow: "hidden"
      }}
    >
      <iframe
  title="Chatbot"
  src="about:blank"
  style={{ width: "100%", height: "100%", border: "none" }}
/>

    </div>
  );
} 
 */
/* import React, { useContext } from "react";
import { useTheme, IconButton } from "@mui/material";
import { ColorModeContext } from "../../theme"; // adjust path to match your context file
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ChatWidget() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext); // custom context that toggles theme

  const backgroundColor = theme.palette.background.paper;
  const borderColor = theme.palette.divider;
  const boxShadow =
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(255, 105, 135, 0.4)"
      : "0 4px 20px rgba(253, 42, 42, 0.57)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
        background: backgroundColor,
        zIndex: 9999,
        boxShadow: boxShadow,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
    
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "4px 8px",
          background: theme.palette.background.default,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <IconButton onClick={colorMode.toggleColorMode} size="small">
          {theme.palette.mode === "dark" ? (
            <LightModeIcon style={{ fontSize: "18px" }} />
          ) : (
            <DarkModeIcon style={{ fontSize: "18px" }} />
          )}
        </IconButton>
      </div>

      <iframe
        title="Chatbot"
        src="about:blank"
        style={{ flex: 1, border: "none" }}
      />
    </div>
  );
}
 */

import React from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function ChatButton({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#3da58a",       // ✅ Update this to match your theme
        color: "#fff",                     // ✅ White chat icon
        width: 56,
        height: 56,
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(61, 165, 138, 0.4)", // ✅ Soft green glow
        "&:hover": {
          backgroundColor: "#2c8b72"       // ✅ Darker green on hover
        }
      }}
    >
      <ChatIcon sx={{ fontSize: 28 }} />
    </IconButton>
  );
}
