import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaFlag } from 'react-icons/fa';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { currentLanguage, toggleLanguage, isEnglish, isFrench } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="language-switcher">
      <button 
        onClick={toggleLanguage}
        className="language-toggle-btn"
        title={t('navigation.language')}
        aria-label={`Switch to ${isEnglish ? 'French' : 'English'}`}
      >
        <FaGlobe className="globe-icon" />
        <span className="language-text">
          {isEnglish ? 'FR' : 'EN'}
        </span>
        <div className="flag-indicator">
          {isEnglish ? (
            <span className="flag">🇫🇷</span>
          ) : (
            <span className="flag">🇬🇧</span>
          )}
        </div>
      </button>
    </div>
  );
};

export default LanguageSwitcher; 