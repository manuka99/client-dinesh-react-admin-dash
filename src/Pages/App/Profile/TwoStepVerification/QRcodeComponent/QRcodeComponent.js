import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  qrCode: {
    margin: "20px 0",
  },
}));

function QRcodeComponent({ qrCode, errors, handleTotpCode }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box mt={2} mb={2}>
        <Typography variant="h6" gutterBottom>
          2. Scan this barcode using your mobile.
        </Typography>
        <div className={classes.qrCode}>
          {qrCode && <span dangerouslySetInnerHTML={{ __html: qrCode }} />}
          <br />
          <Typography variant="caption">
            (If you find it difficult to scan the QR code please disable dark
            mode.)
          </Typography>
        </div>
        <Typography variant="body2">
          Scan the image above with the two-factor authentication app on your
          phone.After scanning the barcode image, the app will display a
          six-digit code that you can enter after sign in with your credentials.
        </Typography>
        <br />
        <Typography variant="subtitle2" gutterBottom>
          Enter the six-digit code from the application
        </Typography>
        <Typography variant="caption" gutterBottom>
          After scanning the barcode image, the app will display a six-digit
          code that you can enter below.
        </Typography>
        <TextField
          error={errors.code}
          variant="outlined"
          margin="normal"
          fullWidth
          id="code"
          label="TOTP code"
          name="code"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 99999 } }}
          autoFocus
          onChange={handleTotpCode}
          helperText={errors.code && errors.code}
        />
      </Box>
    </React.Fragment>
  );
}

export default QRcodeComponent;
