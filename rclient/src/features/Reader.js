import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import { HighlightMenu } from "./HighlightMenu";
import { Chat } from "./Chat";

export const Reader = () => {
  const [text, setText] = React.useState(null);
  const inputFile = React.useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setText(e.target.result);
        };
        reader.readAsText(file);
      }
    }
  };
  const handleEpubImportOnClick = () => {
    inputFile.current.click();
  };

  return (
    <Stack>
      <Chat />
      <HighlightMenu />
      <input type="file" ref={inputFile} onChange={handleFileChange} hidden />
      <Button onClick={handleEpubImportOnClick}>Upload</Button>
      <Box
        sx={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{
          __html: text ?? "upload a txt",
        }}
      />
    </Stack>
  );
};
