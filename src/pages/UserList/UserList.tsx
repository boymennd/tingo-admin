import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PREFIX_LOCALE, STATUS } from '../../utils/enum/commonEnum';
import { stringNullOrEmpty } from '../../utils/utils';
import i18n from 'i18next';
import { utils, writeFile, read } from 'xlsx';
import { ThemeProvider, useTheme } from '@emotion/react';
import { useStyles } from '../../layouts/styles/makeTheme';
import AddIcon from '@mui/icons-material/Add';
import InputSuggestion from '../../components/common/InputSuggestion';
import FooterTablePagination from '../../components/common/FooterTablePaginnaiton';
import FileExport from '../../assets/file-export.png';

//MRT Imports
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans';

//Material-UI Imports
import {
  Box,
  Button,
  Typography,
  Grid,
  ListItemIcon,
  MenuItem,
  createTheme,
} from '@mui/material';
import { Lock, Edit, Visibility } from '@mui/icons-material';

//Mock Data
import { data } from '../../fakeData/dataStatistic';
import BtnBorder from '../../components/common/BtnBorder';
import DatePickerDefault from '../../components/common/DatePicker';
import { useQuery } from '@tanstack/react-query';
import { getUserList } from '../../services/access/UserManagement';

export type Employee = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  status: string;
  accountId: string;
  registerDate: string;
  residentCountry: string;
  phoneNumber: string;
  approvedDate?: string;
  avatar: string;
  dateOfBirth: string;
};

type DataDetailbyTitleProps = {
  title: string;
  data: string;
};

type RowStatusValueProps = {
  styleCustom: any;
  statusLabel: string;
};

interface ValuesType {
  query: string;
  dateFrom: any;
  dateTo: any;
  minTransactionAmount: number | null;
  maxTransactionAmount: number | null;
  typeTransaction: string;
}

