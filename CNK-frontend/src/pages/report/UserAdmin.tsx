import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Ledger from "@daml/ledger";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { ContractId } from "@daml/types";
import { InputDialog, InputDialogProps } from "./InputDialog";
import useStyles from "./styles";
import { CNKUser } from "@daml.js/CNK-1.0.1/lib/CNK";
import { CNKUserRequest } from "@daml.js/CNK-1.0.1/lib/UserAdmin";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Grid } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function UserAdmin() {
  const classes = useStyles();
  const party = useParty();
  const ledger: Ledger = useLedger();
  const asUserAdmin = () => [{ useradmin: party }]
  const cnkUserRequests = useStreamQueries(CNKUserRequest, asUserAdmin).contracts;
  const cnkUsers = useStreamQueries(CNKUser, asUserAdmin).contracts;
  const [initialBalance, setInitialBalance] = useState("0");

  const handleBalanceChange = (event: any) => {
    setInitialBalance(String(event.target.value));
  };

  async function justApproveCNKUser(cnkUserRequest: CNKUserRequest.CreateEvent) {
    ledger.exercise(CNKUserRequest.GrantCNKUserRights, cnkUserRequest.contractId, { balance: initialBalance });
  }

  async function justRejectCNKUser(cnkUserRequest: CNKUserRequest.CreateEvent) {
    ledger.exercise(CNKUserRequest.RejectCNKUserRequest, cnkUserRequest.contractId, {});
  }

  function isAdmin() {
    return party === "UniandesAdmin"
  }

  function getComponent() {
    return (
      <div>
        <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ maxWidth: 700 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Please type the initial balance of the users you are going to approve.
                </Typography>
                <Box m={2} pt={3}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField
                        id="balance"
                        label="Balance For Approved Users"
                        value={initialBalance}
                        onChange={handleBalanceChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        <br />
        <Typography className={classes.tableTitle}>Solicitudes de ingreso a red CNK</Typography>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell key={0} className={classes.tableHeader}>Solicitante</TableCell>
              <TableCell key={1} className={classes.tableHeader}>Razón</TableCell>
              <TableCell key={2} className={classes.tableHeader}>Nombre de Usuario</TableCell>
              <TableCell key={4} className={classes.tableHeader}>Aprobar</TableCell>
              <TableCell key={5} className={classes.tableHeader}>Rechazar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cnkUserRequests.map((userRequest) => (
              <TableRow key={userRequest.contractId} className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}>{userRequest.payload.owner}</TableCell>
                <TableCell key={1} className={classes.tableCell}>{userRequest.payload.reason}</TableCell>
                <TableCell key={2} className={classes.tableCell}>{userRequest.payload.username}</TableCell>
                <TableCell key={4} className={classes.tableCellButton}>
                  <Button color="primary" size="small" className={classes.choiceButton} variant="contained" onClick={() => justApproveCNKUser(userRequest)}>Approve</Button>
                </TableCell>
                <TableCell key={5} className={classes.tableCellButton}>
                  <Button color="primary" size="small" className={classes.choiceButton} variant="contained" onClick={() => justRejectCNKUser(userRequest)}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
      </div>
    );
  }

  if (isAdmin()) {
    return getComponent();
  }
  else {
    return (<div />);
  }
}