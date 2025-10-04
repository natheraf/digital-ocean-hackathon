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
  const [selectedAnchor, setSelectedAnchor] = React.useState(null);
  const [selectedText, setSelectedText] = React.useState(null);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const annotatorOpen = Boolean(selectedAnchor);
  const selectionTop = React.useRef(0);
  const selectionLeft = React.useRef(0);

  const handleGetTextSelection = () => {
    const selectedString = window.getSelection()?.toString()?.trim();
    if (annotatorOpen === false && selectedString?.length > 0) {
      const selection = window.getSelection();
      const text = selection.anchorNode.textContent;

      const prefix = text.substring(0, selection.anchorOffset);
      const highlightContent = selection.toString();
      const postfix = text.substring(selection.focusOffset);

      setSelectedAnchor(selection.anchorNode);
      setSelectedText(highlightContent);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      selectionTop.current = rect.top;
      selectionLeft.current = rect.left;
    }
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleGetTextSelection);
    return () => {
      document?.removeEventListener("mouseup", handleGetTextSelection);
    };
  }, []);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={annotatorOpen}
      onClose={() => setSelectedAnchor(null)}
    >
      <DialogTitle>{selectedText}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            <Select
              autoFocus
              value={maxWidth}
              // onChange={handleMaxWidthChange}
              label="maxWidth"
              inputProps={{
                name: "max-width",
                id: "max-width",
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value="xs">xs</MenuItem>
              <MenuItem value="sm">sm</MenuItem>
              <MenuItem value="md">md</MenuItem>
              <MenuItem value="lg">lg</MenuItem>
              <MenuItem value="xl">xl</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            /> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
