export interface IColorMatchRequest {
    id: number
    name: string
    description: string
    loteId: number
    productDescription: string
    productAplication: string
    priceQuoteRequired: boolean
    targetTypeField: string
    surfaceMatte: boolean
    surfaceGlossy: boolean
    surfaceOthers: string
    wallThickness: string
    opacity_Id: number
    injection: boolean
    blow: boolean
    compression: boolean
    extrusion: boolean
    fiberDenier: boolean
    coEx: boolean
    meltIndex: string
    film: boolean
    sheet: boolean
    rotational: boolean
    mfg: string
    gasAssitInjection: boolean
    customerResin_Id: number
    exact: boolean
    commercial: boolean
    closestSTD: string
    moreDe: string
    cieLab: boolean
    d65: boolean
    cfw: boolean
    a: boolean
    chipsQty: number
    tubeSample: boolean
    sheetExtrusionSample: boolean
    requiredCustomerQty: number
    unitQty: number
    packaging_Id: number
    requiredRatio: string
    carrier_Id: number
    pellet_Id : number
    interior: boolean
    exterior: boolean
    lightLastness: string
    hour: Date
    new: boolean
    reformulation_Id: number
    reason: string
    uv: boolean
    uvPackage: string
    isAntiOxidant: boolean
    antiOxidant: string
    isAntiStat: boolean
    antiStat: string
    additiveNone: boolean
    isLubricant: boolean
    lubricant: string
    amount: string
    additiveOther: string
    bestAdditive: boolean
    slip: boolean
    price?: number
    accuracy?: number
    turnaround?: number
    concernNone: boolean
    concernOther: string
    fda: boolean
    nonHm: boolean
    requirementNone: boolean
    requirementOther: string
    maximumHeat: string
    coa: boolean
    msds: boolean
    cie: boolean
    materiaSeet: boolean
    product: {
        id: number
        name: string 
        description: string
    }
    fdaLetter: boolean
    uvLetter: boolean
    logoChips: boolean
    customerDueDate?: Date
    labNotes :string
    shippingNotes: string
    label: string

    /*
        Customer Customer ok
        TargetType TargetType
        Product Product
        CustomerShipViaAccount CustomerShipViaAccount
        IList < ColorCustomerAddress > ColorCustomerAdresses

    */

}