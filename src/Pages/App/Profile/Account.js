import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import ButtonProgress from "../../../components/common/ButtonProgress/ButtonProgress";
import SaveIcon from "@material-ui/icons/Save";
import api from "../../../util/api";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import Error from "../../../components/alerts/Error";
import CustomLinearProgress from "../../../components/Progress/CustomLinearProgress";

function Account() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [editData, setEditData] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    setErrors({});
    api()
      .get("/user")
      .then((res) => {
        setUserData({ ...res.data.user });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
        setEditData(false);
      });
  };

  const updateUserProfile = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    setErrors({});
    api()
      .put("/user/profile-information", userData)
      .then((res) => {
        if (res.status === 200) {
          swal("", "User profile was successfully updated.", "success");
          fetchUserData();
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
        setBtnLoading(false);
      });
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: null });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile Details
      </Typography>
      {loading ? (
        <CustomLinearProgress />
      ) : (
        <Box mt={3} mb={2}>
          <Box mb={4}>
            {errors.message && <Error message={errors.message} />}
          </Box>
          <form noValidate autoComplete="off" onSubmit={updateUserProfile}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.fname}
                  helperText={errors.fname}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="fname"
                  label="First name"
                  fullWidth
                  value={userData.fname}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.fname }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lname}
                  helperText={errors.lname}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="lname"
                  label="Last name"
                  fullWidth
                  value={userData.lname}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.lname }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={userData.email}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.email }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.address}
                  helperText={errors.address}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  name="address"
                  label="Home Address"
                  fullWidth
                  value={userData.address}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.address }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.city}
                  helperText={errors.city}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="city"
                  label="City"
                  fullWidth
                  value={userData.city}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.city }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.state}
                  helperText={errors.state}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  value={userData.state}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.state }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.zip}
                  helperText={errors.zip}
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  value={userData.zip}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: userData.zip }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  InputProps={{
                    readOnly: !editData,
                  }}
                  required
                  name="country"
                  label="Country"
                  fullWidth
                  value="Sri Lanka"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>
              {editData ? (
                <Grid item xs={12}>
                  <ButtonProgress
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}
                    name="Update profile"
                    loading={btnLoading}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    startIcon={<EditIcon />}
                    onClick={() => setEditData(true)}
                  >
                    Edit profile
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Box>
      )}
    </React.Fragment>
  );
}

export default Account;
