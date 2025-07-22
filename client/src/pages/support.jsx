/* import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";

export default function Support() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(true);
    setQuery("");
  };

  return (
    <Box sx={{ bgcolor: colors.primary[900], color: colors.grey[100], minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backgroundColor: colors.primary[700], borderRadius: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Contact Support
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Have a question or need help? Drop us a message below.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your Message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: colors.greenAccent[600] }}>
            Send
          </Button>
        </Paper>
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
 */

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Divider,
} from "@mui/material";
import { Chat, HelpOutline, MailOutline, Phone, LocationOn } from "@mui/icons-material";
import { tokens } from "../theme";
import ChatBot from "../components/ChatBot"; // Floating assistant

export default function Support() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: colors.primary[900],
        color: colors.grey[100],
        minHeight: "100vh",
        py: 6,
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${colors.primary[700]}, ${colors.primary[600]})`,
                color: colors.grey[100],
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ color: colors.greenAccent[400] }}
              >
                Get Help & Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: colors.grey[200] }}>
                Ask our assistant for any queries or browse help topics below.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color={colors.grey[100]}>
                    <HelpOutline sx={{ verticalAlign: "middle", mr: 1 }} /> Common Help Topics
                  </Typography>
                  <Divider sx={{ mb: 1, borderColor: colors.primary[500] }} />
                  <List dense>
                    <ListItem><ListItemText primary="How to buy and sell stocks" /></ListItem>
                    <ListItem><ListItemText primary="Understanding portfolio allocation" /></ListItem>
                    <ListItem><ListItemText primary="Account and security settings" /></ListItem>
                    <ListItem><ListItemText primary="Payment issues and refunds" /></ListItem>
                    <ListItem><ListItemText primary="Using the FinFolio Assistant" /></ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color={colors.grey[100]}>
                    <Chat sx={{ verticalAlign: "middle", mr: 1 }} /> Contact Information
                  </Typography>
                  <Divider sx={{ mb: 1, borderColor: colors.primary[500] }} />
                  <Typography variant="body1" gutterBottom>
                    <MailOutline fontSize="small" sx={{ mr: 1 }} />
                    <strong>Email:</strong> finfoliohelpdesk@gmail.com
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <Phone fontSize="small" sx={{ mr: 1 }} />
                    <strong>Phone:</strong> +91 9999324034
                  </Typography>
                  <Typography variant="body1">
                    <LocationOn fontSize="small" sx={{ mr: 1 }} />
                    <strong>Address:</strong> 2nd Floor, A-Block, FinTech Tower, New Delhi – 110001
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>

      <ChatBot />
    </Box>
  );
}
