
export interface Entry {
    _id: string;
    title: string;
    description: string;
    createAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';