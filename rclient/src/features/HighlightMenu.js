import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import * as React from "react";
import prompts from "../api/prompts";
import { runAI } from "../api/ai";
import CircularIndeterminate from "../components/Progress";

export const HighlightMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [AIResponse, setAIResponse] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [currentContext, setCurrentContext] = React.useState(null);
  const [entireText, setEntireText] = React.useState("");
  const selectionTop = React.useRef(0);
  const selectionLeft = React.useRef(0);

  const handleGetTextSelection = React.useCallback(() => {
    const selectedString = window.getSelection()?.toString()?.trim();
    if (isOpen === false && selectedString?.length > 0) {
      const selection = window.getSelection();
      const text = selection.anchorNode.textContent;

      const prefix = text.substring(0, selection.anchorOffset);
      const highlightContent = selection.toString();
      const postfix = text.substring(selection.focusOffset);

      setIsOpen(true);
      setSelectedText(highlightContent);
      setCurrentContext(`${prefix}${highlightContent}`);
      setEntireText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      selectionTop.current = rect.top;
      selectionLeft.current = rect.left;
    }
  }, [isOpen]);

  const fetchAIResponse = async () => {
    setIsLoading(true);
    let finalPrompt;
    if (isChecked) {
      finalPrompt = prompts.summarizeShort(currentContext);
    } else {
      finalPrompt = prompts.summarizeShort(entireText);
    }
    console.log(finalPrompt);
    const response = await runAI(finalPrompt);
    setAIResponse(response);
    setIsLoading(false);
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleGetTextSelection);
    return () => {
      document?.removeEventListener("mouseup", handleGetTextSelection);
    };
  }, [handleGetTextSelection]);

  const handleOnClose = () => {
    setIsOpen(false);
    setAIResponse(null);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={isOpen}
      onClose={handleOnClose}
    >
      <DialogTitle>{selectedText}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex", // makes it a flex container
            flexDirection: "row", // horizontal layout (columns)
            gap: 2, // theme spacing between columns
          }}
        >
          <Box
            sx={{
              flexBasis: "25%", // each takes equal width
              p: 2, // padding inside each column
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Options</Typography>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={isChecked}
                    onClick={() => setIsChecked(!isChecked)}
                  />
                }
                label="Spoiler-Free Mode"
              />
              <Button
                variant="contained"
                onClick={() => {
                  fetchAIResponse();
                }}
              >
                Generate Response
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">AI Insights</Typography>
            {isLoading ? (
              <CircularIndeterminate />
            ) : (
              <Typography variant="body2">{AIResponse}</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
