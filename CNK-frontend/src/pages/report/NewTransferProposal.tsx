import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Ledger from "@daml/ledger";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { ContractId } from "@daml/types";
import { CNKUser, TransferProposal } from "@daml.js/CNK-1.0.1/lib/CNK";
import useStyles from "./styles";
import * as damlTypes from '@daml/types';
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const states = {
	SUCCESS: "SUCCESS",
  DATA_ENTRY: "DATA_ENTRY",
  ERROR: "ERROR"
}

export default function NewTransferProposal() {
  const classes = useStyles();
  const party = useParty();
  const ledger: Ledger = useLedger(); // used for the writing stream process. Realization of the ledger from the POV of the party.
  const currentCNKUserContract = useStreamQueries(CNKUser).contracts; // retrieves the CNKUser 

  //console.log("Party es: " + party);
  const [amount, setAmount] = useState(0);
  const [receiverParty, setReceiverParty] = useState("");
  const [currentState, setCurrentState] = useState(states.DATA_ENTRY);


  function sendTransferProposal(cnkAmount: string, toParty: string) {
    //console.log("enviar request al ledger con amount " + amount + ", party: " + receiverParty);
    ledger.exercise(CNKUser.ProposeTransfer, currentCNKUserContract[0].contractId, { receiverParty: toParty, amount: cnkAmount })
    .then(_res => {
      setCurrentState(states.SUCCESS);
    })
    .catch(_err => {
      setCurrentState(states.ERROR);
    });
  }


  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 10 } }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl variant="standard">
              <InputLabel htmlFor="receiver-party">
                Receiver Party
              </InputLabel>
              <Input
                id="receiver-party"
                error={receiverParty === party}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                onChange={(event) => setReceiverParty(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-error-helper-text"
              label="Transfer Amount"
              error={amount <= 0.0}
              helperText={"Introduce a positive value to transfer"}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => sendTransferProposal(String(amount), receiverParty)}>
              Send transfer proposal
            </Button>
          </Grid>
        </Grid>
        {currentState === states.ERROR && <Grid item xs={12}>
          <Alert severity="error" onClose={() => setCurrentState(states.DATA_ENTRY)}>
            <AlertTitle>Error</AlertTitle>
            <strong> Transaction Proposal Not Created. Check the receiving party and the amount, and try again.</strong>
          </Alert>
        </Grid>}
        {currentState === states.SUCCESS && <Grid item xs={12}>
          <Alert severity="success" onClose={() => setCurrentState(states.DATA_ENTRY)}>
            <AlertTitle>Success</AlertTitle>
            <strong> Transaction Proposal Created, check it on your Transfer Proposals Tab.</strong>
          </Alert>
        </Grid>}
      </Box>
    </>
  );
};
