/**
 * @ngdoc directive
 * @name Quality Tag Model
 * @description
 * Model for Creating tag,
 * for get the list of tags
 **/
export class QualityTagData {
    id: number;
    ID:number;
    ProblemType:string;
    PartID: string;
    Issuedby: string;
    Reason: string;
    MachineID:string;
    MachineDesc:string;
    ProcessStep:string;
    Date:string;
    Okdby: string;
    body:string;
    Lengthofchange:number;
    qty:number;
    Feature:string;
    QualityMemo:boolean;
    QualityATag:boolean;
    Supplier_Issue:boolean;
    HoldTag:boolean;
    TPCTag:boolean;
    SpecialInstWritten:boolean;
    Changed:string;

    //-Common Field
    CustomerName: string;
    CustomerRefNum:string;
     Comment : string;
    textAreaReason: string;
    //-Quality Alert
    QualityAlert:string;
    Cost: number;
    NofPiecesQA: Number;
    CustomerID: Number;
    DateIssued: Date;
    DispositionCustomer: string;
    DispositionStackpole: string;
    CertTag: boolean;
    ControlPlan: boolean;
    LayeredAudit: boolean;
    
    checkModWritten: boolean;
    ReasonNote:string;
  
    //--Special Inst
    SpecialInst:string;
    
    // to show the pannel in picture component 
    isPictureComponent:boolean;
    picture1:File;
    picture2:File;
    document:Array<File> ;
}