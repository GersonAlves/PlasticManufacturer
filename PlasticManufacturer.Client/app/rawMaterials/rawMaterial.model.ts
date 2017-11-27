export interface IRawMaterial {
    id: number
    name: string
    description: string
    code: string
    notes: string
    chemicalName: string
    status: boolean
    mainSupplier: string
    mainCustomer: string
    heatStability: string
    lightSatability: string
    fda: boolean
    hbfb: boolean
    //o "Q" e o "C" mudaram para minusculo
    qcRequired: boolean
    barCode: string
    //OperationType OperationType
    //Category Category
    //IList < Cost > Costs
}