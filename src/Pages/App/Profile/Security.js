import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box } from "@material-ui/core";
import ButtonProgress from "../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";

function Security() {
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      window.setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile Security
      </Typography>
      <Box mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="currentPassword"
                name="currentPassword"
                label="Current password"
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="newPassword"
              name="newPassword"
              label="New password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="repeatPassword"
              name="repeatPassword"
              label="Repeat password"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Logout of all connected devices"
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonProgress
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              name="Update Password"
              loading={loading}
              handleButtonClick={handleButtonClick}
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Security;
