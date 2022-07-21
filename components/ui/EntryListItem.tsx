import React, { FC, useContext } from 'react'

import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'
import { calculateElapsedTime } from '../../utils'

interface Props {
    entry: Entry
}

export const EntryListItem: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();


    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', entry._id)
        console.log('drag start')
        // cambiar dependiendo si se hace drop and drag
        startDragging();
    }

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('drag end')
        // cambiar dependiendo si se hace drop and drag
        endDragging();
    }

    const onClick = () => {
        console.log('click');
        router.push(`/entries/${entry._id}`);

    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}
        >
            <Typography
                sx={{ fontSize: 14, marginLeft: 1, marginTop: 1 }}
                color="text.secondary"
                gutterBottom
            >
                {entry.title}
            </Typography>

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
                >
                    {
                        `creada hace ${calculateElapsedTime(entry.createdAt)}`
                    }
                </Typography>
            </CardActionArea>
        </Card>
    )
}
