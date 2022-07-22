import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    themeMode: string;

    // Actions
    openSideMenu: () => void;
    closeSideMenu: () => void;

    setIsAddingEntry: (isAddingEntry: boolean) => void;

    startDragging: () => void;
    endDragging: () => void;

    setThemeMode: (theme: string) => void;
}

export const UIContext = createContext({} as ContextProps);