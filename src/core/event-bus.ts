type EventCallback<T = any> = (payload: T) => void;

class EventBus {
  private listeners: Map<string, Set<EventCallback>> = new Map();

  on<T>(event: string, callback: EventCallback<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => this.off(event, callback);
  }

  off<T>(event: string, callback: EventCallback<T>) {
    this.listeners.get(event)?.delete(callback);
  }

  emit<T>(event: string, payload?: T) {
    this.listeners.get(event)?.forEach((callback) => {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }
}

export const eventBus = new EventBus();

// Global Event Names Constants
export const EVENTS = {
  QUIZ_COMPLETED: 'QUIZ_COMPLETED',
  LEVEL_UP: 'LEVEL_UP',
  TTS_START: 'TTS_START',
  TTS_END: 'TTS_END',
} as const;
