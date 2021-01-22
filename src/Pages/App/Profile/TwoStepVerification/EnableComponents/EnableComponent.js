import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EnableIntro from "./EnableIntro";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
}));

function EnableComponent() {
  const classes = useStyles();
  const [isContinue, setIsContinue] = useState(false);

  return (
    <div className={classes.root}>
      {isContinue ? (
        <EnableIntro />
      ) : (
        <React.Fragment>
          <CardActionArea>
            <CardMedia
              className={classes.image}
              component="img"
              alt="Contemplative Reptile"
              height="240"
              image="/images/CBM-Corporate-Two-Step-Verification.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                Two factor authentication is not enabled.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Use your phone as your second step to sign in. Two-factor
                authentication adds an additional layer of security to your
                account by requiring more than just a password to log in.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Two-factor authentication adds an extra layer of security to
                your account. In addition to your username and password, you’ll
                need to enter a code that Pizza Apes sends to you via text or an
                app on your phone.
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
              onClick={() => setIsContinue(true)}
            >
              Continue
            </Button>
          </CardActions>
        </React.Fragment>
      )}
    </div>
  );
}

export default EnableComponent;
