import React, { FC } from "react"
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material"
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material"

import LanguageSwitch from "components/LanguageSwitch"


const AppBar: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => 
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <LanguageSwitch />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  )
}
export default AppBar
