import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    objectFit: "contain",
  },
}));

function TwoStepVerification() {
  const classes = useStyles();

  const handleContinue = (event) => { };
  
  return (
    <div className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image="/images/CBM-Corporate-Two-Step-Verification.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            Use your phone as your second step to sign in
          </Typography>
          <Typography variant="body2" color="textSecondary">
            After you enter your password, Google prompts are securely sent to
            every phone where you're signed in. Just tap the notification to
            review and sign in.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="outlined" color="primary">
          Learn More
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </CardActions>
    </div>
  );
}

export default TwoStepVerification;
