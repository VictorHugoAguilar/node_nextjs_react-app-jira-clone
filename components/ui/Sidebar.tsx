import { useContext } from "react";

import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxOutlined from "@mui/icons-material/InboxOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import { UIContext } from "../../context/ui";

const MenuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {

    const { sideMenuOpen, openSideMenu, closeSideMenu } = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={sideMenuOpen}
            onClose={() => { closeSideMenu() }}
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menú</Typography>
                </Box>
                <List>
                    {
                        MenuItems.map((text, index) => (
                            <ListItem key={index} button>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlined /> : <MailOutlineOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}