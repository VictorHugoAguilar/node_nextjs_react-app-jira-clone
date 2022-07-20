import React, { FC, useContext, useMemo, DragEvent } from 'react'

import { List, Paper } from '@mui/material'

import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../interfaces'
import { EntryListItem } from './EntryListItem'
import { UIContext } from '../../context/ui'

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entiesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log(e.dataTransfer.getData('text'))
    }

    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text')

        const entry = entries.find(entry => entry._id === id)!;
        entry.status = status;

        updateEntry(entry);
        endDragging();
    }

    return (
        <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}  >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entiesByStatus.map(entry => (
                            <EntryListItem key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
