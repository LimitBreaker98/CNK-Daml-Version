import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Ledger from "@daml/ledger";
import { OnBoarding } from "../report/OnBoarding"
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { ContractId } from "@daml/types";
import { CNKUser, TransferProposal } from "@daml.js/CNK-1.0.1/lib/CNK";
import useStyles from "./styles";
import * as damlTypes from '@daml/types';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


export default function MyCNKUser() {
  const classes = useStyles();
  const cnkUserContracts = useStreamQueries(CNKUser).contracts; // retrieves the CNKUser 
  const isOnBoarded = cnkUserContracts.length !== 0;

  const [show, setShow] = React.useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 200)

    return () => clearTimeout(timeout)

  }, [show])

  if (!show) {
    return (
      <Box>
        <Skeleton variant="rectangular"  height={118} />
      </Box>
    );
  }

  if (!isOnBoarded) {
    return (
      <OnBoarding />
    );
  } 

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableHeader}>Owner</TableCell>
            <TableCell key={1} className={classes.tableHeader}>Balance</TableCell>
            <TableCell key={2} className={classes.tableHeader}>Authorized by</TableCell>
            <TableCell key={3} className={classes.tableHeader}>User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cnkUserContracts.map(t => (
            <TableRow key={t.contractId} className={classes.tableRow}>
              <TableCell key={0} className={classes.tableCell}>{t.payload.owner}</TableCell>
              <TableCell key={1} className={classes.tableCell}>{t.payload.balance}</TableCell>
              <TableCell key={2} className={classes.tableCell}>{t.payload.useradmin}</TableCell>
              <TableCell key={3} className={classes.tableCell}>{t.payload.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
  
}
