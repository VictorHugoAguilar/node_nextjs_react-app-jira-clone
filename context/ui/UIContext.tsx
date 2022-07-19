import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
}

export const UIContext = createContext({} as ContextProps);