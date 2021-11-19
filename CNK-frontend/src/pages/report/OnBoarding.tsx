import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import Ledger from "@daml/ledger";
import { useLedger, useParty } from '@daml/react';
import { CNKUserRequest } from "@daml.js/CNK-1.0.1/lib/UserAdmin";
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { fetchWellKnownParties } from "./wellKnownParties";

export function OnBoarding() {
  const party = useParty()
  const ledger: Ledger = useLedger(); // used for the writing stream process. Realization of the ledger from the POV of the party
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [useradmin, setUseradmin] = useState("");
  const [currentState, setCurrentState] = useState("");
  const states = {
    SUCCESS: "SUCCESS",
    DATA_ENTRY: "DATA_ENTRY",
    ERROR: "ERROR"
  }


  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleReasonChange = (event: any) => {
    setReason(event.target.value);
  };
  const handleUserAdminSelection = (event: any) => {
    async function selectUserAdmin() {
      const wkp = await fetchWellKnownParties();
      setUseradmin(wkp.parties!.userAdminParty);
    }
    selectUserAdmin();
  };

  function submitRequest() {
    //console.log("enviar request al ledger con amount " + amount + ", party: " + receiverParty);
    ledger.create(CNKUserRequest, { owner: party, useradmin: useradmin, username: name, reason: reason })
      .then(_res => {
        setCurrentState(states.SUCCESS);
      })
      .catch(_err => {
        setCurrentState(states.ERROR);
      });
  }

  return (
    <Grid container spacing={5} >
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 900 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Welcome to CNK Network!
            </Typography>
            <Typography variant="body1" color="text.primary">
              CNK Network is currently a work in progress. You will need to be authorized by CNK Network's
              Administrator before using the services. The administrator will also provide you with a starting
              balance.

              To request access, please fill out the following fields:
            </Typography>
            <Box m={2} pt={3}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    id="Name"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Reason"
                    label="Reason"
                    value={reason}
                    onChange={handleReasonChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="useradmin-selection">
                      UserAdmin
                    </InputLabel>
                    <Select
                      labelId="useradmin-selection"
                      id="useradmin-selection"
                      value={useradmin}
                      label="Administrator selection"
                      onChange={handleUserAdminSelection}
                    >
                      <MenuItem value={"UniandesAdmin"}>Uniandes: Global Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => submitRequest()}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {currentState === states.ERROR && <Grid item xs={12}>
          <Alert severity="error" onClose={() => setCurrentState(states.DATA_ENTRY)}>
            <AlertTitle>Error</AlertTitle>
            <strong> User Request Not Created. Check the fields and try again.</strong>
          </Alert>
        </Grid>}
        {currentState === states.SUCCESS && <Grid item xs={12}>
          <Alert severity="success" onClose={() => setCurrentState(states.DATA_ENTRY)}>
            <AlertTitle>Success</AlertTitle>
            <strong> User Request created, pending approval from a CNK Network Administrator.</strong>
          </Alert>
        </Grid>}

      </Grid>
    </Grid>
  );
}
