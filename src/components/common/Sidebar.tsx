import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React, { CSSProperties } from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';

// 親のAppLayoutからもってくるプロップスの型
interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd:  () => void;
}

// サイドバーに関するプロップスの型
interface menuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

// ここからコンポーネント
const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd }: SidebarProps) => {

  // サイドバーメニューを配列で定義
  const MenuItems: menuItem[] = [
    {text: "Home", path: "/", icon: HomeIcon}
  ]

  // メニュー全体に適用したいスタイル
  const baseLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block",

  }

  // 選択されたサイドバーの色を帰る(CSSProperties: Cssの型を定義するreactの型)
  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  }

  // サイドバーのドロワー
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/* サイドバーの内容 */}
        {MenuItems.map((menu) => (
          <NavLink key={menu.text} to={menu.path} style={({isActive}) => {
            return {
              // 基本はベースカラー以下は、textDecoration: "none",color: "inherit",display: "block",と同じ意味
              ...baseLinkStyle,
              // isActiveのとき。以下は、backgroundColor: "rgba(0, 0, 0, 0.08)",と同じ意味
              ...(isActive ? activeLinkStyle : {}),
            }
          }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
          <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
  
          {/* モバイル用 */}
          <Drawer
            variant="temporary" //表示、非表示を切り替えるドロワー
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' }, // 0px以上で表示、600px以上で非表示
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
  
          {/* PC用 */}
          <Drawer
            variant="permanent" //常に固定されるドロワー
            sx={{
              display: { xs: 'none', md: 'block' }, // 0px以上で非表示、600px以上で表示
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
  
  )
}

export default Sidebar