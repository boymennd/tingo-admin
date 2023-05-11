import { makeStyles } from '@mui/styles';

const userHighRiskCountryListStyles = makeStyles({
  HRContent: {
    display: 'flex',
    gap: '24px',
    height: 'calc(100vh - 192px)',
    padding: '24px',
    background: 'rgba(var(--bg-content))',
  },
  CountriesTable: {
    width: '394px',
    borderRadius: '8px',
    border: '1px solid rgba(173, 173, 173, 0.2)',
    background: '#fff',
  },
  TableTitle: {
    textTransform: 'capitalize',
    borderRadius: '8px 8px 0 0',
    fontWeight: 700,
    background: 'rgba(173, 173, 173, 0.4)',
  },
  TableContent: {
    height: '100%',
    maxHeight: 'calc(100vh - 280px)',
    overflowY: 'auto',
    background: '#fff',
    marginRight: '6px',
    paddingRight: '6px',
    borderRadius: '8px',
  },
  TableItem: {
    fontWeight: 500,
    borderBottom: '1px solid rgba(173, 173, 173, 0.2)',
    borderRight: '1px solid rgba(173, 173, 173, 0.2)',
    '&:last-child': {
      borderBottom: 0,
    },
  },
  TNo: {
    width: '60px',
    padding: '8px 16px',
  },
  TName: {
    padding: '8px 16px',
  },
});

export { userHighRiskCountryListStyles };
