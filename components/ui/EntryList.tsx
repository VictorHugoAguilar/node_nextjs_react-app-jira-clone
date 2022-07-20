import React, { FC, useContext, useMemo } from 'react'

import { List, Paper } from '@mui/material'

import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../interfaces'
import { EntryListItem } from './EntryListItem'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);

    const entiesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text')
        console.log(id)
    }

    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
        >
            <Paper sx={{
                height: 'calc(100vh - 180px',
                overflow: 'scroll',
                backgroundColor: 'transparent',
                padding: '3px 5px'
            }}>
                {/* TODO: cambiara dependiendo si se hace drop and drag */}
                <List sx={{ opacity: 1 }}>
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
