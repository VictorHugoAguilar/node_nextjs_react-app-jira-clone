import { FC, useReducer } from 'react';
import { entriesReducer, EntriesContext } from '.';
import { Entry } from '../../interfaces';

import { v4 as uuid } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuid(),
            title: 'React',
            description: 'A JavaScript library for building user interfaces.',
            status: 'pending',
            createAt: Date.now(),
        },
        {
            _id: uuid(),
            title: 'React',
            description: 'A JavaScript library for building user interfaces.',
            status: 'in-progress',
            createAt: Date.now() - 100000,
        },
        {
            _id: uuid(),
            title: 'React',
            description: 'A JavaScript library for building user interfaces.',
            status: 'finished',
            createAt: Date.now() - 1000000,
        },
    ]
}

interface Props {
    children: React.ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    return (
        <EntriesContext.Provider value={{
            ...state,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}