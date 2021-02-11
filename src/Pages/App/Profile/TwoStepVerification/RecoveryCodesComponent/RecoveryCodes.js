import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";
import swal from "sweetalert";
import ReactDOMServer from "react-dom/server";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
  rCode: {
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "text",
    whiteSpace: "nowrap",
    listStylePosition: "inside",
  },
}));

function RecoveryCodes({ recoveryCodes }) {
  const classes = useStyles();

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([recoveryCodes.join("\n")], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "pizza-apes-recovery-codes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const printCodes = () => {
    var content = printHtml;
    console.log(content);
    var pri = document.getElementById("recoveryCodesToPrint").contentWindow;
    pri.document.open();
    pri.document.write(content);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const printHtml = ReactDOMServer.renderToStaticMarkup(
    <div id="print_codes">
      <Typography variant="h3">Recovery codes - Pizza Apes</Typography>
      <Grid container spacing={4} direction="column">
        {recoveryCodes.map((code) => {
          return (
            <Grid item xs={12}>
              <li className={classes.rCode}>{code}</li>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="body2" color="secondary" gutterBottom>
        Treat your recovery codes with the same level of attention as you would
        your password.
      </Typography>
    </div>
  );

  const copyToClipBoard = () => {
    var cb = document.getElementById("recovery_codes_id");
    cb.value = recoveryCodes.join("\n");
    cb.style.display = "block";
    cb.select();
    document.execCommand("copy");
    cb.style.display = "none";
    swal(
      "Copied succesfully!",
      "Recovery codes have been copied successfully. Treat your recovery codes with the same level of attention as you would your password.",
      "success"
    );
  };

  return (
    <React.Fragment>
      <iframe
        id="recoveryCodesToPrint"
        title="recoveryCodesToPrint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      ></iframe>
      <Box mt={3} mb={4}>
        <Typography variant="h6" gutterBottom>
          1. Save these recovery codes.
        </Typography>
        <Typography variant="body2">
          Recovery codes are used to access your account in the event you cannot
          receive two-factor authentication codes.
        </Typography>
        <Box p={2} mt={2} mb={3} bgcolor="warning.light" color="white">
          <Typography variant="body2">
            Download, print, or copy your recovery codes before continuing
            two-factor authentication setup below.
          </Typography>
        </Box>
        <Box mt={2} mb={1}>
          <Grid container spacing={3}>
            {recoveryCodes.map((code) => {
              return (
                <Grid item xs={12} sm={6} lg={4}>
                  <li className={classes.rCode}>{code}</li>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <input
          id="recovery_codes_id"
          type="text"
          hidden
          style={{ display: "none" }}
        />
        <br />
        <Typography variant="subtitle2" color="error">
          Treat your recovery codes with the same level of attention as you
          would your password! We recommend saving them with a password manager
          such as Lastpass, 1Password, or Keeper.
        </Typography>
        <Box mt={2}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={downloadTxtFile}
                fullWidth
                startIcon={<GetAppIcon />}
              >
                Download
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={printCodes}
                fullWidth
                startIcon={<PrintIcon />}
              >
                Print
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={copyToClipBoard}
                fullWidth
                startIcon={<FileCopyIcon />}
              >
                Copy
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default RecoveryCodes;
