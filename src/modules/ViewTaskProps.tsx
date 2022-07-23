import { Item } from "./columnTypes";

export interface IViewTask {
    show: boolean,
    onHide: any,
    onSave: any,
    item: Item | null,
    type: string
}