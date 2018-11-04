import Intl from 'react-intl-universal';
import moment from 'moment';
import 'moment/locale/zh-cn';
import base from './base';
import menu from './menu';


moment.locale('zh-cn');
const locales = {
  'en-us': {
    base: base['en-us'],
  	menu: menu['en-us'],
  },
  'zh-cn': {
    base: base['zh-cn'],
  	menu: menu['zh-cn'],
  },
};

Intl.init({
  currentLocale: 'zh-cn', 
  locales,
});
