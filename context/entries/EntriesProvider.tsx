import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack'
import { entriesReducer, EntriesContext } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../api';
import { showLogs } from '../../utils';

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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const addNewEntry = async (title: string, description: string, showSnackbar = false) => {
        showLogs('info', '[Entry Providers] in addNewEntry with data:', { title, description });

        try {
            const { data } = await entriesApi.post<Entry>('/entries', {
                title,
                description
            });
            dispatch({ type: '[Entry] - Add-Entry', payload: data });

            // mostrar snackbar com mensagem de sucesso
            enqueueSnackbar('Entry added successfully', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        } catch (error) {
            showLogs('error', 'error adding entry', error);
        }
    }

    const updateEntry = async ({ _id, title, description, status }: Entry, showSnackbar = false) => {
        showLogs('info', '[Entry Providers] in updateEntry with entry:', { _id, title, description, status });

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                title: title,
                description: description,
                status: status
            });
            dispatch({ type: '[Entry] - Update-Entry', payload: data });

            // mostrar snackbar com mensagem de sucesso
            enqueueSnackbar('Entry updated successfully', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        } catch (error) {
            showLogs('error', 'error updating entry', error);
        }
    }

    const deleteEntry = async ({ _id }: Entry, showSnackbar = false) => {
        showLogs('info', '[Entry Providers] in deleteEntry with id:', _id);

        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
            dispatch({ type: '[Entry] - Delete-Entry', payload: data });

            // mostrar snackbar com mensagem de sucesso
            enqueueSnackbar('Entry deleted successfully', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        } catch (error) {
            showLogs('error', 'error deleting entry', error);
        }
    }

    const refreshEntries = async () => {
        showLogs('info', '[Entry Providers] in refreshEntries');

        try {
            const { data } = await entriesApi.get<Entry[]>('/entries');
            dispatch({ type: '[Entry] - Refresh-Entry', payload: data })
        } catch (error) {
            showLogs('error', 'error refreshEntries entry', error);
        }
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
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}