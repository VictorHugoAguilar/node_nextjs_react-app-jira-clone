import { FC, useReducer } from 'react';
import { entriesReducer, EntriesContext } from '.';

export interface EntriesState {
    entries: [];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props {
    children: React.ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    return (
        <EntriesContext.Provider value={{
            entries: []
        }}>
            {children}
        </EntriesContext.Provider>
    )
}