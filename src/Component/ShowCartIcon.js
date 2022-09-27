import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    width: 400,
    height: "auto",
    overflow: "hidden",
    float: "left",
  },
  showcart: {
    fontSize: "15px",
    padding: "3px 10px 0px 10px",
  },

  ProductCart: {
    color: "#161617",
    fontSize: "14px",
  },
}));

export default function ShowCartIcon(props) {
  const classes = useStyles();

  //  Redux start code
  var cart = useSelector((state) => state.cart);
  var length = Object.keys(cart).length;
  var cartData = Object.values(cart);
  //var total=cartitems.reduce((a+b)=>a+b.price,0)
  var total = cartData.reduce(calculate, 0);
  function calculate(a, b) {
    var price =
      b.offerprice == 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand;
    return a + price;
  }
  //  console.log("xxxxxx:", total);

  var totalSaving = cartData.reduce(calculateSaving, 0);
  function calculateSaving(a, b) {
    var price = b.price - b.offerprice;
    var showPrice = parseInt(price);
    showPrice = price * b.qtydemand;
    return a + showPrice;
  }

  // console.log("xxxxxx:", totalSaving);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // end the code

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // looping data processing //
  const showCartItem = () => {
    return (
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <b>ORDER SUMMARY</b>
          </Grid>
          <Grid
            style={{ display: "flex", justityContent: "flex-end" }}
            item
            xs={12}
            sm={6}
          >
            <div
              className={{
                width: 200,
                display: "flex",
                justifyContent: "right",
                backgroundColor: "#e74c3c",
              }}
            >
              {length} item(s)
            </div>
          </Grid>

          {cartData.map((item) => (
            <>
              <Grid item xs={12} sm={6}>
                <caption>
                  <img
                    // src={`${ServerURL}/images/${item.picture}`}
                    // style={{ width: "30px", height: "35px" }}
                  ></img>
                  <figcaption>{item.productname}</figcaption>
                </caption>
              </Grid>
              <Grid item xs={12} sm={6}>
                <span>&#8377;</span>&nbsp;
                {item.offerprice == 0 ? item.price : item.offerprice}x{" "}
                {item.qtydemand}
              </Grid>
            </>
          ))}

          <Grid
            style={{ display: "flex", flexDirection: "column" }}
            item
            xs={12}
            sm={6}
          >
            <b>
              <span>&#8377;&nbsp;{total}</span>
            </b>
            <small style={{ color: "#008000" }}>
              You save<span>&#8377;</span>&nbsp;{totalSaving}
            </small>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary">
              PROCEED TO CART
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
  // end the code

  return (
    <div>
      <div className={classes.sectionDesktop}>
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <Badge badgeContent={length} color="secondary">
            <ShoppingCart />
            <span className={classes.showcart}>Cart</span>
          </Badge>
        </IconButton>

        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 65, left: 950 }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div className={classes.ProductCart}>{showCartItem()}</div>
        </Popover>
      </div>
    </div>
  );
}
