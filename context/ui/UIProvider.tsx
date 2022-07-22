import { FC, useReducer } from "react";
import { showLogs } from "../../utils";
import { uiReducer, UIContext } from "./";

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    themeMode: string;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
    themeMode: 'darkMode'
}

interface Props {
    children: React.ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const setIsAddingEntry = (isAddingEntry: boolean) => {
        dispatch({ type: 'UI - Set isAddingEntry', payload: isAddingEntry });
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' });
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' });
    }

    const setThemeMode = (theme: string) => {
        showLogs('info', 'Setting theme to', theme);
        dispatch({ type: 'UI - Change Theme', payload: theme });
    }

    return (
        <UIContext.Provider value={{
            ...state,

            // Actions
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,
            startDragging,
            endDragging,

            setThemeMode,
        }}>
            {children}
        </UIContext.Provider>
    )
} 