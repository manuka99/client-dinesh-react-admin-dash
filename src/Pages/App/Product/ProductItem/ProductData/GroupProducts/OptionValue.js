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
    width: "32%",
    marginBottom: "4%",
  },
  ellipsis: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
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
          alt={product.product_name}
          height="100"
          image={product.image}
          title={product.product_name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            className={classes.ellipsis}
          >
            {product.product_name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.ellipsis}
          >
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.flexRowCenter}>
        <ButtonProgress
          size="small"
          color="secondary"
          variant="contained"
          handleButtonClick={deleteProduct}
          className={classes.btnSmall}
          loading={deleteBtnLoading}
          name="delete"
        />
        <Button
          size="small"
          className={classes.btnSmall}
          color="primary"
          variant="contained"
          component="a"
          target="_blank"
          href={`/app/products/edit/${product.id}`}
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
}

export default OptionValue;
