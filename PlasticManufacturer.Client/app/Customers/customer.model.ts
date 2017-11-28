
export interface ICustomer {
    id: number
    name: string
    description: string
    lastName: string
    code: string
    prospect: boolean
    lead: boolean
    fedId: number
    rating_Id: number
    status_Id: number
    salesRepresentant_Id: number
    city_Id: number
    state_Id:number
    authorizedBy_Id: number
    contactedBy_Id: number
    addresses: ICustomerAddress[]
    shipViaAccounts: ICustomerShipViaAccount[]
    notes: string
    customerDefault?: {
        id: number
        freight_Id: number
        freightDescription: string
        mailingList: boolean
        mutipleSites: boolean
        reference: string
        secondLabel_Id: number
        note: string
    }

}

export interface ICustomerAddress {
    id: number
    name: string
    description: string
    city_Id: number
    state_Id: number
    zipCode: string
    phone: string
    fax: string
    street: string
    complement: string
    addressType_Id: number
}

export interface ICustomerShipViaAccount {
    id: number
    name: string
}




