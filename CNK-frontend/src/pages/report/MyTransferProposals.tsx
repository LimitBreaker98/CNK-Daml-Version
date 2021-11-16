import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Ledger from "@daml/ledger";
import { useLedger, useParty, useStreamQueries} from "@daml/react";
import { ContractId } from "@daml/types";
import { CNKUser, TransferProposal } from "@daml.js/CNK-1.0.1/lib/CNK";
import useStyles from "./styles";
import * as damlTypes from '@daml/types';
import { Grid, Typography } from "@material-ui/core";


export default function MyTransferProposals() {  
  const classes = useStyles();
  const party = useParty(); // Take current party :)
  const ledger : Ledger = useLedger(); // used for the writing stream process. Realization of the ledger from the POV of the party.
  let incomingTransferProposals = useStreamQueries(TransferProposal).contracts; // retrieves everything that the party, as at least observer, has access to of the specified contract type.
  const currentCNKUserContract = useStreamQueries(CNKUser).contracts[0]; // retrieves the CNKUser 

  let incomingIndex = 1;
  let outgoingIndex = 1;
  let outgoingTransferProposals = incomingTransferProposals.slice();
  
  incomingTransferProposals = incomingTransferProposals.filter(transferProposal => transferProposal.payload.receiverParty === party)
  outgoingTransferProposals = outgoingTransferProposals.filter(transferProposal => transferProposal.payload.senderCNKUser.owner === party)

  return (
    <>
      <Typography className={classes.tableTitle}> Incoming Transfer Proposals</Typography>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableHeader}>#</TableCell>
            <TableCell key={1} className={classes.tableHeader}>From</TableCell>
            <TableCell key={2} className={classes.tableHeader}>To</TableCell>
            <TableCell key={3} className={classes.tableHeader}>Amount</TableCell>
            <TableCell key={4} className={classes.tableHeader}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomingTransferProposals.map(t => (
            <TableRow key={t.contractId} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{incomingIndex++}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{t.payload.senderCNKUser.owner}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{t.payload.receiverParty}</TableCell>
              <TableCell key={3} className={classes.tableCell}>{t.payload.amount}</TableCell>
              <TableCell key={4} className={classes.tableCellButton}>
                <Button color="primary" size="small" className={classes.choiceButton} variant="contained" onClick={() => ledger.exercise(CNKUser.AcceptTransfer, currentCNKUserContract.contractId, {transferProposalCid: t.contractId}) }>Accept</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography className={classes.tableTitle}> Outgoing Transfer Proposals</Typography>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableHeader}>#</TableCell>
            <TableCell key={1} className={classes.tableHeader}>From</TableCell>
            <TableCell key={2} className={classes.tableHeader}>To</TableCell>
            <TableCell key={3} className={classes.tableHeader}>Amount</TableCell>
            <TableCell key={4} className={classes.tableHeader}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outgoingTransferProposals.map(t => (
            <TableRow key={t.contractId} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{outgoingIndex++}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{t.payload.senderCNKUser.owner}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{t.payload.receiverParty}</TableCell>
              <TableCell key={3} className={classes.tableCell}>{t.payload.amount}</TableCell>
              <TableCell key={4} className={classes.tableCellButton}>
                <Button color="primary" size="small" className={classes.choiceButton} variant="contained" onClick={() => ledger.exercise(CNKUser.CancelTransferProposal, currentCNKUserContract.contractId, {transferProposalCid: t.contractId}) }>Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

