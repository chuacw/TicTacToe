import { TicTacToe } from './model.js';
import { View } from './view.js';
import { Data } from "./types.js";

// Controller glues model and view together 

export class Controller {
    model: TicTacToe;
    view: View;

    constructor() {
        
        // Initialize the TicTacToe model
        this.model = new TicTacToe(
            (): void => this.view.draw(),                              // drawEvent 
            (data: Data): void => this.view.updateCell(data),    // updateCellEvent
            (winner: string): void => this.view.victory(winner)  // victoryEvent
        );

        // Initialize the presentation of TicTacToe
        this.view = new View(
            (move: number): boolean => this.model.play(move),    // playEvent listener
            (ev: MouseEvent): void => this.run()                 // resetButton event listener
        );

    }

    run() {
        this.reset();
        this.view.render();
    }

    reset() {
        this.model.reset();
    }

}