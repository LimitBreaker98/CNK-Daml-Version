import React, { useState, useEffect }  from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import DamlLedger from "@daml/react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useUserState } from "../../context/UserContext";
import { wsBaseUrl, httpBaseUrl } from "../../config";
import useStyles from "./styles";
import MyCnkUser from "../../pages/report/MyCNKUser";
import MyTransferProposals from "../../pages/report/MyTransferProposals";
import UserAdmin from "../../pages/report/UserAdmin";
import NewTransferProposal from "../../pages/report/NewTransferProposal";

const Layout = () => {
  const classes = useStyles();
  const user = useUserState();

  if(!user.isAuthenticated){
    return null;
  } else {
    return (
      <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
        <div className={classes.root}>
            <>
              <Header />
              <Sidebar />
              <div className={classes.content}>
                <div className={classes.fakeToolbar} />
                <Switch>
                  <Route path="/app/my-cnk-user" component={MyCnkUser} />
                  <Route path="/app/my-transfer-proposals" component={MyTransferProposals} />
                  <Route path="/app/useradmin" component={UserAdmin} />
                  <Route path="/app/new-transfer-proposal" component={NewTransferProposal}/>
                </Switch>
              </div>
            </>
        </div>
      </DamlLedger>
    );
  }
}

export default withRouter(Layout);
