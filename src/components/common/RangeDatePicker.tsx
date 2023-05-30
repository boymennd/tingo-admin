import { getDate } from 'date-fns';
import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface IRanger {
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
}

export default function RangeDatePicker(props: IRanger) {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const Input = ({ onChange, placeholder, value, id, onClick }: any) => (
    <input
      style={styles.inputStyle}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      id={id}
      onClick={onClick}
    />
  );

  const renderDayContents = (day: any, date: any) => {
    return <span style={styles.dateStyle}>{getDate(date)}</span>;
  };
  return (
    <div style={styles.wrap}>
      <DatePicker
        customInput={<Input />}
        renderDayContents={renderDayContents}
        selectsRange={true}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        placeholderText={'Chose date'}
      />
      {startDate && endDate && (
        <HighlightOffIcon
          style={{ color: 'red' }}
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        />
      )}
    </div>
  );
}

const styles = {
  dateStyle: {
    fontSize: '15px',
  },
  inputStyle: {
    border: 'none',
    width: '100%',
    outline: 'none',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '10px',
    width: '270px',
  },
};
