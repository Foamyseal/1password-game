import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Typography from '@mui/material/Typography';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Image from "material-ui-image";

function Header() {
    return (
        <AppBar position="static" style={{ background: '#FFF4DE' }}>
            <Toolbar variant="dense">
                <IconButton edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Image src="../Images/1Grow Logo.svg" />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
                <IconButton size="large">
                    <StorefrontOutlinedIcon color="primary" />
                </IconButton>
                <IconButton size="large">
                    <InfoOutlinedIcon color="primary" />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}

export { Header };