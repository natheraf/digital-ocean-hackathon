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

export const HighlightMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState(null);
  const [maxWidth, setMaxWidth] = React.useState("lg");
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
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      selectionTop.current = rect.top;
      selectionLeft.current = rect.left;
    }
  }, [isOpen]);

  React.useEffect(() => {
    document.addEventListener("mouseup", handleGetTextSelection);
    return () => {
      document?.removeEventListener("mouseup", handleGetTextSelection);
    };
  }, [handleGetTextSelection]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DialogTitle>{selectedText}</DialogTitle>
      <DialogContent>
        <Typography>Body response</Typography>
      </DialogContent>
    </Dialog>
  );
};
