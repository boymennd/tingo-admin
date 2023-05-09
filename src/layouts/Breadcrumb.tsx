import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStyles } from './styles/makeTheme';
import { useMemo } from 'react';
import path from 'path';

const getBreadcrumbs = (pathname: string) => {
  const getPaths = pathname.replace('/', '').replaceAll('-', ' ').split('/');
  return getPaths;
};
const getLink = (pathname: string, index: number) => {
  const paths = pathname.split('/');
  const remainPaths = paths.slice(1, index + 2);
  const link = remainPaths.reduce((link, path) => link + `/${path}`, '');
  return link;
};

export default function Breadcrumb() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const classes = useStyles();
  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);

  return (
    <div className={classes.breadcrumbs}>
      {breadcrumbs?.map((name, i) => (
        <span
          className={classes.bcItem}
          key={i}
          onClick={() => navigate(getLink(pathname, i))}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
