import { backendData } from "../mocks";
import { Node } from "../models";

export const fetchData: () => Promise<Node[]> = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(backendData);
        }, 10)
    });
}
