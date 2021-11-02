// Generated from CNK.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type CancelProposal = {
};

export declare const CancelProposal:
  damlTypes.Serializable<CancelProposal> & {
  }
;


export declare type AcceptProposal = {
};

export declare const AcceptProposal:
  damlTypes.Serializable<AcceptProposal> & {
  }
;


export declare type TransferProposal = {
  senderCNKUser: CNKUser;
  receiverParty: damlTypes.Party;
  amount: damlTypes.Numeric;
};

export declare const TransferProposal:
  damlTypes.Template<TransferProposal, undefined, 'e48330896381fa61ddc9d18649728351516c94f64b05a228ad879be1b4cd0bdd:CNK:TransferProposal'> & {
  AcceptProposal: damlTypes.Choice<TransferProposal, AcceptProposal, {}, undefined>;
  Archive: damlTypes.Choice<TransferProposal, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  CancelProposal: damlTypes.Choice<TransferProposal, CancelProposal, {}, undefined>;
};

export declare namespace TransferProposal {
  export type CreateEvent = damlLedger.CreateEvent<TransferProposal, undefined, typeof TransferProposal.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<TransferProposal, typeof TransferProposal.templateId>
  export type Event = damlLedger.Event<TransferProposal, undefined, typeof TransferProposal.templateId>
  export type QueryResult = damlLedger.QueryResult<TransferProposal, undefined, typeof TransferProposal.templateId>
}



export declare type ArchiveCNKUser = {
};

export declare const ArchiveCNKUser:
  damlTypes.Serializable<ArchiveCNKUser> & {
  }
;


export declare type CancelTransferProposal = {
  transferProposalCid: damlTypes.ContractId<TransferProposal>;
};

export declare const CancelTransferProposal:
  damlTypes.Serializable<CancelTransferProposal> & {
  }
;


export declare type AcceptTransfer = {
  transferProposalCid: damlTypes.ContractId<TransferProposal>;
};

export declare const AcceptTransfer:
  damlTypes.Serializable<AcceptTransfer> & {
  }
;


export declare type ProposeTransfer = {
  receiverParty: damlTypes.Party;
  amount: damlTypes.Numeric;
};

export declare const ProposeTransfer:
  damlTypes.Serializable<ProposeTransfer> & {
  }
;


export declare type CNKUser = {
  owner: damlTypes.Party;
  username: string;
  useradmin: damlTypes.Party;
  balance: damlTypes.Numeric;
};

export declare const CNKUser:
  damlTypes.Template<CNKUser, CNKUser.Key, 'e48330896381fa61ddc9d18649728351516c94f64b05a228ad879be1b4cd0bdd:CNK:CNKUser'> & {
  ProposeTransfer: damlTypes.Choice<CNKUser, ProposeTransfer, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.ContractId<TransferProposal>, damlTypes.ContractId<CNKUser>>, CNKUser.Key>;
  AcceptTransfer: damlTypes.Choice<CNKUser, AcceptTransfer, damlTypes.ContractId<CNKUser>, CNKUser.Key>;
  CancelTransferProposal: damlTypes.Choice<CNKUser, CancelTransferProposal, damlTypes.ContractId<CNKUser>, CNKUser.Key>;
  ArchiveCNKUser: damlTypes.Choice<CNKUser, ArchiveCNKUser, {}, CNKUser.Key>;
  Archive: damlTypes.Choice<CNKUser, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, CNKUser.Key>;
};

export declare namespace CNKUser {
  export type Key = CNKUserKey
  export type CreateEvent = damlLedger.CreateEvent<CNKUser, CNKUser.Key, typeof CNKUser.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CNKUser, typeof CNKUser.templateId>
  export type Event = damlLedger.Event<CNKUser, CNKUser.Key, typeof CNKUser.templateId>
  export type QueryResult = damlLedger.QueryResult<CNKUser, CNKUser.Key, typeof CNKUser.templateId>
}



export declare type CNKUserKey = {
  useradmin: damlTypes.Party;
  username: string;
};

export declare const CNKUserKey:
  damlTypes.Serializable<CNKUserKey> & {
  }
;

