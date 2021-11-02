import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Location } from "history";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import LocalPlay from "@material-ui/icons/LocalPlay";
import useStyles from "./styles";
import { MonetizationOn, SupervisorAccount, Image } from "@material-ui/icons";

type SidebarLinkProps = {
  path : string
  label : string
  location : Location<unknown>
}

const Sidebar = ({ location } : RouteComponentProps) => {
  const classes = useStyles();

  return (
    <Drawer open variant="permanent" className={classes.drawer} classes={{ paper: classes.drawer }}>
      <div className={classes.toolbar} />
      <List style={{ width: "50%" }}>
        <SidebarLink key={0} label="My Transfer Proposals" path="/app/my-transfer-proposals" location={location} />
        <SidebarLink key={1} label="My CNK User" path="/app/my-cnk-user" location={location} />
        <SidebarLink key={2} label="User Admin" path="/app/useradmin" location={location} />
      </List>
    </Drawer>
  );
};

const SidebarLink = ({ path, label, location } : SidebarLinkProps) => {
  const classes = useStyles();
  const active = path && (location.pathname === path || location.pathname.indexOf(path) !== -1);

  return (
    <ListItem button component={Link} to={path} className={classes.link} classes={{ root: active ? classes.linkActive : classes.linkRoot }}>
      <ListItemText classes={{ primary: active ? classes.linkTextActive : classes.linkText }} primary={label} />
    </ListItem>
  );
}

export default withRouter(Sidebar);
