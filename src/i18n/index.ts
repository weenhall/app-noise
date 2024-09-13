import { createI18n } from 'vue-i18n';

const messages = {
  zh: {
    ok:'确定',
    cancel:'取消',
    tab1: '曲目',
    tab2:'分贝检测',
    tab3:'设置',
    playlist:'声音列表',
    rain:'雨',
    storm:'咆哮',
    wind:'风',
    waves:'波浪',
    stream:'溪流',
    birds:'鸟',
    summerNight:'夏夜',
    train:'火车',
    boat:'船',
    city:'城市',
    coffeeShop:'咖啡店',
    fireplace:'火炉',
    pinkNoise:'粉红噪声',
    whiteNoise:'白噪声'
  },
  en: {
    ok:'OK',
    cancel:'CANCEL',
    tab1: 'playlist',
    tab2:'detect',
    tab3:'setting',
    playlist:'playlist',
    rain:'rain',
    storm:'storm',
    wind:'wind',
    waves:'waves',
    stream:'stream',
    birds:'birds',
    summerNight:'summer night',
    train:'train',
    boat:'boat',
    city:'city',
    coffeeShop:'coffee shop',
    fireplace:'fireplace',
    pinkNoise:'pink noise',
    whiteNoise:'white noise'
  },
};

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'zh', // 默认语言
  messages,
});

export default i18n