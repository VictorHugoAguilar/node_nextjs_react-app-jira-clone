import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];

    // Actions
    addNewEntry: (title: string, description: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);