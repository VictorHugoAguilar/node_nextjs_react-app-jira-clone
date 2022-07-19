import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

const MenuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

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
                {
                    MenuItems.map((text, index) => (
                        <ListItem key={index} button>
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))
                }

            </List>
        </Drawer>
    )
}