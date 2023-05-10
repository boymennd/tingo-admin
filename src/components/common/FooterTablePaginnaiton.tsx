import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';
import { borderRadius } from '@mui/system';
import { Fragment, useEffect, useMemo, useState } from 'react';

interface Props {
  pageSize: number;
  setPageSize: (el: number) => void;
  total: number;
  page: number;
  setPage: (el: number) => void;
}

const styleArrowButton = {
  color: 'black',
  minWidth: 32,
  width: 32,
  height: 32,
  padding: '4px',
  margin: '0 5px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: 24,
};

const pages = [5, 10, 25, 50];

const filterPages = (visiblePages: any, totalPages: number) => {
  return visiblePages.filter((page: number) => page <= totalPages);
};

const getVisiblePages = (page: number, total: number) => {
  if (total < 7) {
    return filterPages([1, 2, 3, 4, 5, 6], total);
  } else {
    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total];
    } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    } else {
      return [1, 2, 3, 4, 5, total];
    }
  }
};

const FooterTablePagination = ({
  pageSize,
  setPageSize,
  page,
  setPage,
  total,
}: Props) => {
  const activePage = page + 1;
  const numbersOfPage = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const [visiblePages, setVisiblePages] = useState<any[]>(
    getVisiblePages(0, numbersOfPage)
  );

  useEffect(() => {
    setVisiblePages(getVisiblePages(0, numbersOfPage));
  }, [total, pageSize]);
  const handleChangepageSize = (e: any) => {
    setPageSize(e.target.value);
  };

  const changePage = (pageActive: number) => {
    if (pageActive === page + 1) {
      return;
    }
    const visiblePages = getVisiblePages(pageActive, numbersOfPage);
    setVisiblePages(filterPages(visiblePages, numbersOfPage));

    setPage(pageActive - 1);
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      mt={2}
      mr={3}
      fontWeight={'bold'}>
      <Button
        sx={styleArrowButton}
        disabled={activePage === 1}
        onClick={changePage.bind(null, 1)}>
        <KeyboardDoubleArrowLeftIcon />
      </Button>
      <Button
        sx={styleArrowButton}
        disabled={activePage === 1}
        onClick={changePage.bind(null, activePage - 1)}>
        <KeyboardArrowLeftIcon />
      </Button>
      <div className="Table__visiblePagesWrapper">
        {visiblePages.map((visiblePage, index, array) => {
          return (
            <Fragment key={index}>
              {array[index - 1] + 2 < visiblePage && ' ... '}
              <Button
                key={visiblePage}
                sx={{
                  ...styleArrowButton,
                  background:
                    activePage === visiblePage
                      ? 'var(--bg-gradient-color)'
                      : 'tranparent',
                }}
                onClick={changePage.bind(null, visiblePage)}>
                {visiblePage}
              </Button>
            </Fragment>
          );
        })}
      </div>
      <Button
        sx={styleArrowButton}
        disabled={activePage === numbersOfPage}
        onClick={changePage.bind(null, activePage + 1)}>
        <KeyboardArrowRightIcon />
      </Button>
      <Button
        sx={styleArrowButton}
        disabled={activePage === numbersOfPage}
        onClick={changePage.bind(null, numbersOfPage)}>
        <KeyboardDoubleArrowRightIcon />
      </Button>
      <FormControl>
        <Select
          sx={{ width: 108, height: 32, borderRadius: 24 }}
          value={pageSize}
          renderValue={(value: number) => `${value}/page`}
          onChange={handleChangepageSize}
          inputProps={{ 'aria-label': 'Without label' }}>
          {pages.map((item: number) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FooterTablePagination;
