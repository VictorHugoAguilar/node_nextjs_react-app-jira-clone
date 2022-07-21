import { FC, useEffect, useReducer } from 'react';
import { entriesReducer, EntriesContext } from '.';
import { Entry } from '../../interfaces';

import { v4 as uuid } from 'uuid';
import { entriesApi } from '../../api';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface Props {
    children: React.ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (title: string, description: string) => {
        const newEntry: Entry = {
            _id: uuid(),
            title,
            description,
            status: 'pending',
            createdAt: Date.now(),
        }

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })

    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Update-Entry', payload: entry })
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry>('/entries');

    }

    useEffect(() => {
        refreshEntries();
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Actions
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}