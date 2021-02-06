import React from "react";
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
            onChange={(event, editor) => {
              const data = editor.getData();
              handleProductData(name, data);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default React.memo(EditorSection);
