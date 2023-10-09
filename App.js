import React from 'react';
import { SharedStateProvider } from './store';
import GameScreen from './components/GameScreen';

export default function App() {
  return (
    <SharedStateProvider>
      <GameScreen/>
    </SharedStateProvider>
  );
}