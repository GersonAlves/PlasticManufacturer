export interface IEmployee {
    id: number
    name: string
    description: string
    email: string
    status: boolean
    lastName: string
    birthday: Date
    gender?: {
        id: number
        name: string
        description: string
    }            		
    maritalStatus?: {
        id: number
        name: string
        description: string
    } 	
    address: string
    city?: {
        id: number
        name: string
        description: string
    }
    state?: {
        id: number
        name: string
        description: string
    }
    zipCode: string
    telephone: string
    ss: string
    HireDate: Date
    Title?: {
        id: number
        name: string
        description: string
    }
    Department?: {
        id: number
        name: string
        description: string
    }
}