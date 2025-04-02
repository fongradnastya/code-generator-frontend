import { memo, type FC, useCallback, useState } from 'react';
import { clsx } from 'clsx';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import { setOpen } from 'src/store/drawer/slice';
import { type NavigationProps } from 'src/utils/types/navigationProps';
import { useAppSelector, useAppDispatch } from 'src/store';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { NavigationList } from '../NavigationList';

import styles from './Header.module.css';

/** Drawer width in pixels. */
const DRAWER_WIDTH = 280;

const mainRoutes: NavigationProps[] = [
  { name: 'My Templates', path: '/templates', icon: HomeIcon },
  { name: 'Process Template', path: '/process', icon: SettingsIcon },
  { name: 'Create Template', path: '/create', icon: CreateIcon },
];

const loginRoutes: NavigationProps[] = [
  { name: 'Login', path: '/login', icon: LoginIcon },
  { name: 'Registration', path: '/registration', icon: PersonAddIcon },
];

const HeaderComponent: FC = () => {
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const [currentPage, setCurrentPage] = useState<string>('Anime');
  const dispatch = useAppDispatch();

  const handleDrawerOpen = useCallback(() => {
    dispatch(setOpen(true));
  }, [dispatch]);

  const handleDrawerClose = useCallback(() => {
    dispatch(setOpen(false));
  }, [dispatch]);

  const handleNavigation = useCallback((pageName: string) => {
    setCurrentPage(pageName);
  }, []);

  return (
    <>
      <MuiAppBar
        className={clsx(styles['main__app-bar'], isDrawerOpen && styles['main__app-bar_open'])}
      >
        <Toolbar
          className={styles.main__toolbar}
        >
          <IconButton
            className={styles['main__toolbar-icon']}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            noWrap
          >
            PolyStarter
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        className={styles.main__drawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <div className={styles['main__drawer-header']}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NavigationList
          items={mainRoutes}
          currentPage={currentPage}
          onClick={handleNavigation}
        />
        <Divider />
        <NavigationList
          items={loginRoutes}
          currentPage={currentPage}
          onClick={handleNavigation}
        />
      </Drawer>
    </>
  );
};

/** Header component. */
export const Header = memo(HeaderComponent);
