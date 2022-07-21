import { Entry } from '../../interfaces';
import { EntriesState } from './';

type entriesActionType =
    | { type: '[Entry] - Add-Entry', payload: Entry }
    | { type: '[Entry] - Update-Entry', payload: Entry }
    | { type: '[Entry] - Delete-Entry', payload: Entry }
    | { type: '[Entry] - Refresh-Entry', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: entriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] - Update-Entry':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                        entry.title = action.payload.title;
                    }
                    return entry;
                })
            }
        case '[Entry] - Refresh-Entry':
            return {
                ...state,
                entries: [...action.payload],
            }
        case '[Entry] - Delete-Entry':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload._id)
            }
        default:
            return state;
    }
}