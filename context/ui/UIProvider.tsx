import { FC, useReducer } from "react";
import { uiReducer, UIContext } from "./";

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
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

    return (
        <UIContext.Provider value={{
            ...state,

            // Actions
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,
        }}>
            {children}
        </UIContext.Provider>
    )
} 