import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30.3333%",
    marginBottom: theme.spacing(2),
    border: "1px solid #ccc",
  },
  flexRowCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

function OptionValue({ addon }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.gridHeading}>
        <Box pl={2} pr={2}>
          <Typography
            gutterBottom
            className={classes.ellipsis}
            variant="subtitle2"
          >
            {addon.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rs {addon.price}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          alt={addon.name}
          className={classes.image}
          image={addon.image ? addon.image : "/images/no_image.jpg"}
          title={addon.name}
        />
      </CardActionArea>
    </Card>
  );
}

export default OptionValue;
