import { iconMap } from './constant';

export const NodeSchemaParser = (obj: Record<string, any>) => {
  obj['config'] = obj['data'];
  const type = obj['type'];
  obj['icon'] =
    iconMap[type as keyof typeof iconMap] ||
    'https://mdn.alipayobjects.com/huamei_xbkogb/afts/img/A*PzmdRpvZz58AAAAAAAAAAAAADqarAQ/original';

  delete obj['data'];
};
