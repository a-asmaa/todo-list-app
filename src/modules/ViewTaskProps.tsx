import { Item } from "./columnTypes";

export interface IViewTask {
    show: boolean,
    onHide: any,
    handleSave: any,
    item: Item | null,
    type: string
}