import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


export const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge='start'
                >
                    <MenuOutlinedIcon />
                </IconButton>
                <Typography variant="h6" >OpenJira</Typography>
            </Toolbar>
        </AppBar>
    )
}