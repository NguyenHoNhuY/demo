import { Inventory2 } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'inherit', // color ke thua tu tg cha
        textDecoration: 'none',

        '&.active>li': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}));

export function Sidebar() {
    const classes = useStyles();
    const href = useParams();

    const handleNavLinkActiveDefault = () => {
        return href['*'] === '' || href['*'] === 'orders'
            ? `${classes.link} active`
            : `${classes.link}`;
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLink to="orders" className={() => handleNavLinkActiveDefault()}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Orders" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="products" className={classes.link}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Inventory2 />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>
        </Box>
    );
}
