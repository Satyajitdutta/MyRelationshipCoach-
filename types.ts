import React from 'react';

export enum Rasa {
  Shringar = 'Shringar', // Love
  Hasya = 'Hasya',       // Joy/Humor
  Karuna = 'Karuna',     // Compassion
  Raudra = 'Raudra',     // Anger
  Vira = 'Vira',         // Courage
  Bhayanaka = 'Bhayanaka', // Fear
  Bibhatsa = 'Bibhatsa',  // Disgust
  Adbhuta = 'Adbhuta',   // Wonder
  Shanta = 'Shanta',     // Peace
  None = 'None'          // Initial state
}

export type Sender = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  rasa?: Rasa;
}

export interface RasaDetail {
  name: Rasa;
  description: string;
  color: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}