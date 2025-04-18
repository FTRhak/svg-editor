import { ProjectEventName } from './project-event.type';

export class EventManager {
  private events: Map<ProjectEventName, Function[]> = new Map();
  constructor() {}

  on(event: ProjectEventName, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    if (this.events.get(event)?.indexOf(callback) === -1) {
      this.events.get(event)?.push(callback);
    } else {
      console.warn('Have already this event');
    }
  }
  off(event: ProjectEventName, callback: Function) {
    if (this.events.has(event)) {
      const index = this.events.get(event)?.indexOf(callback);
      if (index && index !== -1) {
        this.events.get(event)?.splice(index, 1);
      }
    }
  }

  offAll(event: ProjectEventName | null = null) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  trigger(event: ProjectEventName, ...args: any[]) {
    if (this.events.has(event)) {
      this.events.get(event)?.forEach((callback) => {
        callback(...args);
      });
    }
  }
}
