export interface ColumnsTypes {

    [key: string]: {
        title: string,
        items: Item[]
    }
}

export interface Item {
    id: string,
    name: string,
    description: string,
    isEdit: boolean
}