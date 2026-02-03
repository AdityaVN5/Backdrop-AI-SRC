export enum BackgroundMode {
  ORIGINAL = 'ORIGINAL',
  TRANSPARENT = 'TRANSPARENT',
  GREEN_SCREEN = 'GREEN_SCREEN',
  BLUR = 'BLUR',
  IMAGE = 'IMAGE',
  COLOR = 'COLOR'
}

export interface ProcessingState {
  isUploading: boolean;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  isComplete: boolean;
}

export interface VideoMetadata {
  name: string;
  size: number;
  duration?: number;
  url: string;
}