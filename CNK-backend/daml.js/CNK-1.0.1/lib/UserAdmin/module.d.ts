// Generated from UserAdmin.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as CNK from '../CNK/module';

export declare type RejectCNKUserRequest = {
};

export declare const RejectCNKUserRequest:
  damlTypes.Serializable<RejectCNKUserRequest> & {
  }
;


export declare type GrantCNKUserRights = {
  balance: damlTypes.Numeric;
};

export declare const GrantCNKUserRights:
  damlTypes.Serializable<GrantCNKUserRights> & {
  }
;


export declare type CNKUserRequest = {
  owner: damlTypes.Party;
  useradmin: damlTypes.Party;
  username: string;
  reason: string;
};

export declare const CNKUserRequest:
  damlTypes.Template<CNKUserRequest, undefined, 'b8c927b28773920b65615a7844e09d57777171e85bab2ab6d88134d8cc9128a5:UserAdmin:CNKUserRequest'> & {
  GrantCNKUserRights: damlTypes.Choice<CNKUserRequest, GrantCNKUserRights, damlTypes.ContractId<CNK.CNKUser>, undefined>;
  Archive: damlTypes.Choice<CNKUserRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  RejectCNKUserRequest: damlTypes.Choice<CNKUserRequest, RejectCNKUserRequest, {}, undefined>;
};

export declare namespace CNKUserRequest {
  export type CreateEvent = damlLedger.CreateEvent<CNKUserRequest, undefined, typeof CNKUserRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CNKUserRequest, typeof CNKUserRequest.templateId>
  export type Event = damlLedger.Event<CNKUserRequest, undefined, typeof CNKUserRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<CNKUserRequest, undefined, typeof CNKUserRequest.templateId>
}


