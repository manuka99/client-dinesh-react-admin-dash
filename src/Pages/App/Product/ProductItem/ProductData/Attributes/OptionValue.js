import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Divider } from "@material-ui/core";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import ComponentModal from "../../../../../../components/Modals/ComponentModal";
import ValueForm from "./ValueForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "32%",
    marginBottom: theme.spacing(2),
    border: "1px solid #ccc",
  },
  flexRowCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSmall: {
    textTransform: "capitalize",
    paddingTop: "1px",
    paddingBottom: "1px",
  },
  image: {
    width: "100%",
    height: "60px",
  },
  ellipsis: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  gridHeading: {
    display: "grid",
    gridTemplateColumns: "70% 30%",
  },
}));

function OptionValue({ value, fetchOptions }) {
  const classes = useStyles();
  const [deleteBtnLoading, setDeleteBtnLoading] = React.useState(false);
  const [modelState, setModelState] = useState(false);

  const deleteValue = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/options/option_value/destroy/${value.id}`)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setDeleteBtnLoading(false));
  };

  return (
    <Card className={classes.root}>
      <ComponentModal
        closeModal={() => setModelState(false)}
        status={modelState}
        title="Update value"
        component={<ValueForm data={value} fetchOptions={fetchOptions} />}
      />
      <CardActionArea className={classes.gridHeading}>
        <Box pl={2} pr={2}>
          <Typography
            gutterBottom
            className={classes.ellipsis}
            variant="subtitle2"
          >
            {value.value_name}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          alt={value.value_name}
          className={classes.image}
          image={value.value_image ? value.value_image : "/images/no_image.jpg"}
          title={value.value_name}
        />
      </CardActionArea>
      <Divider />
      <CardActions className={classes.flexRowCenter}>
        <ButtonProgress
          color="secondary"
          variant="contained"
          handleButtonClick={deleteValue}
          className={classes.btnSmall}
          loading={deleteBtnLoading}
          name="delete"
        />
        <Button
          className={classes.btnSmall}
          color="primary"
          variant="contained"
          onClick={() => setModelState(true)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

export default OptionValue;
