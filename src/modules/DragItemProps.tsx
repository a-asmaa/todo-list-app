import { Item } from "./columnTypes";

export interface IDraggableItems {
    index: number,
    keyValue: string,
    handleEdit: any,
    handleInLineEdit: any,
    item: Item,
    handleDelete: any
}