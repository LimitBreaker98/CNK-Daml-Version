"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');

var CNK = require('../CNK/module');


exports.RejectCNKUserRequest = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.GrantCNKUserRights = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({balance: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    balance: damlTypes.Numeric(10).encode(__typed__.balance),
  };
}
,
};



exports.CNKUserRequest = {
  templateId: 'b8c927b28773920b65615a7844e09d57777171e85bab2ab6d88134d8cc9128a5:UserAdmin:CNKUserRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({owner: damlTypes.Party.decoder, useradmin: damlTypes.Party.decoder, username: damlTypes.Text.decoder, reason: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    owner: damlTypes.Party.encode(__typed__.owner),
    useradmin: damlTypes.Party.encode(__typed__.useradmin),
    username: damlTypes.Text.encode(__typed__.username),
    reason: damlTypes.Text.encode(__typed__.reason),
  };
}
,
  GrantCNKUserRights: {
    template: function () { return exports.CNKUserRequest; },
    choiceName: 'GrantCNKUserRights',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.GrantCNKUserRights.decoder; }),
    argumentEncode: function (__typed__) { return exports.GrantCNKUserRights.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(CNK.CNKUser).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(CNK.CNKUser).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.CNKUserRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  RejectCNKUserRequest: {
    template: function () { return exports.CNKUserRequest; },
    choiceName: 'RejectCNKUserRequest',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.RejectCNKUserRequest.decoder; }),
    argumentEncode: function (__typed__) { return exports.RejectCNKUserRequest.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CNKUserRequest);

