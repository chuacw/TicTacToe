import {
    Data, drawEventListenerType, playEventListenerType,
    updateEventListenerType, victoryEventListenerType
} from "./types.js";

export class Event {
    listeners: any[];

    constructor() {
        this.listeners = [];
    }

    addListener(listener: (drawEventListenerType) | (updateEventListenerType) |  (victoryEventListenerType) |
        (playEventListenerType)): void  {
      this.listeners.push(listener);
    }

trigger(params ?: number | Data | string) {
    this.listeners.forEach(listener => { listener(params); });
}
}