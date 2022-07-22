import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    darkMode: boolean;

    // Actions
    openSideMenu: () => void;
    closeSideMenu: () => void;

    setIsAddingEntry: (isAddingEntry: boolean) => void;
    
    startDragging: () => void;
    endDragging: () => void;

    changeDarkMode: () => void;
}

export const UIContext = createContext({} as ContextProps);