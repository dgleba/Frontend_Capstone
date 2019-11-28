export class ExternalTagData {
  id: number;
  //-Common Field
  CustomerName: string;
  PartID: string;
  checkSupplierIssue: boolean;
  MachineID: string;
  ProcessStep: string;
  Reason:string
  textLengthofchange: number;
  textOkdBy:string
  textAreaComment : string;
  textAreaChanged: string;
  textAreaReason: string;
  textIssuedBy: string;
  textAreaFeature: string;
  //-Quality Alert
  checkQualityAlert : boolean;
  textEstCost: number;
  textNoOfPieces: Number;
  textCustomerRefNum: Number;
  datepickerDateIssued: Date;
  dropCustomerDisposition: string;
  dropStackpoleDisposition: string;
  checkCertifiedMaterialTagIssued: boolean;
  checkControlPlan: boolean;
  checkLayeredAudit: boolean;
  checkQualityATag: boolean;
  textAreaQualityAlert: string;

  //--Hold Tag
  checkHoldTag: boolean;
  ReasonTextArea: string;
  textQty: number;

  //--TPC Tag
  checkTPCTag: boolean;
  checkModWritten: boolean;
  

  //--Special Inst
  textSpecialInstWritten: boolean;
  textAreaSpecialInst:string;
  
  // to show the pannel in picture component 
  isPictureComponent:boolean;
}
