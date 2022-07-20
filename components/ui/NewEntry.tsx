import { Box, Button, TextField } from '@mui/material'
import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutline';

export const NewEntry = () => {

    const [isAdding, setIsAdding] = React.useState(false);

    const [inputTitle, setInputTitle] = React.useState('');
    const [inputDescription, setInputDescription] = React.useState('');
    const [touched, setTouched] = React.useState(false);

    const onTextFieldTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.target.value);
    }

    const onTextFieldDescriptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDescription(event.target.value);
    }

    const onSaved = () => {
        if (inputTitle.length === 0 || inputDescription.length === 0) return;

        console.log(`Saving new entry: ${inputTitle}`);
        console.log(`Saving new entry: ${inputDescription}`);
    }

    return (
        <Box sx={{
            marginBottom: 2,
            paddingX: 1
        }}>
            {isAdding ? (
                <>
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
                        helperText={inputTitle.length <= 0 && touched && "Escribe el título de la entrada"}
                        error={inputTitle.length <= 0 && touched}
                        value={inputTitle}
                        onChange={onTextFieldTitleChanged}
                        onBlur={() => { setTouched(true) }}
                    />
                    <TextField
                        fullWidth
                        sx={{
                            marginTop: 2,
                            marginBottom: 1
                        }}
                        placeholder="Descripción"
                        multiline
                        label='Descripció Nueva entrada'
                        variant="outlined"
                        helperText={inputDescription.length <= 0 && touched && "Escribe la descripción de la entrada"}
                        value={inputDescription}
                        onChange={onTextFieldDescriptionChanged}
                        onBlur={() => { setTouched(true) }}
                        error={inputDescription.length == 0 && touched}
                    />

                    <Box display="flex" justifyContent="space-between" >

                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={<CloseIcon />}
                            onClick={() => { setIsAdding(false) }}
                        > Cancelar</Button>

                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={<SaveOutlinedIcon />}
                            onClick={onSaved}
                        > Añadir</Button>
                    </Box>
                </>
            ) : (
                <>
                    < Button
                        startIcon={<AddIcon />}
                        fullWidth
                        variant='outlined'
                        onClick={() => { setIsAdding(true) }}
                    >
                        Agregar nueva tarea
                    </Button>
                </>
            )
            }
        </Box >
    )
}
