import { EntriesState } from './';

type entriesActionType =
    | { type: '[entries] - ActionName' }

export const entriesReducer = (state: EntriesState, action: entriesActionType): EntriesState => {
    switch (action.type) {
        case '[entries] - ActionName':
            return {
                ...state,
            }

        default:
            return state;   
    }
}