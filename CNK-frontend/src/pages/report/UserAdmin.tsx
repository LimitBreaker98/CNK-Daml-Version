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
import { InputDialog, InputDialogProps } from "./InputDialog";
import useStyles from "./styles";
import { CNKUser } from "@daml.js/CNK-1.0.1/lib/CNK";
import { CNKUserRequest } from "@daml.js/CNK-1.0.1/lib/UserAdmin";
import { Typography } from "@material-ui/core";

export default function UserAdmin() {
  const classes = useStyles();
  const party = useParty();
  const ledger : Ledger = useLedger();
  const asUserAdmin = () => [{useradmin: party}]
  const cnkUserRequests = useStreamQueries(CNKUserRequest, asUserAdmin).contracts;
  const cnkUsers = useStreamQueries(CNKUser, asUserAdmin).contracts;

  async function justApproveCNKUser(cnkUserRequest: CNKUserRequest.CreateEvent) {
    ledger.exercise(CNKUserRequest.GrantCNKUserRights, cnkUserRequest.contractId, {balance: "20.00"});
  }

  async function justRejectCNKUser(cnkUserRequest: CNKUserRequest.CreateEvent) {
    ledger.exercise(CNKUserRequest.RejectCNKUserRequest, cnkUserRequest.contractId, {});
  }

  return (
    <>
      <Typography>Solicitudes de ingreso a red CNK</Typography>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>Solicitante</TableCell>
            <TableCell key={1} className={classes.tableCell}>Razón</TableCell>
            <TableCell key={2} className={classes.tableCell}>Nombre de Usuario</TableCell>
            <TableCell key={3} className={classes.tableCell}>Aprobar</TableCell>
            <TableCell key={4} className={classes.tableCell}>Rechazar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cnkUserRequests.map(i => (
            <TableRow key={i.contractId} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{i.payload.owner}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{i.payload.reason}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{i.payload.username}</TableCell>
              <TableCell key={3} className={classes.tableCellButton}>
                <Button color="primary" size="small" className={classes.choiceButton} variant="contained" onClick={() => justApproveCNKUser(i)}>Approve</Button>
              </TableCell>
              <TableCell key={4} className={classes.tableCellButton}>
                <Button color="primary" size="small" className={classes.choiceButton} variant="contained" onClick={() => justRejectCNKUser(i)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br /> 
      <Typography>Active CNK Users</Typography>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cnkUsers.map(o => (
            <TableRow key={o.contractId} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{o.payload.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
    </>
  );
}