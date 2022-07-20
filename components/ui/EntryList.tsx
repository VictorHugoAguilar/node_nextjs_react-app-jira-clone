import { List, Paper } from '@mui/material'
import React from 'react'
import { EntryListItem } from './EntryListItem'

export const EntryList = () => {
    return (
        <div>
            <Paper sx={{
                height: 'calc(100vh - 200px',
                overflow: 'scroll',
                backgroundColor: 'transparent',
                padding: '3px 5px'
            }}>

                {/* TODO: cambiara dependiendo si se hace drop and drag */}

                <List sx={{ opacity: 1 }}>
                    <EntryListItem />
                    <EntryListItem />
                    <EntryListItem />
                </List>

            </Paper>
        </div>
    )
}
