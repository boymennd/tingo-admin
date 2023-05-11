import { useTranslation } from 'react-i18next';
import CountriesTable from './CountriesTable';
import { userHighRiskCountryListStyles } from './highRiskCountryListStyles';

const mockData = [
  { no: 1, name: 'United Kingdom' },
  { no: 2, name: 'Albania' },
  { no: 3, name: 'Antigua and Barbuda' },
  { no: 1, name: 'United Kingdom' },
  { no: 2, name: 'Albania' },
  { no: 3, name: 'Antigua and Barbuda' },
  { no: 1, name: 'United Kingdom' },
  { no: 2, name: 'Albania' },
  { no: 3, name: 'Antigua and Barbuda' },
  { no: 1, name: 'United Kingdom' },
  { no: 2, name: 'Albania' },
  { no: 3, name: 'Antigua and Barbuda' },
  { no: 1, name: 'United Kingdom' },
  { no: 2, name: 'Albania' },
  { no: 3, name: 'Antigua and Barbuda' },
];

const HRContent = () => {
  const classes = userHighRiskCountryListStyles();
  const { t } = useTranslation(['highRiskCountryList']);
  return (
    <div className={classes.HRContent}>
      <CountriesTable tableName={t('availableCountries')} data={mockData} />
      <CountriesTable tableName={t('unavailableCountries')} data={mockData} />
    </div>
  );
};

export default HRContent;
