import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Location } from "history";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./styles";
import { useParty, useStreamQueries } from "@daml/react";
import { CNKUser } from "@daml.js/CNK-1.0.1/lib/CNK";

type SidebarLinkProps = {
  path : string
  label : string
  location : Location<unknown>
}

const Sidebar = ({ location } : RouteComponentProps) => {
  const classes = useStyles();
  const party = useParty();
  const cnkUserContracts = useStreamQueries(CNKUser).contracts; // retrieves the CNKUser 
  const isOnBoarded = cnkUserContracts.length !== 0 && party !== "UniandesAdmin";

  return (
    <Drawer open variant="permanent" className={classes.drawer} classes={{ paper: classes.drawer }}>
      <div className={classes.toolbar} />
      <List style={{ width: "100%" }}>
        {isOnBoarded && <SidebarLink key={0} label="Transfer Proposals" path="/app/my-transfer-proposals" location={location} /> }
        <SidebarLink key={1} label={party === "UniandesAdmin" ? "All Onboarded CNK Users" : "CNK User"} path="/app/my-cnk-user" location={location} />
        {party === "UniandesAdmin" && <SidebarLink key={2} label="Onboarding Requests" path="/app/useradmin" location={location} /> }
        {isOnBoarded && <SidebarLink key={3} label="New Transfer Proposal" path="/app/new-transfer-proposal" location={location} />}
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
