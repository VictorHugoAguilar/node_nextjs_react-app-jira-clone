import { createContext } from 'react';

interface ContextProps {
    entries: [];
}

export const EntriesContext = createContext({} as ContextProps);