import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Box,
  Typography,
  Chip,
  Grid,
} from "@material-ui/core";
import { upload } from "../../../../util/api";
import swal from "sweetalert";
import DoneIcon from "@material-ui/icons/Done";
import InfoIcon from "@material-ui/icons/Info";
import { usePrompt } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: "0 60px",
  },
  images: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "10px",
    gap: "20px",
  },
  image: {
    objectFit: "cover",
    width: "120px",
  },
  content: {
    flexBasis: "75%",
  },
}));

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={40}>
        {props.waiting ? (
          <Typography variant="body2" color="textSecondary">
            waiting...
          </Typography>
        ) : !props.error ? (
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        ) : (
          <Typography variant="body2" color="secondary" noWrap>
            ! Error
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function UploadingUi({ files, setFiles, setisUploading }) {
  const classes = useStyles();
  const [progresses, setProgresses] = useState({});
  const [failedUploadIds, setfailedUploadIds] = useState([]);
  const [failedUploadMessages, setfailedUploadMessages] = useState([]);
  const [successUploadIds, setSuccessUploadIds] = useState([]);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [uploadingQueue, setUploadingQueue] = useState([]);
  const [totalQueueForDisplay, setTotalQueueForDisplay] = useState(
    files.length
  );

  usePrompt("Are you sure you want to cancel all uploads ?", true);

  const uploadFile = (currentFile, index) => {
    setUploadingStatus(true);
    updateFailedKeys(index);
    upload(currentFile, index, (event) => {
      setProgresses({
        ...progresses,
        [index]: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        if (response.data) {
          if (response.data.error) {
            setfailedUploadIds([
              ...failedUploadIds,
              parseInt(response.data.index),
            ]);
            setfailedUploadMessages([
              ...failedUploadMessages,
              {
                index: parseInt(response.data.index),
                message: response.data.message,
              },
            ]);
          } else if (response.data.success) {
            setSuccessUploadIds([
              ...successUploadIds,
              parseInt(response.data.index),
            ]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setProgresses({
          ...progresses,
          [index]: 0,
        });
        console.log(error);
        // setfailedUploadIds([...failedUploadIds, parseInt(response.data.index)]);
        // setfailedUploadMessages([
        //   ...failedUploadMessages,
        //   { index: parseInt(response.data.index), message: response.data.message },
        // ]);
      })
      .finally(() => {
        setUploadingStatus(false);
        console.log(successUploadIds);
        console.log(failedUploadIds);
      });
  };

  const updateFailedKeys = (index) => {
    var newFailedIds = failedUploadIds;
    var idindex = failedUploadIds.indexOf(index);
    if (idindex !== -1) {
      newFailedIds.splice(idindex, 1);
    }
    setfailedUploadIds([...newFailedIds]);
  };

  const getErrorMessage = (index) => {
    var message = "Unexpected error occured !";
    // eslint-disable-next-line
    failedUploadMessages.map((item) => {
      if (item.index === index) {
        message = item.message;
      }
    });
    return message;
  };

  // useEffect(() => {
  //   if (!uploadingStatus && typeof files[uploadingIndex] !== "undefined") {
  //     uploadFile(files[uploadingIndex].file, uploadingIndex);
  //     setUploadingIndex(uploadingIndex + 1);
  //   }
  // }, [uploadingStatus]);

  const addToQueue = (index) => {
    const queueArray = uploadingQueue;
    queueArray.push(index);
    const uniqueArray = new Set(queueArray);
    setUploadingQueue([...uniqueArray]);
  };

  useEffect(() => {
    var newQueCount = uploadingQueue.length;
    if (uploadingQueue.length > 0) {
      if (!uploadingStatus) {
        var index = uploadingQueue[0];
        uploadFile(files[index].file, index);

        var newUploadingQueue = uploadingQueue;
        var idindex = newUploadingQueue.indexOf(index);
        if (idindex !== -1) {
          newUploadingQueue.splice(idindex, 1);
          setUploadingQueue([...newUploadingQueue]);
        }
      }
    }
    if (uploadingStatus) newQueCount = newQueCount + 1;
    setTotalQueueForDisplay(newQueCount);
    console.log(uploadingQueue);
    // eslint-disable-next-line
  }, [uploadingStatus, uploadingQueue]);

  useEffect(() => {
    files.map((file, index) => addToQueue(index));
    // eslint-disable-next-line
  }, [files]);

  const cancelUploads = () => {
    var r = window.confirm("Are you sure you want to cancel all uploads?");
    if (r === true) {
      setUploadingQueue([]);
      setisUploading(false);
    }
  };

  const retryFailedUpload = () => {
    failedUploadIds.map((index) => addToQueue(index));
  };

  const clearCompletedUploads = () => {
    var newFiles = files;
    // eslint-disable-next-line
    successUploadIds.map((x) => {
      newFiles.splice(x, 1);
    });
    setFiles([...newFiles]);
    setSuccessUploadIds([]);
    setfailedUploadIds([]);
  };

  return (
    <div className={classes.root}>
      {totalQueueForDisplay === 0 ? (
        failedUploadIds.length === 0 ? (
          <Typography variant="h6" gutterBottom align="center">
            All images were uploaded successfully !
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: "14px" }}
              onClick={() => setisUploading(false)}
            >
              Back
            </Button>
          </Typography>
        ) : (
          <>
            <Typography variant="h6" align="center">
              ( {failedUploadIds.length} / {files.length}) images failed to
              upload !
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={retryFailedUpload}
              >
                Retry
              </Button>
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={cancelUploads}
            >
              Cancel and go back
            </Button>
            {successUploadIds.length > 0 && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={clearCompletedUploads}
              >
                Clear Completed uploads
              </Button>
            )}
          </>
        )
      ) : (
        <Typography variant="h6" gutterBottom align="center">
          Uploading ({totalQueueForDisplay}/{files.length}) images...{" "}
          <Button
            variant="text"
            color="secondary"
            size="small"
            onClick={cancelUploads}
          >
            Cancel
          </Button>
        </Typography>
      )}
      <Grid container spacing={4}>
        {files.map((file, index) => {
          return (
            <Grid item xs={12} md={6}>
              <Card elevation={4} key={index}>
                <CardActionArea
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                  }}
                >
                  <img
                    component="img"
                    alt={file}
                    height="80"
                    src={file.data}
                    className={classes.image}
                  />
                  <CardContent className={classes.content}>
                    <Typography variant="h5" style={{ fontSize: "20px" }}>
                      {file.file.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {file.file.type} , size(bytes): {file.file.size}
                    </Typography>
                    <LinearProgressWithLabel
                      color={`${
                        failedUploadIds.includes(index)
                          ? "secondary"
                          : "primary"
                      }`}
                      waiting={uploadingQueue.includes(index)}
                      error={failedUploadIds.includes(index)}
                      value={!progresses[index] ? 0 : progresses[index]}
                    />
                    {successUploadIds.includes(index) && (
                      <Chip
                        label="Completed"
                        clickable
                        color="primary"
                        onDelete={() => swal("File has been uploaded")}
                        deleteIcon={<DoneIcon />}
                      />
                    )}
                    {failedUploadIds.includes(index) && (
                      <Chip
                        label="Try again"
                        clickable
                        color="secondary"
                        onDelete={() => swal(getErrorMessage(index))}
                        onClick={() => addToQueue(index)}
                        deleteIcon={<InfoIcon />}
                      />
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default UploadingUi;
