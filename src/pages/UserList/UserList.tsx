import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PREFIX_LOCALE, USER_STATUS } from '../../utils/enum/commonEnum';
import { convertDate, stringNullOrEmpty } from '../../utils/utils';
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

//common and model import
import BtnBorder from '../../components/common/BtnBorder';
import DatePickerDefault from '../../components/common/DatePicker';
import { useQuery } from '@tanstack/react-query';
import { getUserList } from '../../services/access/UserManagement';
import UserStatus from '../../components/common/UserStatus';
import { StyleTable } from './TableUserStyle';
import { DataDetailbyTitleProps, Employee } from '../../models/UserManagement';

const FormExample = () => {
  const classes = useStyles();
  const { t } = useTranslation(['formExample']);
  const [currentLocale, setCurrentLocale] = useState(MRT_Localization_EN);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here

  const tableTheme = useMemo(
    () => createTheme(StyleTable.themeTable),
    [globalTheme]
  );

  // Check render language when change language

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

  // Set columns table

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'fullName',
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
              // src={row.original.avatar}
              src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/639.jpg"
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <span>{row.original.fullName}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'accountId',
        header: t('accountId'),
        size: 200,
      },

      {
        Cell: ({ cell }) => convertDate(cell.row.original.registrationDate),
        accessorFn: (row) => new Date(row.registrationDate),
        id: 'registrationDate',
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
            key={'registrationDate'}
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
        Cell: ({ cell }) => convertDate(cell.row.original.dob),
        accessorFn: (row) => new Date(row.dob),
        id: 'dob',
        header: t('dateOfBirth'),
        filterFn: 'equals',
        sortingFn: 'datetime',
        size: 150,
        Filter: ({ column }) => (
          <DatePickerDefault
            handleOnChange={(newValue) => {
              column.setFilterValue(newValue);
            }}
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
        Cell: ({ cell }) => convertDate(cell.row.original.approvedDate),
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
        Cell: ({ renderedCellValue }) => (
          <UserStatus status={renderedCellValue} />
        ),
        size: 200,
        filterSelectOptions: [
          { text: 'Account Setup', value: USER_STATUS.ACCOUNT_SETUP },
          { text: 'Incomplete', value: USER_STATUS.INCOMPLETE },
          { text: 'In review', value: USER_STATUS.IN_REVIEW },
          { text: 'Active', value: USER_STATUS.ACTIVE },
          { text: 'Suspended', value: USER_STATUS.SUSPENDED },
          { text: 'Closed', value: USER_STATUS.CLOSED },
          { text: 'Lock Down', value: USER_STATUS.LOCKED },
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

  // Query data user

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      'getUserList',
      page, //refetch when pagination.pageIndex changes
      pageSize, //refetch when pagination.pageSize changes
      query,
    ],
    queryFn: () => {
      return getUserList(query, page, pageSize);
    },
    staleTime: 6 * 1000,
    keepPreviousData: true,
  });

  // Import file

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
        // setDataTable(data);

        /* Update state */
      };
      if (rABS) reader.readAsBinaryString(files[0]);
      else reader.readAsArrayBuffer(files[0]);
    }
  };

  // Export file

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

  const handleAddNewUser = async () => {
    // const rs = await getUserList(query, page, pageSize);
    // console.log({ rs });
  };

  // Render Detail User when click show detail

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
            // src={data.avatar}
            src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/639.jpg"
            loading="lazy"
            style={{ borderRadius: '50%' }}
          />
          <Typography fontSize={'20px'} fontWeight={700}>
            {data.fullName}
          </Typography>
          <UserStatus status={data.status} />{' '}
        </Grid>

        <Grid item xs={3} sx={{ textAlign: 'left', width: 280 }}>
          <DataDetailByTitle title="Account ID" data={data.accountId} />
          <DataDetailByTitle
            title="Approved Date"
            data={convertDate(data.approvedDate) || '___'}
          />
          <DataDetailByTitle
            title="Resident Country"
            data={convertDate(data.residentCountry) || '___'}
          />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'left', width: 280 }}>
          <DataDetailByTitle
            title="Registration Date"
            data={convertDate(data.registrationDate) || '___'}
          />
          <DataDetailByTitle
            title="Date of Birth"
            data={convertDate(data.dob) || '___'}
          />
          <DataDetailByTitle
            title="Phone Number"
            data={data.phoneNumber || '___'}
          />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'left', width: 280 }}>
          <DataDetailByTitle
            title="Late Update"
            data={convertDate(data.lastUpdate) || '___'}
          />
          <DataDetailByTitle title="Gender" data={data.gender || '___'} />
          <DataDetailByTitle title="Email" data={data.email || '___'} />
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
            data={!!data && data.userInfoDtos ? data.userInfoDtos : []}
            manualPagination
            enableRowActions
            enableRowSelection
            enableColumnActions={false}
            enableColumnOrdering
            muiTableHeadCellFilterTextFieldProps={{
              placeholder: 'Search',
              variant: 'outlined',
              sx: {
                ...StyleTable.muiTableHeadCellFilterTextFieldProps,
              },
            }}
            muiTablePaperProps={StyleTable.muiTablePaperProps}
            muiTableContainerProps={StyleTable.muiTableContainerProps}
            muiTopToolbarProps={StyleTable.muiTopToolbarProps}
            muiSelectAllCheckboxProps={{
              sx: {
                border: '2px solid rgba(0, 0, 0, 0.4)',
              },
            }}
            displayColumnDefOptions={StyleTable.displayColumnDefOptions}
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
                    variant="contained"
                    onClick={handleAddNewUser}>
                    <AddIcon sx={{ mb: '1.5px' }} />
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
            muiTableHeadCellProps={StyleTable.muiTableHeadCellProps}
            renderBottomToolbar={() => (
              <FooterTablePagination
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                total={!!data && data.total ? data.total : 0}
              />
            )}
            state={{
              isLoading: isLoading,
              showAlertBanner: isError,
              showProgressBars: isFetching,
            }}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default FormExample;
