
export interface ICustomer {
    id: number
    name: string
    description: string
    lastName: string
    code: string
    prospect: boolean
    lead: boolean
    fedId: number
    rating: ICustomerRating
    status: ICustomerStatus
    salesRepresentant: IEmployee
    authorizedBy: IEmployee
    contactedBy: ICustomerContacted
    addresses: ICustomerAddress[]
    customerDefaults: ICustomerDefault
    shipViaAccounts: ICustomerShipViaAccount[]
    notes: string
}

export interface ICustomerRating {
    id: number
    name: string
    description: string
    creationDate: Date
    lastUpdate: Date
}

export interface ICustomerStatus {
    id: number
    name: string
    description: string
    creationDate: Date
    lastUpdate: Date
}

export interface ICustomerContacted {
    id: number
    name: string
    description: string
    creationDate: Date
    lastUpdate: Date
}

export interface IEmployee {
    id: number
    name: string
}

export interface ICustomerAddress {
    id: number
    name: string
    description: string
    creationDate: Date
    lastUpdate: Date
}

export interface ICustomerDefault {
    addressType?: {
        id: number
        name: string
        description: string
    }  
        street: string
        complement: string 
        state?: {
            id: number
            name: string
            description: string
        }
        city?: {
            id: number
            name: string
            description: string
        } 
         zipCode: string
         phone: string  
         fax: string
}

export interface ICustomerShipViaAccount {
    id: number
    name: string
}




