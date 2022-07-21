import { useMemo, useState } from 'react';
import { NextPage } from 'next';

import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Layout } from '../../components/layouts';
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: NextPage = () => {

    const [inputTitle, setInputTitle] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputStatus, setInputStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const onTextFieldTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.target.value);
    }

    const onTextFieldDescriptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDescription(event.target.value);
    }

    const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Status changed to: ${event.target.value}`);
        setInputStatus(event.target.value as EntryStatus);
    }

    const isNotValidTitle = useMemo(() => inputTitle.length <= 0 && touched, [inputTitle, touched]);
    const isNotValidDescription = useMemo(() => inputDescription.length <= 0 && touched, [inputDescription, touched]);

    const onSaved = () => {
        // if (inputTitle.length === 0 || inputDescription.length === 0) return;

        // console.log(`Saving new entry: ${inputTitle}`);
        // console.log(`Saving new entry: ${inputDescription}`);

        // // Saved in context
        // addNewEntry(inputTitle, inputDescription);

        // // Reset form
        // setInputTitle('');
        // setInputDescription('');
        // setTouched(false);
        // setIsAddingEntry(false);
    }


    return (
        <Layout title="Entry Page">
            <Grid container justifyContent={'center'} sx={{ marginTop: '1rem' }}     >
                <Grid item xs={12} sm={8} md={6} >
                    <Card>
                        <CardHeader title={`Entrada: ${inputTitle}`} subheader={'creada hace ...'} />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                label='Titulo Nueva entrada'
                                value={inputTitle}
                                onChange={onTextFieldTitleChanged}
                                onBlur={() => { setTouched(true) }}
                                helperText={isNotValidTitle && "Escribe el titulo de la entrada"}
                                error={isNotValidTitle}
                            />

                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Descripcion Nueva entrada'
                                value={inputDescription}
                                onChange={onTextFieldDescriptionChanged}
                                helperText={isNotValidDescription && "Escribe la descripcion de la entrada"}
                                onBlur={() => { setTouched(true) }}
                                error={isNotValidDescription}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={inputStatus}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(status => (
                                            <FormControlLabel
                                                key={status}
                                                value={status}
                                                label={capitalize(status)}
                                                control={<Radio />} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlinedIcon />}
                                    variant="contained"
                                    fullWidth
                                    onClick={onSaved}
                                    disabled={inputTitle.length <= 0 || inputDescription.length <= 0}
                                >Guardar</Button>
                            </CardActions>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    size: 'large',
                    position: "fixed",
                    bottom: 50,
                    right: 50,
                    backgroundColor: 'error.dark',
                }}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </Layout>
    )
}

export default EntryPage;