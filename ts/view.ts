import { Event } from './event.js';  // 
import { ArrayEmptyFill, Data, playEventListenerType } from './types.js';

export class View {
  playEvent: Event;
  message: HTMLElement;
  cells!: HTMLDivElement[];
  resetButton: HTMLButtonElement;
  board: HTMLDivElement;
  break: HTMLElement;

  constructor(playEventListener: playEventListenerType, 
    resetButtonEventListener: (ev: MouseEvent) => void) {
    this.playEvent = new Event();
    this.playEvent.addListener(playEventListener);

    this.message = document.createElement('div');
    this.message.className = 'message';
    this.break = document.createElement("p");

    this.board = document.createElement('div');
    this.board.className = 'board';

    this.resetButton = document.createElement("button");
    this.resetButton.innerHTML = "Play again!";
    this.resetButton.addEventListener("click", resetButtonEventListener);
    this.resetButton.addEventListener("click", (): void => {
      this.resetBoard();
    });

    let body = document.body;
    body.appendChild(this.resetButton);
    body.appendChild(this.break);

    body.appendChild(this.board);
    body.appendChild(this.message);
  }

  resetBoard() {
    this.message.innerHTML = "";
    this.board.innerHTML = "";

    this.cells = (<ArrayEmptyFill>Array(9)).fill().map((_, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell'; // necessary for CSS rendering!

      cell.addEventListener('click', () => this.playEvent.trigger(i));

      this.board.appendChild(cell);

      return cell;
    });
  }

  render() {
    this.resetBoard();
  }

  updateCell(data: Data): void {
    this.cells[data.move].innerHTML = data.player;
  }

  victory(winner: string): void {
    this.message.innerHTML = `${winner} won!`;
  }

  draw(): void {
    this.message.innerHTML = "It's a draw!";
  }
}