import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/common/PageTitle';

import DataAction from '../../components/HighRiskCountryList/DataAction';
import HRContent from '../../components/HighRiskCountryList/HRContent';

const HighRiskCountryList = () => {
  const { t } = useTranslation(['highRiskCountryList']);

  return (
    <div>
      <div
        style={{
          position: 'relative',
          paddingBottom: '24px',
          borderBottom: 'var(--primary-border)',
        }}
      >
        <PageTitle title={t('highRiskCountryList')} />
        <DataAction />
      </div>
      <HRContent />
    </div>
  );
};

export default HighRiskCountryList;
