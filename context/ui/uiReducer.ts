import { UIState } from "./UIProvider";

type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - Set isAddingEntry', payload: boolean }
    | { type: 'UI - Start Dragging' }
    | { type: 'UI - End Dragging' }
    | { type: 'UI - Change Theme' }


export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true,
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false,
            }
        case 'UI - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload,
            }
        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging: true,
            }
        case 'UI - End Dragging':
            return {
                ...state,
                isDragging: false,
            }
        case 'UI - Change Theme':
            return {
                ...state,
                darkMode: !state.darkMode,
            }
        default:
            return state;
    }
}