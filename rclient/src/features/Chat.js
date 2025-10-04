import { Box, Fab, IconButton, Paper, Stack, TextField } from "@mui/material";
import * as React from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

export const Chat = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    "Hello! How can I assist you?",
  ]);
  const [userMessage, setUserMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const chatWindowRef = React.useRef(null);

  const sendMessage = () => {
    if (!userMessage.trim()) return;
    setMessages((prev) => [...prev, userMessage]);
    setUserMessage("");
    setIsLoading(true);
    // Simulate a response from the assistant
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        "This is a response from the assistant.",
      ]);
      setIsLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo(0, chatWindowRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <Box>
      <Fab
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AssistantIcon />
      </Fab>
      {isOpen && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 300,
            height: 500,
            p: 2,
          }}
          elevation={3}
        >
          <Stack>
            <Stack
              sx={{ overflowY: "auto", height: 450, mb: 1 }}
              ref={chatWindowRef}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: index % 2 === 0 ? "start" : "end",
                    color: index % 2 === 0 ? "black" : "blue",
                  }}
                >
                  {msg}
                </Box>
              ))}
            </Stack>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              p={1}
              sx={{ width: "100%" }}
            >
              <TextField
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (userMessage.trim()) {
                      sendMessage(userMessage);
                    }
                  }
                }}
                size="small"
                variant="outlined"
              />
              <IconButton
                disabled={isLoading}
                onClick={() => sendMessage("User message")}
                color="primary"
                variant="contained"
                aria-label="add to shopping cart"
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: "gray" }} size={24} />
                ) : (
                  <SendIcon />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};
