import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;

    // Actions
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);