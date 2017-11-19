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
    requiredRatio: string
    interior: boolean
    exterior: boolean
    lightLastness: string
    hour: Date
    new: boolean
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
    fdaLetter: boolean
    uvLetter: boolean
    logoChips: boolean
    customerDueDate?: Date
    opacity_Id: number

    /*
        Customer Customer ok
        Packaging Packaging ok
        Carrier Carrier ok
        Pellet Pellet ok
        CustomerResin CustomerResin ok
        TargetType TargetType
        Product Product
        CustomerShipViaAccount CustomerShipViaAccount
        IList < ColorCustomerAddress > ColorCustomerAdresses
    */
}