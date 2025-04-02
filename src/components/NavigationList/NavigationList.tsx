import { type FC, memo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { type NavigationProps } from 'src/utils/types/navigationProps';

type Props = {

  /** An array of navigation objects. */
  readonly items: readonly NavigationProps[];

  /** Page that user is currently seeing. */
  readonly currentPage: string;

  /** Handles pages navigation. */
  readonly onClick: (name: string) => void;
};

const NavigationListComponent: FC<Props> = ({ items, currentPage, onClick }: Props) => (
  <List>
    {items.map(item => (
      <ListItem key={item.name} disablePadding>
        <ListItemButton
          component={NavLink}
          to={item.path}
          onClick={() => onClick(item.name)}
          selected={item.name === currentPage}
        >
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

/** Navigation list component. */
export const NavigationList = memo(NavigationListComponent);
