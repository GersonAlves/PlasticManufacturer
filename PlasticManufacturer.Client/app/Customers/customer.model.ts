
export interface ICustomer {
    id: number
    name: string
    description: string
    lastName: string
    code: string
    prospect: boolean
    lead: boolean
    fedId: number
    rating_id: number
    status_id: number
    salesRepresentant_id: number
    authorizedBy_id: number
    contactedBy_id: number
    addresses: ICustomerAddress[]
    customerDefaults_id: number
    shipViaAccounts: ICustomerShipViaAccount[]
    notes: string
}


export interface ICustomerAddress {
    id: number
    name: string
    description: string
    creationDate: Date
    lastUpdate: Date
}

export interface ICustomerShipViaAccount {
    id: number
    name: string
}




