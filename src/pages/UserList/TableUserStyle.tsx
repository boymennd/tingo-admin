export const StyleTable = {
  themeTable: {
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
  },

  muiTableHeadCellFilterTextFieldProps: {
    '& .css-jmhdjf-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '24px',
      height: 35,
    },
    backgroundColor: '#fff',
    borderRadius: '24px',
  },

  muiTablePaperProps: {
    sx: {
      boxShadow: 'none',
    },
  },
  muiTableContainerProps: {
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
  },

  muiTopToolbarProps: {
    sx: {
      position: 'unset',
      '& .Mui-ToolbarDropZone': {
        display: 'none',
      },
      '& .css-sq9qdz': {
        position: 'unset',
      },
    },
  },
  displayColumnDefOptions: {
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
  },
  muiTableHeadCellProps: {
    sx: {
      backgroundColor: 'var(--bg-primary-color)',
      fontSize: 16,
      height: '48px',
      '& .Mui-TableHeadCell-Content-Actions': {
        opacity: 0,
      },
      '& .Mui-TableHeadCell-Content-Actions:hover': {
        opacity: 1,
      },
    },
  },
};
