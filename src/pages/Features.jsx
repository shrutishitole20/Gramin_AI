import React from 'react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '60vh' }} className="container reveal reveal-up">
      <div className="section-header text-center">
        <span className="section-tag">{t('features_tag', 'Capabilities')}</span>
        <h2>{t('features_heading', 'Key')} <span className="gradient-text">{t('features_highlight', 'Features')}</span></h2>
        <p className="mx-auto" style={{ maxWidth: '600px' }}>{t('features_desc', 'Explore the powerful tools and resources we provide to accelerate agricultural and rural innovation.')}</p>
      </div>
    </div>
  );
};

export default Features;
