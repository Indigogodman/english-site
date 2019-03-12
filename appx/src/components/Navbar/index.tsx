import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";

import { NavbarProps } from "./d";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

const Navbar = (props: NavbarProps) => {
  const { classes, items, title } = props;
  return (
    <AppBar
      position="static"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h6" color="primary" className={classes.grow}>
          <Link to={"/"}>{title}</Link>
        </Typography>
        {items}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Navbar);
