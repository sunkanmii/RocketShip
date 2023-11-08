import { useState } from 'react';
import { createContainer } from 'react-tracked';

const initialGlobalState = {
    rocketSkin: 'ship004.png',
    rocketSelectionIsActive: false,
}

const useValue = () => useState(initialGlobalState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } = createContainer(useValue);