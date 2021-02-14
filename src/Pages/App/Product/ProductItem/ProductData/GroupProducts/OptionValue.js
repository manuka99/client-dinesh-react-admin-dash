import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import api from "../../../../../../util/api";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function OptionValue({ value, fetchOptions }) {
  const classes = useStyles();
  const { product } = value;
  const [deleteBtnLoading, setDeleteBtnLoading] = React.useState(false);

  const deleteProduct = () => {
    setDeleteBtnLoading(true);
    api()
      .delete(`/options/option_value/destroy/${value.id}`)
      .then((res) => fetchOptions())
      .catch((e) => console.log(e))
      .finally(() => setDeleteBtnLoading(false));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.product_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonProgress
          size="small"
          color="secondary"
          variant="contained"
          handleButtonClick={deleteProduct}
          loading={deleteBtnLoading}
          name="delete"
        />
        <Button size="small" color="primary" variant="contained" href="/s">
          More
        </Button>
      </CardActions>
    </Card>
  );
}

export default OptionValue;
