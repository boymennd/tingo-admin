import {
  Box,
  InputAdornment,
  ListItemIcon,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { onChange } from '../../utils/utils';

interface Props {
  localStorageKey: string;
  setQuery: (el: string) => void;
}

const InputSuggestion = ({ localStorageKey, setQuery }: Props) => {
  const [showHistorySearch, setShowHistorySearch] = useState<boolean>(false);
  const [listHistorySearch, setListHistorySearch] = useState<any>(
    localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey) || '')
      : []
  );
  const handleShowHistorySearch = () => {
    if (listHistorySearch.length) {
      setShowHistorySearch(true);
    }
  };

  const handleHideHistorySearch = () => {
    setShowHistorySearch(false);
  };

  const handleChangeSearch = (e: any) => {
    if (
      e.key === 'Enter' &&
      e.target.value &&
      !listHistorySearch.includes(e.target.value)
    ) {
      let newList = [...listHistorySearch, e.target.value];
      setListHistorySearch(newList);
      localStorage.setItem(localStorageKey, JSON.stringify(newList));
      setQuery(e.target.value);
      setShowHistorySearch(false);
    }
  };

  const handleRemoveSearchHistory = (item: string) => {
    if (!!item) {
      let newList = listHistorySearch.filter((el: string) => el != item);
      setListHistorySearch(newList);
      localStorage.setItem(localStorageKey, JSON.stringify(newList));
    } else {
      setListHistorySearch([]);
      localStorage.setItem(localStorageKey, JSON.stringify([]));
    }
  };

  return (
    <Box>
      <TextField
        id="query"
        name="query"
        type="search"
        onKeyDown={handleChangeSearch}
        onFocus={handleShowHistorySearch}
        onBlur={handleHideHistorySearch}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': showHistorySearch
              ? {
                  borderColor: 'var(--boder-input-color)',
                  borderBottomColor: 'transparent',
                  borderRadius: '24px 24px 0 0',
                }
              : { borderColor: 'var(--boder-input-color)' },
          },
        }}
        InputProps={{
          autoComplete: 'off',
          startAdornment: (
            <InputAdornment position="start">
              <ListItemIcon sx={{ minWidth: 24 }}>
                <SearchIcon />
              </ListItemIcon>
            </InputAdornment>
          ),
          sx: {
            borderRadius: 24,
            width: showHistorySearch ? 384 : 335,
            height: 40,
          },
        }}
        placeholder="Search name, email, phone number"
      />
      <Box
        sx={{
          display: showHistorySearch ? '' : 'none',
          borderRadius: showHistorySearch ? '0 0 24px 24px' : '24px',
          width: showHistorySearch ? 384 : 335,
          padding: '16px',
          position: 'absolute',
          zIndex: '100',
          backgroundColor: '#fff',
          border: '1px solid  var(--boder-input-color)',
          borderTopColor: showHistorySearch
            ? 'transparent'
            : 'var(--boder-input-color)',
        }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography fontWeight={'bold'}>Recently</Typography>
          <Typography
            onMouseDown={() => handleRemoveSearchHistory('')}
            sx={{ cursor: 'pointer', fontSize: '12px' }}>
            Remove History
          </Typography>
        </Box>
        {listHistorySearch.map((item: string, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              padding: '4px 0px 0px',
            }}
            display={'flex'}
            justifyContent={'space-between'}>
            <Typography>{item}</Typography>
            <Typography
              onMouseDown={() => handleRemoveSearchHistory(item)}
              sx={{ cursor: 'pointer' }}>
              <ClearIcon fontSize="small" />
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InputSuggestion;
