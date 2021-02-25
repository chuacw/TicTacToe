export class Data { // 
    player!: string;
    move!: number;
}

export type drawEventListenerType = () => void;
export type playEventListenerType = (move: number) => boolean;
export type updateEventListenerType = (data: Data) => void;
export type victoryEventListenerType = (winner: string) => void;

export interface ArrayEmptyFill extends Array<any> {
    fill(): this;
}

