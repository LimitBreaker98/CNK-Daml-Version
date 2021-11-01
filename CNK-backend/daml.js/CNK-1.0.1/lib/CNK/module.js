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

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');


exports.CancelProposal = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AcceptProposal = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.TransferProposal = {
  templateId: 'ce90bf0636d5dfb4234e9b11f340ddb9e6bd72a852a95c79c176708436e6740f:CNK:TransferProposal',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({senderCNKUser: exports.CNKUser.decoder, receiverParty: damlTypes.Party.decoder, amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    senderCNKUser: exports.CNKUser.encode(__typed__.senderCNKUser),
    receiverParty: damlTypes.Party.encode(__typed__.receiverParty),
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
  AcceptProposal: {
    template: function () { return exports.TransferProposal; },
    choiceName: 'AcceptProposal',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AcceptProposal.decoder; }),
    argumentEncode: function (__typed__) { return exports.AcceptProposal.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.TransferProposal; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  CancelProposal: {
    template: function () { return exports.TransferProposal; },
    choiceName: 'CancelProposal',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CancelProposal.decoder; }),
    argumentEncode: function (__typed__) { return exports.CancelProposal.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.TransferProposal);



exports.ArchiveCNKUser = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.CancelTransferProposal = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({transferProposalCid: damlTypes.ContractId(exports.TransferProposal).decoder, }); }),
  encode: function (__typed__) {
  return {
    transferProposalCid: damlTypes.ContractId(exports.TransferProposal).encode(__typed__.transferProposalCid),
  };
}
,
};



exports.AcceptTransfer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({transferProposalCid: damlTypes.ContractId(exports.TransferProposal).decoder, }); }),
  encode: function (__typed__) {
  return {
    transferProposalCid: damlTypes.ContractId(exports.TransferProposal).encode(__typed__.transferProposalCid),
  };
}
,
};



exports.ProposeTransfer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({receiverParty: damlTypes.Party.decoder, amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    receiverParty: damlTypes.Party.encode(__typed__.receiverParty),
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
};



exports.CNKUser = {
  templateId: 'ce90bf0636d5dfb4234e9b11f340ddb9e6bd72a852a95c79c176708436e6740f:CNK:CNKUser',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return exports.CNKUserKey.decoder; }); }),
  keyEncode: function (__typed__) { return exports.CNKUserKey.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({owner: damlTypes.Party.decoder, username: damlTypes.Text.decoder, useradmin: damlTypes.Party.decoder, balance: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    owner: damlTypes.Party.encode(__typed__.owner),
    username: damlTypes.Text.encode(__typed__.username),
    useradmin: damlTypes.Party.encode(__typed__.useradmin),
    balance: damlTypes.Numeric(10).encode(__typed__.balance),
  };
}
,
  ProposeTransfer: {
    template: function () { return exports.CNKUser; },
    choiceName: 'ProposeTransfer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.ProposeTransfer.decoder; }),
    argumentEncode: function (__typed__) { return exports.ProposeTransfer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(exports.TransferProposal), damlTypes.ContractId(exports.CNKUser)).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(exports.TransferProposal), damlTypes.ContractId(exports.CNKUser)).encode(__typed__); },
  },
  AcceptTransfer: {
    template: function () { return exports.CNKUser; },
    choiceName: 'AcceptTransfer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AcceptTransfer.decoder; }),
    argumentEncode: function (__typed__) { return exports.AcceptTransfer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.CNKUser).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.CNKUser).encode(__typed__); },
  },
  CancelTransferProposal: {
    template: function () { return exports.CNKUser; },
    choiceName: 'CancelTransferProposal',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CancelTransferProposal.decoder; }),
    argumentEncode: function (__typed__) { return exports.CancelTransferProposal.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.CNKUser).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.CNKUser).encode(__typed__); },
  },
  ArchiveCNKUser: {
    template: function () { return exports.CNKUser; },
    choiceName: 'ArchiveCNKUser',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.ArchiveCNKUser.decoder; }),
    argumentEncode: function (__typed__) { return exports.ArchiveCNKUser.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.CNKUser; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CNKUser);



exports.CNKUserKey = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({useradmin: damlTypes.Party.decoder, username: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    useradmin: damlTypes.Party.encode(__typed__.useradmin),
    username: damlTypes.Text.encode(__typed__.username),
  };
}
,
};

