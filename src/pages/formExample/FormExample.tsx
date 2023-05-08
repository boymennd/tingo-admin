import React, { useEffect, useMemo, useState } from 'react';

//MRT Imports
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

//Material-UI Imports
import {
  Box,
  Button,
  Typography,
  Grid,
  ListItemIcon,
  InputAdornment,
  MenuItem,
  createTheme,
  TextField,
} from '@mui/material';

import { utils, writeFile, read } from 'xlsx';
import moment from 'moment';

//Mock Data
import { data } from '../../fakeData/dataStatistic';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../layouts/styles/makeTheme';
import { PREFIX_LOCALE, TYPE_TRANSACTION } from '../../utils/enum/commonEnum';
import { onChange, onChangeDate, stringNullOrEmpty } from '../../utils/utils';
import i18n from 'i18next';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans';
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle, Send } from '@mui/icons-material';
import FooterTablePagination from '../../components/common/FooterTablePaginnaiton';
import { ThemeProvider, useTheme } from '@emotion/react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddIcon from '@mui/icons-material/Add';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  typeTransaction: string;
  transactionAmount: number;
  transactionDate: string;
  signatureCatchPhrase: string;
  commissionAmount: number;
};

const FormExample = () => {
  const { t } = useTranslation(['formExample']);
  const [currentLocale, setCurrentLocale] = useState(MRT_Localization_EN);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [query, setQuery] = useState<string>('');

  const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#F05822',
          }, //swap in the secondary color as the primary for the table
        },
        components: {
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                boxShadow: 'none',
                width: 16,
                height: 16,
                margin: 2,
              },
              track: {
                borderRadius: 22 / 2,
              },
            },
          },
        },
      }),
    [globalTheme]
  );

  useEffect(() => {
    if (!stringNullOrEmpty(i18n.language)) {
      switch (i18n.language) {
        case PREFIX_LOCALE.EN:
          setCurrentLocale(MRT_Localization_EN);
          break;
        case PREFIX_LOCALE.ZH:
          setCurrentLocale(MRT_Localization_ZH_HANS);
          break;
        default:
          break;
      }
    }
  }, [i18n.language]);

  const [dataTable, setDataTable] = useState<Employee[]>(data);

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'firstName',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: t('name'),
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'email',
        enableClickToCopy: true,
        header: t('email'),
        size: 300,
      },

      {
        accessorKey: 'transactionAmount',
        filterVariant: 'range',
        header: t('transactionAmount'),
        size: 200,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              borderRadius: '0.25rem',
              color: theme.palette.warning.dark,
              maxWidth: '9ch',
              p: '0.25rem',
            })}>
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'commissionAmount',
        filterVariant: 'range',
        header: t('commissionAmount'),
        size: 200,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              borderRadius: '0.25rem',
              color: theme.palette.success.dark,
              maxWidth: '9ch',
              p: '0.25rem',
            })}>
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        accessorFn: (row) => new Date(row.transactionDate),
        id: 'transactionDate',
        header: t('transactionDate'),
        filterFn: 'lessThanOrEqualTo',
        sortingFn: 'datetime',

        size: 300,
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        muiTableHeadCellFilterTextFieldProps: { type: 'date' },
      },

      {
        accessorKey: 'typeTransaction',
        enablePinning: true,
        header: t('typeTransaction'),
        size: 200,
        filterSelectOptions: [
          { text: 'Domestic', value: 'Domestic' },
          { text: 'International', value: 'International' },
        ],
        filterVariant: 'select',
        muiTableHeadCellFilterTextFieldProps: { placeholder: 'Select status' },

        muiTableBodyCellProps: {
          style: {
            right: 130,
            boxShadow: '-4px 0px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        muiTableHeadCellProps: {
          style: {
            right: 130,
            boxShadow: '-4px 0px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    ],
    [i18n.language]
  );

  const handleImportFile = (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = read(bstr, { type: rABS ? 'binary' : 'array' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = utils.sheet_to_json<Employee>(ws, {
          blankrows: false,
          raw: true,
          rawNumbers: true,
        });
        setDataTable(data);

        /* Update state */
      };
      if (rABS) reader.readAsBinaryString(files[0]);
      else reader.readAsArrayBuffer(files[0]);
    }
  };

  return (
    <Grid container rowSpacing={2} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography variant="h5">{t('exampleForm')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ThemeProvider theme={tableTheme}>
          <MaterialReactTable
            localization={currentLocale}
            columns={columns}
            data={dataTable}
            manualPagination
            enableRowActions
            enablePinning
            enableRowSelection
            enableColumnActions={false}
            enableColumnOrdering
            muiTableHeadCellFilterTextFieldProps={{
              placeholder: 'Search',
              variant: 'outlined',
              sx: {
                '& .css-jmhdjf-MuiInputBase-root-MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  height: 35,
                },
                backgroundColor: '#fff',
                borderRadius: '24px',
              },
            }}
            muiTablePaperProps={{
              sx: {
                boxShadow: 'none',
              },
            }}
            muiTableContainerProps={{
              sx: {
                border: '1px solid #E6E6E6',
                borderRadius: '8px',
                '&::-webkit-scrollbar': {
                  height: 10,
                },
                '&::-webkit-scrollbar-track': {
                  boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                  borderRadius: '10px',
                },

                '&::-webkit-scrollbar-thumb': {
                  background: '#AEAEAE',
                  borderRadius: '6px',
                },
              },
            }}
            displayColumnDefOptions={{
              'mrt-row-expand': {
                enablePinning: true,
                muiTableHeadCellProps: {
                  style: {
                    right: 0,
                  },
                },
                muiTableBodyCellProps: {
                  style: { right: 0 },
                },
              },
              'mrt-row-actions': {
                enablePinning: true,
                muiTableHeadCellProps: {
                  style: {
                    right: 60,
                  },
                },
                muiTableBodyCellProps: {
                  style: { right: 60 },
                },
              },
            }}
            initialState={{
              columnPinning: {
                right: ['typeTransaction', 'mrt-row-actions', 'mrt-row-expand'],
              },
            }}
            positionToolbarAlertBanner="bottom"
            renderToolbarInternalActions={({ table }) => {
              const handleDeactivate = () => {
                let dataExport = table
                  .getSelectedRowModel()
                  .flatRows.map((row) => {
                    return {
                      firstName: row.original.lastName,
                      lastName: row.original.lastName,
                      email: row.original.email,
                      transactionAmount: row.original.transactionAmount,
                      commissionAmount: row.original.commissionAmount,
                      typeTransaction: row.original.typeTransaction,
                      transactionDate: row.original.transactionDate,
                    };
                  });
                const ws = utils.json_to_sheet(dataExport);
                const wb = utils.book_new();
                utils.book_append_sheet(wb, ws, 'SheetJS');
                /* generate XLSX file and send to client */
                writeFile(wb, 'Example.xlsx');
              };
              return (
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '0.5rem',
                  }}>
                  <Button
                    sx={{
                      textTransform: 'none',
                      width: 114,
                      height: 40,
                      borderRadius: '24px',
                    }}
                    color="primary"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleDeactivate}
                    variant="outlined">
                    <FileDownloadOutlinedIcon sx={{ mr: 1 }} />
                    {t('exportData')}
                  </Button>
                  <Button
                    sx={{
                      textTransform: 'none',
                      background: 'var(--bg-gradient-color)',
                      borderRadius: '24px',
                      color: 'var(--primary-color)',
                      width: 170,
                      height: 40,
                    }}
                    color="success"
                    variant="contained">
                    <AddIcon />
                    {t('btnAddNewuser')}
                  </Button>
                </div>
              );
            }}
            renderDetailPanel={({ row }) => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <img
                  alt="avatar"
                  height={200}
                  src={''}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">Signature Catch Phrase:</Typography>
                  <Typography variant="h1">
                    &quot;{row.original.email}&quot;
                  </Typography>
                </Box>
              </Box>
            )}
            renderRowActionMenuItems={({ closeMenu }) => [
              <MenuItem
                key={0}
                onClick={() => {
                  // View profile logic...
                  closeMenu();
                }}
                sx={{ m: 0 }}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                View Profile
              </MenuItem>,
              <MenuItem
                key={1}
                onClick={() => {
                  // Send email logic...
                  closeMenu();
                }}
                sx={{ m: 0 }}>
                <ListItemIcon>
                  <Send />
                </ListItemIcon>
                Send Email
              </MenuItem>,
            ]}
            renderTopToolbarCustomActions={({ table }) => {
              return (
                <Box>
                  <TextField
                    id="query"
                    name="query"
                    value={query}
                    onChange={onChange.bind(this, setQuery, query)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <SearchIcon />
                          </ListItemIcon>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 24,
                        width: 325,
                        height: 40,
                      },
                    }}
                    placeholder="Search name, email, phone number"
                  />
                  <MRT_ToggleFiltersButton table={table} />
                  <MRT_ShowHideColumnsButton table={table} />
                </Box>
              );
            }}
            muiTableHeadCellProps={{
              sx: {
                backgroundColor: '#F2F2F2',
                fontSize: 16,
                height: '48px',
                '& .Mui-TableHeadCell-Content-Actions': {
                  opacity: 0,
                },
                '& .Mui-TableHeadCell-Content-Actions:hover': {
                  opacity: 1,
                },
              },
            }}
            renderBottomToolbar={() => (
              <FooterTablePagination
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                total={dataTable.length || 0}
              />
            )}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default FormExample;
