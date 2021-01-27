import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box } from "@material-ui/core";
import ButtonProgress from "../../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";
import api from "../../../../util/api";
import Error from "../../../../components/alerts/Error";
import swal from "sweetalert";

const initialPasswordData = {
  current_password: "",
  password: "",
  password_confirmation: "",
  logOutOthers: false,
};

function Security() {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({ ...initialPasswordData });
  const [errors, setErrors] = useState({});

  const updatePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(passwordData);
    api()
      .put("/user/password", passwordData)
      .then((res) => {
        if (res.status === 200) {
          setPasswordData({
            ...initialPasswordData,
          });
          swal("", "User password was updated successfully", "success");

          setErrors({});
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 422) {
            let { message, errors } = error.response.data;
            setErrors({ message, ...errors });
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formDataChanged = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleFormCheckLogoutOthers = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.checked });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        #1 Update user password
      </Typography>
      {errors.message && <Error message={errors.message} />}
      <Box mt={1}>
        <form autoComplete="off" onSubmit={updatePassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="current_password"
                  label="Current password"
                  type="password"
                  error={errors.current_password}
                  helperText={
                    errors.current_password ||
                    "Current password must have atleast 8 characters"
                  }
                  inputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  onChange={formDataChanged}
                  fullWidth
                  autoFocus
                  value={passwordData.current_password}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="password"
                label="New password"
                type="password"
                fullWidth
                onChange={formDataChanged}
                helperText={
                  errors.password ||
                  "New password must have at least 8 characters"
                }
                error={errors.password}
                disabled={
                  passwordData.current_password === undefined ||
                  passwordData.current_password.length < 8
                }
                inputProps={{
                  autocomplete: "new-password",
                  form: {
                    autocomplete: "off",
                  },
                }}
                value={passwordData.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="password_confirmation"
                label="Repeat password"
                type="password"
                fullWidth
                onChange={formDataChanged}
                error={errors.password_confirmation}
                helperText={
                  errors.password_confirmation || "Enter new password again"
                }
                disabled={
                  passwordData.password === undefined ||
                  passwordData.password.length < 8
                }
                inputProps={{
                  autocomplete: "new-password",
                  form: {
                    autocomplete: "off",
                  },
                }}
                value={passwordData.password_confirmation}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="logOutOthers"
                    value="yes"
                    onChange={handleFormCheckLogoutOthers}
                    checked={passwordData.logOutOthers}
                  />
                }
                label="Log out of all other connected devices"
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
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </Box>
      <br />
      <Typography variant="h6" gutterBottom>
        #2 Email verification
      </Typography>
    </React.Fragment>
  );
}

export default Security;
