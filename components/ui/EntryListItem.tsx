import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'

export const EntryListItem = () => {
    return (
        <Card sx={{ marginBottom: 1 }}>
            <CardActionArea>
                <CardContent>
                    <Typography
                        sx={{ whiteSpace: 'pre-line' }}
                    >Esto es una descr</Typography>
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
