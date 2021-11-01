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

type TransferProposalVariableInputs = {
  receiverParty: damlTypes.Party;
  amount: damlTypes.Numeric;
};

export default function MyTransferProposals() {  // TODO: Rename
  const classes = useStyles();
  const party = useParty(); // Take current party :)
  const ledger : Ledger = useLedger(); // used for the writing stream process. Realization of the ledger from the POV of the party.
  const cnkUserContracts = useStreamQueries(CNKUser).contracts; // retrieves the CNKUser 
  


  // <InputDialog { ...offerProps } />
  // <TableCell key={7} className={classes.tableCellButton}>
  //  <Button color="primary" size="small" className={classes.choiceButton} variant="contained" disabled={t.payload.receiverParty !== party} onClick={() => showOffer(t)}>Give</Button>
  // </TableCell>
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>From</TableCell>
            <TableCell key={1} className={classes.tableCell}>To</TableCell>
            <TableCell key={2} className={classes.tableCell}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cnkUserContracts.map(t => (
            <TableRow key={t.contractId} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{t.payload.owner}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{t.payload.balance}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{t.payload.useradmin}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{t.payload.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
