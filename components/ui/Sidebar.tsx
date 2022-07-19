import { Box, Drawer, List, Typography } from "@mui/material"


export const Sidebar = () => {
    return (
        <Drawer
            anchor="left"
            open={true}
            onClose={() => { console.log('close') }}
        >
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant="h4">Menú</Typography>
            </Box>
            <List>

            </List>
        </Drawer>
    )
}