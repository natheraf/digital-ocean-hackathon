import {
  Box,
  Chip,
  Fab,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import prompts from "../api/prompts";
import { runAI } from "../api/ai";

export const Chat = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    "Hello! How can I assist you?",
  ]);
  const [userMessage, setUserMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const chatWindowRef = React.useRef(null);

  const sendMessage = (message) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, message]);
    setUserMessage("");
    setIsLoading(true);
    fetchAIResponse(message);
  };

  const fetchAIResponse = async (question) => {
    setIsLoading(true);
    const entireText = document.getElementById("reader-content")?.innerText;
    const finalPrompt = prompts.explainInChat(entireText, messages, question);
    const response = await runAI(finalPrompt);
    setMessages((prev) => [...prev, response]);
    setIsLoading(false);
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
            height: 400,
            p: 2,
          }}
          elevation={3}
        >
          <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
            <Stack
              sx={{ overflowY: "auto", height: 310, mb: 1 }}
              ref={chatWindowRef}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: index % 2 === 0 ? "start" : "end",
                    color: index % 2 === 0 ? "black" : "blue",
                    width: 280,
                  }}
                >
                  {msg}
                </Box>
              ))}
            </Stack>
            <Stack spacing={1}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {[
                  "Summarize this",
                  "What is the main idea?",
                  "Similar articles or stories",
                ].map((preset) => (
                  <Chip
                    size={"small"}
                    label={preset}
                    onClick={(prest) => {
                      sendMessage(preset);
                    }}
                  />
                ))}
              </Stack>
              <Stack direction={"row"} spacing={1} sx={{ width: "100%" }}>
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
                  onClick={() => sendMessage(userMessage)}
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
          </Stack>
        </Paper>
      )}
    </Box>
  );
};
