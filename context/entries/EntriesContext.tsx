import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];
}

export const EntriesContext = createContext({} as ContextProps);