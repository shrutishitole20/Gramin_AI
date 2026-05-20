import React from 'react';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '60vh' }} className="container reveal reveal-up">
      <div className="section-header text-center">
        <span className="section-tag">{t('support_tag', 'Help Desk')}</span>
        <h2>{t('support_title', 'Get')} <span className="gradient-text">{t('support_highlight', 'Support')}</span></h2>
        <p className="mx-auto" style={{ maxWidth: '600px' }}>{t('support_desc', 'Need assistance? Our dedicated support team and AI-powered helpdesk are available 24/7.')}</p>
      </div>
    </div>
  );
};

export default Support;
