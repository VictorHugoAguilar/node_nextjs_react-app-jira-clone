import React, { FC } from 'react'

import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material'

import { Entry } from '../../interfaces'


interface Props {
    entry: Entry
}

export const EntryListItem: FC<Props> = ({ entry }) => {
    return (
        <Card sx={{ marginBottom: 1 }}>
            <CardHeader variant='h6' title={entry.title} />
            <CardActionArea>
                <CardContent>
                    <Typography
                        sx={{ whiteSpace: 'pre-line' }}
                    >
                        {entry.description}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActionArea sx={{
                display: 'flex',
                justifyContent: 'end',
                paddingRight: 2
            }}>
                <Typography
                    variant='body2'
                >hace 30min</Typography>
            </CardActionArea>
        </Card>
    )
}