const FormExample = () => {
  const classes = useStyles();
  const { t } = useTranslation(['formExample']);
  const [values, setValues] = useState<ValuesType>({
    query: '',
    dateFrom: null,
    dateTo: null,
    minTransactionAmount: null,
    maxTransactionAmount: null,
    typeTransaction: 'ALL',
  });
  const [currentLocale, setCurrentLocale] = useState(MRT_Localization_EN);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

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

  const [dataTable, setDataTable] = useState<Employee[]>([]);

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'name',
        header: t('name'),
        flex: 2.5,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
            <img
              alt="avatar"
              height={32}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'accountId',
        header: t('accountId'),
        size: 200,
      },

      {
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        accessorFn: (row) => new Date(row.registerDate),
        id: 'registerDate',
        header: t('registerDate'),
        filterFn: 'equals',
        sortingFn: 'datetime',
        Filter: ({ column }) => (
          <DatePickerDefault
            handleOnChange={(newValue) => {
              column.setFilterValue(newValue);
            }}
            placeholder={'dfasdf'}
            sx={{ minWidth: 150 }}
            value={!!column.getFilterValue() ? column.getFilterValue() : null}
            key={'registerDate'}
          />
        ),
        size: 150,
      },
      {
        accessorKey: 'residentCountry',
        header: t('residentCountry'),
        size: 200,
      },
      {
        accessorKey: 'phoneNumber',
        header: t('phoneNumber'),
        size: 200,
      },

      {
        accessorKey: 'gender',
        header: t('gender'),
        size: 150,
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        accessorFn: (row) => new Date(row.dateOfBirth),
        id: 'dateOfBirth',
        header: t('dateOfBirth'),
        filterFn: 'equals',
        sortingFn: 'datetime',

        size: 150,

        Filter: ({ column }) => (
          <DatePickerDefault
            handleOnChange={(newValue) => {
              column.setFilterValue(newValue);
            }}
            placeholder={'dfasdf'}
            sx={{ minWidth: 150 }}
            value={!!column.getFilterValue() ? column.getFilterValue() : null}
            key={'dateOfBirth'}
          />
        ),
      },
      {
        accessorKey: 'email',
        enableClickToCopy: true,
        header: t('email'),
        size: 300,
      },

      {
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        accessorFn: (row) =>
          row.approvedDate ? new Date(row.approvedDate) : null,
        id: 'approvedDate',
        header: t('approvedDate'),
        filterFn: 'equals',
        sortingFn: 'datetime',
        size: 300,
        Filter: ({ column }) => (
          <DatePickerDefault
            handleOnChange={(newValue) => {
              column.setFilterValue(newValue);
            }}
            sx={{ minWidth: 150 }}
            value={!!column.getFilterValue() ? column.getFilterValue() : null}
            key={'approvedDate'}
          />
        ),
      },

      {
        accessorKey: 'status',
        enablePinning: true,
        header: t('status'),
        Cell: ({ renderedCellValue }) => geRowStatus(renderedCellValue),
        size: 200,
        filterSelectOptions: [
          { text: 'Approved', value: 'approved' },
          { text: 'Unapproved', value: 'unapproved' },
        ],
        filterVariant: 'select',
        muiTableHeadCellFilterTextFieldProps: { placeholder: 'Select status' },

        muiTableBodyCellProps: {
          style: {
            right: 130,
          },
        },
        muiTableHeadCellProps: {
          style: {
            right: 130,
          },
        },
      },
    ],
    [i18n.language]
  );

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      'transactionsHistory',
      page, //refetch when pagination.pageIndex changes
      pageSize, //refetch when pagination.pageSize changes
      query,
    ],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getUserList(query, page + 1, pageSize);
    },
    staleTime: 6 * 1000,
    keepPreviousData: true,
    // queryKey: ['transactionsHistory', page],
    // queryFn: () => {
    //   const controller = new AbortController();
    //   setTimeout(() => {
    //     controller.abort();
    //   }, 5000);
    //   return getTransactionsHistory(page, limit, controller.signal);
    // },
    // keepPreviousData: true,
    // retry: 0,
  });

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

  const handleExportFile = (table: any) => {
    if (!table.getIsSomeRowsSelected()) return;
    let dataExport = table.getSelectedRowModel().flatRows.map((row: any) => {
      return {
        firstName: row.original.firstName,
        lastName: row.original.lastName,
        acountId: row.orginal.acountId,
        email: row.original.email,
      };
    });
    const ws = utils.json_to_sheet(dataExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'SheetJS');
    /* generate XLSX file and send to client */
    writeFile(wb, 'Example.xlsx');
  };

  const geRowStatus = (status: any) => {
    let statusDisplay;

    switch (status) {
      case STATUS.APPROVED:
        statusDisplay = (
          <RowStatusValue
            statusLabel="Approved"
            styleCustom={{
              color: 'var(--status-approve-color)',
              backgroundColor: 'var(--status-approve-bg-color)',
              width: '102px',
            }}
          />
        );
        break;
      case STATUS.UNAPPROVED:
        statusDisplay = (
          <RowStatusValue
            statusLabel="Unapproved"
            styleCustom={{
              color: 'var(--status-reject-color)',
              backgroundColor: 'var(--status-reject-bg-color)',
              width: '120px',
            }}
          />
        );
        break;
    }
    return statusDisplay;
  };

  const RowStatusValue = ({
    statusLabel,
    styleCustom,
  }: RowStatusValueProps) => {
    return (
      <Typography
        className={classes.MLabelStatus}
        sx={styleCustom}
        fontWeight={600}>
        {statusLabel}
      </Typography>
    );
  };

  const DataDetailByTitle = ({ title, data }: DataDetailbyTitleProps) => {
    return (
      <Box mt={2}>
        <Typography component="div" color={'var(--secondary-color)'}>
          {title}
        </Typography>
        <Typography component="div">
          <b>{data}</b>
        </Typography>
      </Box>
    );
  };

  const renderDetailUser = (data: Employee) => {
    return (
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '10px 24px 30px 10px',
          maxWidth: '1300px',
          position: 'sticky',
          left: 0,
        }}>
        <Grid item xs={3} sx={{ textAlign: '-webkit-center', width: 280 }}>
          <img
            alt="avatar"
            height={60}
            src={data.avatar}
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          <Typography
            fontSize={'20px'}
            fontWeight={700}>{`${data.firstName} ${data.lastName}`}</Typography>
          {geRowStatus(data.status)}{' '}
        </Grid>

        <Grid item xs={3} sx={{ textAlign: 'left', width: 280 }}>
          <DataDetailByTitle title="Account ID" data={data.accountId} />
          <DataDetailByTitle
            title="Approved Date"
            data={data.approvedDate || ''}
          />
          <DataDetailByTitle
            title="Resident Country"
            data={data.residentCountry}
          />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'left', width: 280 }}>
          <DataDetailByTitle title="Registration Date" data={data.accountId} />
          <DataDetailByTitle title="Date of Birth" data={data.dateOfBirth} />
          <DataDetailByTitle title="Phone Number" data={data.phoneNumber} />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'left', width: 280 }}>
          <DataDetailByTitle title="Late Update" data={'04/24/2023'} />
          <DataDetailByTitle title="Gender" data={data.gender} />
          <DataDetailByTitle title="Email" data={data.email} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={2.75} p={'8px 24px'}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight={'bold'}>
          {t('titleUserList')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ThemeProvider theme={tableTheme}>
          <MaterialReactTable
            localization={currentLocale}
            columns={columns}
            data={dataTable}
            manualPagination
            enableRowActions
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
                '& .Mui-TableBodyCell-DetailPanel': {
                  padding: 0,
                  background: 'var(--detail-data-bg)',
                },
                '&::-webkit-scrollbar': {
                  height: 10,
                },
                '& .Mui-ToolbarDropZone': {
                  display: 'none',
                },
                '&::-webkit-scrollbar-thumb': {
                  marginTop: 2,
                  background: '#AEAEAE',
                },
                // '&::-webkit-scrollbar-button': {
                //   display: 'none',
                // },
              },
            }}
            muiTopToolbarProps={{
              sx: {
                position: 'unset',
                '& .Mui-ToolbarDropZone': {
                  display: 'none',
                },
                '& .css-sq9qdz': {
                  position: 'unset',
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
              showToolbarDropZone: false,
              columnPinning: {
                right: ['status', 'mrt-row-actions', 'mrt-row-expand'],
              },
            }}
            positionToolbarAlertBanner="bottom"
            renderToolbarInternalActions={({ table }) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '0.5rem',
                  }}>
                  <BtnBorder
                    image={FileExport}
                    text={t('exportData')}
                    callback={() => handleExportFile(table)}
                  />
                  <Button
                    className={classes.MBtnContained}
                    sx={{ textTransform: 'none' }}
                    color="success"
                    variant="contained">
                    <AddIcon />
                    <Typography ml={1} fontWeight={600}>
                      {t('btnAddNewuser')}
                    </Typography>
                  </Button>
                </div>
              );
            }}
            renderDetailPanel={({ row }) => renderDetailUser(row.original)}
            renderRowActionMenuItems={({ closeMenu }) => [
              <MenuItem
                key={0}
                onClick={() => {
                  // Edit Profile logic...
                  closeMenu();
                }}
                sx={{ m: 0 }}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                Edit Profile
              </MenuItem>,
              <MenuItem
                key={1}
                onClick={() => {
                  // View profile logic...
                  closeMenu();
                }}
                sx={{ m: 0 }}>
                <ListItemIcon>
                  <Visibility />
                </ListItemIcon>
                View Profile
              </MenuItem>,
              <MenuItem
                key={2}
                onClick={() => {
                  // Lock Account logic...
                  closeMenu();
                }}
                sx={{ m: 0 }}>
                <ListItemIcon>
                  <Lock />
                </ListItemIcon>
                Lock Account
              </MenuItem>,
            ]}
            renderTopToolbarCustomActions={({ table }) => {
              return (
                <Box display={'flex'} mt={1}>
                  <InputSuggestion
                    localStorageKey="lstHistorySearch"
                    setQuery={setQuery}
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
