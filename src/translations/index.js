import i18n from 'i18next';

import {getLanguage} from "../helpers/systemConfigHelper";

import {trMessages} from './tr.js';
import {enMessages} from './en.js';

const language = getLanguage();

i18n.init({
    resources: {
        en: {translations: {...enMessages}},
        tr: {translations: {...trMessages}}
    },
    lng: language,
    fallbackLng: language,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false
    },
    react: {
        wait: true
    }
});

export default i18n;