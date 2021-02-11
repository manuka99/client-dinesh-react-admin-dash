import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BuildIcon from "@material-ui/icons/Build";
import SettingsIcon from "@material-ui/icons/Settings";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LinkIcon from "@material-ui/icons/Link";
import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import GenaralMain from "./General/GeneralMain";
import Inventory from "./Inventory/Inventory";
import Shipping from "./Shipping/Shipping";
import SimilarProducts from "./SimilarProducts/SimilarProducts";
import Attributes from "./Attributes/Attributes";
import Variations from "./Variations/Variations";
import GroupProducts from "./GroupProducts/GroupProducts";
import Advance from "./Advance/Advance";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  rowDiv: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "20%",
  },
  tab: {
    textTransform: "capitalize",
    textAlign: "left",
    minHeight: "auto",
    color: "#0073aa",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gridColumnGap: theme.spacing(1),
    padding: "6px 0 6px 4px",
    boxSizing: "border-box",
  },
  labelIcon: {
    "& .MuiTab-wrapper >*:first-child": {
      marginBottom: "0px",
    },
  },
  selected: {
    color: "#555",
  },
}));

function ProductDataMain({ handleProductData, productData }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue(productData.type === "variant" ? 1 : 0);
  }, [productData]);

  return (
    <div>
      <Card>
        <CardActionArea>
          <Box p={1} pl={2} className={classes.rowDiv}>
            <Typography variant="h6">Product data -</Typography>
            <FormControl variant="outlined" size="small">
              {/* <InputLabel id="product_type_select">Product type</InputLabel> */}
              <Select
                id="product_type_select"
                // label="Product type"
                variant="outlined"
                autoWidth
                value={productData.type}
                onChange={(e) => handleProductData("type", e.target.value)}
                size="small"
                native
              >
                <option
                  value=""
                  disabled
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  Product type
                </option>
                <option value="simple">Simple product</option>
                <option value="bundle">Bundle product</option>
                <option value="variant">Variant product</option>
              </Select>
            </FormControl>
          </Box>
          <Divider />
        </CardActionArea>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            value={value}
          >
            {(productData.type === "simple" ||
              productData.type === "bundle") && (
              <Tab
                classes={{
                  root: classes.tab,
                  wrapper: classes.wrapper,
                  labelIcon: classes.labelIcon,
                  selected: classes.selected,
                }}
                icon={<BuildIcon fontSize="small" />}
                label="General"
                {...a11yProps(0)}
                value={0}
              />
            )}
            <Tab
              classes={{
                root: classes.tab,
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selected,
              }}
              icon={<ShowChartIcon fontSize="small" />}
              label="Inventory"
              {...a11yProps(1)}
              value={1}
            />
            <Tab
              classes={{
                root: classes.tab,
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selected,
              }}
              icon={<LocalShippingIcon fontSize="small" />}
              label="Shipping"
              {...a11yProps(2)}
              value={2}
            />
            <Tab
              classes={{
                root: classes.tab,
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selected,
              }}
              icon={<LinkIcon fontSize="small" />}
              label="Similar products"
              {...a11yProps(3)}
              value={3}
            />
            {productData.type === "variant" && (
              <Tab
                classes={{
                  root: classes.tab,
                  wrapper: classes.wrapper,
                  labelIcon: classes.labelIcon,
                  selected: classes.selected,
                }}
                icon={<FeaturedVideoIcon fontSize="small" />}
                label="Atributes"
                {...a11yProps(4)}
                value={4}
              />
            )}

            {productData.type === "variant" && (
              <Tab
                classes={{
                  root: classes.tab,
                  wrapper: classes.wrapper,
                  labelIcon: classes.labelIcon,
                  selected: classes.selected,
                }}
                icon={<ViewModuleIcon fontSize="small" />}
                label="Variations"
                {...a11yProps(5)}
                value={5}
              />
            )}
            {productData.type === "bundle" && (
              <Tab
                classes={{
                  root: classes.tab,
                  wrapper: classes.wrapper,
                  labelIcon: classes.labelIcon,
                  selected: classes.selected,
                }}
                icon={<GroupWorkIcon fontSize="small" />}
                label="Bundle products"
                {...a11yProps(6)}
                value={6}
              />
            )}
            <Tab
              classes={{
                root: classes.tab,
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selected,
              }}
              icon={<SettingsIcon fontSize="small" />}
              label="Advance"
              {...a11yProps(7)}
              value={7}
            />
          </Tabs>
          <div style={{ width: "75%", overflowX: "auto" }}>
            {(productData.type === "simple" ||
              productData.type === "bundle") && (
              <TabPanel
                style={{
                  display: value === 0 ? "block" : "none",
                  width: "100%",
                }}
              >
                <GenaralMain />
              </TabPanel>
            )}
            <TabPanel
              style={{ display: value === 1 ? "block" : "none", width: "100%" }}
            >
              <Inventory />
            </TabPanel>
            <TabPanel
              style={{ display: value === 2 ? "block" : "none", width: "100%" }}
            >
              <Shipping />
            </TabPanel>
            <TabPanel
              style={{ display: value === 3 ? "block" : "none", width: "100%" }}
            >
              <SimilarProducts />
            </TabPanel>
            {productData.type === "variant" && (
              <TabPanel
                style={{
                  display: value === 4 ? "block" : "none",
                  width: "100%",
                }}
              >
                <Attributes />
              </TabPanel>
            )}
            {productData.type === "variant" && (
              <TabPanel
                style={{
                  display: value === 5 ? "block" : "none",
                  width: "100%",
                }}
              >
                <Variations />
              </TabPanel>
            )}
            {productData.type === "bundle" && (
              <TabPanel
                style={{
                  display: value === 6 ? "block" : "none",
                  width: "100%",
                }}
              >
                <GroupProducts />
              </TabPanel>
            )}
            <TabPanel
              style={{ display: value === 7 ? "block" : "none", width: "100%" }}
            >
              <Advance />
            </TabPanel>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductDataMain;
