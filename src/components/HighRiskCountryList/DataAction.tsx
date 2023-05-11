import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '../../assets/images/download.png';
import ExportIcon from '../../assets/images/export.png';
import ImportIcon from '../../assets/images/import.png';

const DataAction = () => {
  const { t } = useTranslation(['highRiskCountryList']);
  return (
    <Grid
      container
      gap={'24px'}
      sx={{
        position: 'absolute',
        top: 0,
        right: '24px',
        width: 'fit-content',
      }}
    >
      <Grid item className="btnBgLinear">
        <img src={ImportIcon} alt="" />
        {t('import')}
      </Grid>
      <Grid item className="btnBgLinear">
        <img src={ExportIcon} alt="" />
        {t('export')}
      </Grid>
      <Grid item className="btnBgLinear">
        <img src={DownloadIcon} alt="" />
        {t('download')}
      </Grid>
    </Grid>
  );
};

export default DataAction;
