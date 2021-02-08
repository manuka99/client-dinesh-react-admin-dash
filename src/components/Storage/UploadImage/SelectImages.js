import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { DropzoneAreaBase } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    border: "4px #e6e3e3 dashed",
    padding: "0 28px 28px 28px",
  },
  dropzone: {
    outline: "none",
    border: "none",
    minHeight: "160px",
  },
}));

function SelectImages({ files, setFiles, setisUploading }) {
  const classes = useStyles();

  const deleteFile = (file) => {
    var newFiles = files;
    files.map((x, index) => {
      if (file.data === x.data) {
        newFiles.splice(index, 1);
        return setFiles([...newFiles]);
      }
    });
  };

  return (
    <>
      <div className={classes.dropzoneContainer}>
        <DropzoneAreaBase
          acceptedFiles={["image/*"]}
          fileObjects={files}
          filesLimit={100}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          onAdd={(newFileObjs) => {
            setFiles([...files, ...newFileObjs]);
          }}
          onDelete={(deleteFileObj) => {
            deleteFile(deleteFileObj);
          }}
          onSave={() => {
            console.log("onSave", files);
          }}
          showPreviewsInDropzone={false}
          showPreviews={true}
          showFileNamesInPreview={true}
          dropzoneClass={classes.dropzone}
          maxFileSize={10000000}
          dropzoneText={"Drop images to upload here or click here"}
          onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
        />

        <Typography variant="body2" align="center">
          Maximum upload file size: 10 MB.
        </Typography>
      </div>

      <Button
        variant="contained"
        color="primary"
        disabled={!files.length > 0}
        style={{ width: "60%", marginTop: "40px" }}
        onClick={() => files.length > 0 && setisUploading(true)}
        size="large"
      >
        Upload images
      </Button>
    </>
  );
}

export default SelectImages;
