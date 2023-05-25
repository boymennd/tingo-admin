import { IconButton, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useStyles } from '../../layouts/styles/makeTheme';
import { Close } from '@mui/icons-material';

interface DatePickerProps {
  handleOnChange: (value: any) => void;
  value: any;
  sx?: object;
  [otherProps: string]: any;
  helperText?: string;
}

export default function DatePickerDefault(props: DatePickerProps) {
  const classes = useStyles();
  const { handleOnChange, value, sx, helperText, ...otherProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(newValue: any) => handleOnChange(newValue)}
        renderInput={(params: any) => (
          <TextField
            {...params}
            sx={{ ...sx, minWidth: 150 }}
            className={classes.MTextFieldDatePicker}
            size={'small'}
            helperText={helperText ? helperText : ''}
            inputProps={{
              ...params.inputProps,
              placeholder: 'Pick Date',
              startAdornment: (
                <IconButton
                  size="small"
                  disabled={props.disabled}
                  onClick={() => handleOnChange(null)}>
                  <Close fontSize="small" />
                </IconButton>
              ),
            }}
          />
        )}
        value={value}
        {...otherProps}
      />
    </LocalizationProvider>
  );
}
