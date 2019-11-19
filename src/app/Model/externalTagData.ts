export class ExternalTagData {
  id: number;
  //-Common Field
  CustomerName: string;
  PartID: string;
  Reason: string;
  Issuedby: string;
  ExtSupplierIssue: boolean;
  //-Quality Alert
  EstCost: number;
  NoOfPieces: Number;
  CustomerRefNum: Number;
  DateIssued: Date;
  CustomerDisposition: string;
  Stackpole: string;
  CertifiedMaterialTagIssued: boolean;
  ExtControlPlan: boolean;
  ExtLayeredAudit: boolean;
  ExtQualityATag: boolean;
  QualityAlertTextArea: string;

  //--Hold Tag
  ExtHoldTag: boolean;
  ReasonTextArea: string;
  qty: number;

  //--TPC Tag
  ExtModWritten: boolean;
  Okdby: string;
  ExtTPCTag: boolean;
  FeatureTextArea: string;

  //--Special Inst
  ExtSpecialInstWritten: boolean;
  SpecialInstructionTextArea: string;

  Date: string;
  Lengthofchange: number;
  Feature: string;
  Changed: string;
  MachineID: string;
  ProcessStep: string;
  commentTextArea: string;
}
