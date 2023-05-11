import React from 'react';
import { userHighRiskCountryListStyles } from './highRiskCountryListStyles';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Countries {
  no: number;
  name: string;
}

const convertNoFormat = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
};

const CountriesTable = ({
  tableName,
  data,
}: {
  tableName: string;
  data: Countries[];
}) => {
  const classes = userHighRiskCountryListStyles();
  const { t } = useTranslation(['highRiskCountryList']);
  return (
    <div className={classes.CountriesTable}>
      <Grid container className={classes.TableTitle}>
        <Grid item className={classes.TNo}>
          {t('no')}
        </Grid>
        <Grid item className={classes.TName}>
          {tableName}
        </Grid>
      </Grid>
      <div className={classes.TableContent}>
        {data?.map((country) => (
          <Grid container className={classes.TableItem} key={country.no}>
            <Grid item className={classes.TNo}>
              {convertNoFormat(country.no)}
            </Grid>
            <Grid item className={classes.TName}>
              {country.name}
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default CountriesTable;
