import { eventBus, EVENTS } from './event-bus';

export class AudioAdapter {
  private synth: SpeechSynthesis;
  private isPlaying: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private static instance: AudioAdapter;

  private constructor() {
    this.synth = window.speechSynthesis;
  }

  public static getInstance(): AudioAdapter {
    if (!AudioAdapter.instance) {
      AudioAdapter.instance = new AudioAdapter();
    }
    return AudioAdapter.instance;
  }

  public play(text: string, mode: 'syllable_slow' | 'word_normal' | 'sentence' = 'word_normal') {
    this.stopAll();

    let processedText = text;
    let rate = 0.9;
    let pitch = 1.2;

    switch (mode) {
      case 'syllable_slow':
        processedText = text.toLowerCase().split('').join(', '); // or customized for ba, bi, bu
        rate = 0.6;
        break;
      case 'word_normal':
        processedText = text.toLowerCase();
        rate = 0.8;
        break;
      case 'sentence':
        processedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() + '.';
        rate = 0.9;
        break;
    }

    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.lang = 'id-ID';
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      this.isPlaying = true;
      eventBus.emit(EVENTS.TTS_START);
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      eventBus.emit(EVENTS.TTS_END);
    };

    utterance.onerror = (e) => {
      console.error('TTS Error:', e);
      this.isPlaying = false;
      this.currentUtterance = null;
      eventBus.emit(EVENTS.TTS_END);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stopAll() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.currentUtterance = null;
    eventBus.emit(EVENTS.TTS_END);
  }
}

export const audioAdapter = AudioAdapter.getInstance();
