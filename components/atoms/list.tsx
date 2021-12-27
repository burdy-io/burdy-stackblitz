import React, { FC, useState } from 'react';
import {
  Avatar,
  Collapse,
  IconButton,
  List as MuiList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import ExpandMoreIcon from '@mui/icons-material/ExpandLess';
import { Link, LinkProps } from './';

export type ListItemProps = {
  title?: string;
  description?: string;
  icon?: JSX.Element;
  subLinks?: ListItemProps[];
} & LinkProps;

export type ListProps = {
  debt?: number;
  showLastDivider?: boolean;
  items?: ListItemProps[];
  onClick?: (item: ListItemProps) => void;
  defaultOpened?: {
    [index: string]: any;
  };
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

const List: FC<ListProps> = (props) => {
  const { items, showLastDivider, onClick, debt = 0, defaultOpened = {}, ...rest } = props;

  const [opened, setOpened] = useState(defaultOpened);
  const theme = useTheme();

  return (
    <div {...rest}>
      <MuiList
        component="div"
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          paddingTop: 0,
          paddingBottom: 0,
          position: 'relative',
          '& .active': {
            backgroundColor: theme.palette.primary['50'],
            color: theme.palette.primary.main,
            borderLeft: `4px solid ${theme.palette.primary.main}`
          },
        }}
      >
        {(items || []).map(({ title, description, icon, subLinks, href, ...rest }, index) => (
          <React.Fragment key={index}>
            <Link
              sx={{
                color: 'inherit',
                display: 'block',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              key={index}
              href={href}
              {...rest}
              underline="none"
              onClick={(e) => {
                if (!href) {
                  setOpened({
                    ...opened,
                    [index]: !opened?.[index],
                  });
                  e.stopPropagation();
                  e.preventDefault();
                } else {
                  onClick?.(items?.[index] as ListItemProps);
                }
              }}
            >
              <ListItem
                component={'div'}
                sx={{
                  fontWeight: 500,
                  color: 'inherit',
                  fontSize: theme.typography.body1.fontSize,
                  textTransform: debt === 0 ? 'uppercase' : 'none',
                  paddingLeft: theme.spacing(2 + 2 * debt),
                  borderBottom: 'none',
                  display: 'block',
                  '&:hover': {
                    background: theme.palette.action.hover,
                  },
                }}
                secondaryAction={
                  <IconButton
                    onClick={(e) => {
                      setOpened({
                        ...opened,
                        [index]: !opened?.[index],
                      });
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    {(subLinks || [])?.length > 0 && (
                      <ExpandMoreIcon
                        color="inherit"
                        fontSize="small"
                        sx={{
                          transition: theme.transitions.create(['transform'], { duration: 250 }),
                          transform: `rotate(${Boolean(opened?.[index]) ? 180 : 90}deg)`,
                        }}
                      />
                    )}
                  </IconButton>
                }
                divider={showLastDivider || index !== (items || [])?.length - 1}
              >
                {icon && (
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                )}
                {(title || description) && (
                  <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: theme.typography.body2.fontSize,
                        fontWeight: debt > 0 ? 400 : 600,
                      },
                    }}
                    secondary={description}
                  />
                )}
              </ListItem>
            </Link>
            {(subLinks || [])?.length > 0 && (
              <Collapse in={!!opened?.[index]} timeout="auto" unmountOnExit>
                <List debt={debt + 1} items={subLinks} onClick={onClick} showLastDivider />
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </MuiList>
    </div>
  );
};

export default List;
