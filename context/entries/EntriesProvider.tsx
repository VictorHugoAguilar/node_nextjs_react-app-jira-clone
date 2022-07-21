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

    const addNewEntry = async (title: string, description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', {
            title,
            description
        });
        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }

    const updateEntry = async ({ _id, title, description, status }: Entry) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                title: title,
                description: description,
                status: status
            });
            dispatch({ type: '[Entry] - Update-Entry', payload: data });

            // TODO: mostrar snackbar com mensagem de sucesso
        } catch (error) {
            console.log({ error });
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Refresh-Entry', payload: data })
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