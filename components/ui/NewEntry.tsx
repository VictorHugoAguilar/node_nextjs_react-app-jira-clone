import { Box, Button, TextField } from '@mui/material'
import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutline';

export const NewEntry = () => {
    return (
        <Box sx={{
            marginBottom: 2,
            paddingX: 1
        }}>
            <Button
                startIcon={<AddIcon />}
                fullWidth
                variant='outlined'
            >
                Agregar nueva tarea
            </Button>

            <TextField
                fullWidth
                sx={{
                    marginTop: 2,
                    marginBottom: 1
                }}
                placeholder="Title"
                autoFocus
                multiline
                label='Título Nueva entrada'
                variant="outlined"
                helperText="Escribe el título de la entrada"
            />
            <TextField
                fullWidth
                sx={{
                    marginTop: 2,
                    marginBottom: 1
                }}
                placeholder="Descripción"
                autoFocus
                multiline
                label='Descripció Nueva entrada'
                variant="outlined"
                helperText="Escribe la descripción de la entrada"
            />

            <Box display="flex" justifyContent="space-between" >

                <Button
                    variant='outlined'
                    color='secondary'
                    endIcon={<CloseIcon />}
                > Cancelar</Button>

                <Button
                    variant='outlined'
                    color='secondary'
                    endIcon={<SaveOutlinedIcon />}
                > Añadir</Button>
            </Box>
        </Box>
    )
}
