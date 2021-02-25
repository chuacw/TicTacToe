import { Event } from "./event.js";
import { ArrayEmptyFill, drawEventListenerType, updateEventListenerType, victoryEventListenerType } from "./types.js";


export class TicTacToe {
    board!: string[];
    currentPlayer!: string;
    finished!: boolean;
    updateCellEvent!: Event;
    victoryEvent!: Event;
    drawEvent!: Event;

    drawEventListener: drawEventListenerType;
    updateEventListener: updateEventListenerType;
    victoryEventListener: victoryEventListenerType;

    reset() {
        this.board = (<ArrayEmptyFill>Array(9)).fill();
        this.currentPlayer = 'X';
        this.finished = false;

        this.drawEvent = new Event();
        this.drawEvent.addListener(this.drawEventListener);

        this.updateCellEvent = new Event();
        this.updateCellEvent.addListener(this.updateEventListener);

        this.victoryEvent = new Event();
        this.victoryEvent.addListener(this.victoryEventListener);
    }

    constructor(drawEventListener: drawEventListenerType, updateEventListener: updateEventListenerType, 
      victoryEventListener: victoryEventListenerType) {
        this.drawEventListener = drawEventListener;
        this.updateEventListener = updateEventListener;
        this.victoryEventListener = victoryEventListener;
        this.reset();
    }

    play(move: number): boolean {
        if (this.finished || move < 0 || move > 8 || this.board[move]) { return false; }

        this.board[move] = this.currentPlayer;
        this.updateCellEvent.trigger({ move, player: this.currentPlayer });

        this.finished = this.victory() || this.draw();

        if (!this.finished) { this.switchPlayer(); }

        return true;
    }

    victory() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const victory = lines.some(
            l => this.board[l[0]]
            && this.board[l[0]] === this.board[l[1]]
            && this.board[l[1]] === this.board[l[2]]
        );

        if (victory) {
            this.victoryEvent.trigger(this.currentPlayer);
        }

        return victory;
    }

    draw() {
        const draw = this.board.every((i: any) => i);

        if (draw) {
            this.drawEvent.trigger();
        }

        return draw;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
}
