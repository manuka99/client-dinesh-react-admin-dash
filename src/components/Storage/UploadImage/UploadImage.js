import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectImages from "./SelectImages";
import UploadingUi from "./UploadingImageUi/UploadingUi";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    padding: "64px 0",
    boxSizing: "border-box",
  },
}));

export default function UploadImage() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [isUploading, setisUploading] = useState(false);

  return (
    <div className={classes.root}>
      {isUploading ? (
        <UploadingUi
          files={files}
          setFiles={setFiles}
          setisUploading={setisUploading}
        />
      ) : (
        <SelectImages
          files={files}
          setFiles={setFiles}
          setisUploading={setisUploading}
        />
      )}
    </div>
  );
}
