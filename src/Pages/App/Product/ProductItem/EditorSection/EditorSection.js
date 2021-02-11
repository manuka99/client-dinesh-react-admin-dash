import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditorSection({ heading, name, dataValue, handleProductData }) {
  const [data, setData] = useState("");
  const [isSaveData, setIsSaveData] = useState(false);
  const timeOutRef = useRef(null);

  useEffect(() => {
    if (isSaveData)
      timeOutRef.current = setTimeout(
        () => handleProductData(name, data),
        10000
      );
    return () => {
      clearTimeout(timeOutRef.current);
    };
    // eslint-disable-next-line
  }, [data]);

  const saveData = (event, editor) => {
    setIsSaveData(true);
    setData(editor.getData());
  };

  return (
    <div>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              {heading}
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent>
          <CKEditor
            id={name}
            editor={ClassicEditor}
            data={!dataValue ? "" : dataValue}
            onChange={saveData}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default React.memo(EditorSection);
