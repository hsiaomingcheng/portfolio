export interface TaiwanClient {
  name: string;
  type: string;
  domain: string;
  url: string;
}

export const taiwanClients: TaiwanClient[] = [
  {
    name: 'R88',
    type: 'Game developer',
    domain: 'r88games.com',
    url: 'https://r88games.com/en',
  },
  {
    name: 'MayChen',
    type: 'Food R&D company',
    domain: 'maychen.com.tw',
    url: 'https://www.maychen.com.tw/en',
  },
  {
    name: 'MOCA Taipei',
    type: 'Contemporary art museum',
    domain: 'mocataipei.org.tw',
    url: 'https://www.mocataipei.org.tw/en',
  },
  {
    name: 'GoodTire',
    type: 'Tyre company',
    domain: 'goodtire.com.tw',
    url: 'http://www.goodtire.com.tw/en',
  },
  {
    name: 'H2O Hotel',
    type: 'Hotel',
    domain: 'h2ohotel.com.tw',
    url: 'https://www.h2ohotel.com.tw/en',
  },
  {
    name: 'Papillon',
    type: 'Jewellery brand',
    domain: 'great-papillon.com.tw',
    url: 'https://www.great-papillon.com.tw/zh-tw',
  },
];
