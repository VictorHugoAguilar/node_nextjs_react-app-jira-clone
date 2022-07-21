import { FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntry } from '../../database';
import { calculateElapsedTime } from '../../utils';
import { EntriesContext } from '../../context/entries';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
    console.log('entry page', { entry });

    const [inputTitle, setInputTitle] = useState(entry.title);
    const [inputDescription, setInputDescription] = useState(entry.description);
    const [inputStatus, setInputStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const { updateEntry } = useContext(EntriesContext);

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
        if (inputTitle.length === 0 || inputDescription.length === 0) return;

        console.log(`updateEntry entry: ${inputTitle}`);
        console.log(`updateEntry entry: ${inputDescription}`);

        const updatedEntry: Entry = {
            ...entry,
            status: inputStatus,
            title: inputTitle,
            description: inputDescription,
        }

        updateEntry(updatedEntry, true);
    }


    return (
        <Layout title={`${inputTitle.substring(0, 20)} ...`}>
            <Grid container justifyContent={'center'} sx={{ marginTop: '1rem' }}     >
                <Grid item xs={12} sm={8} md={6} >
                    <Card>
                        <CardHeader
                            title={`Entrada: ${inputTitle}`}
                            subheader={`Tarea creada hace ${calculateElapsedTime(entry.createdAt)}`}
                        />

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const entry = await dbEntry.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;