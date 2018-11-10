import Intl from 'react-intl-universal';

const menuConfig = [
  {
    path: '/input',
    icon: 'login',
    name: Intl.get('menu.InputManage'),
    children: [
      {
        path: 'boat',
        icon: 'message',
        name: Intl.get('menu.boatChoice')
      },
      {
        path: 'plan',
        icon: 'message',
        name: Intl.get('menu.plan'),
      },
      {
        path: 'pilot',
        icon: 'message',
        name: Intl.get('menu.pilotRank')
      },
      {
        path: 'schedule',
        icon: 'message',
        name: Intl.get('menu.schedule'),
      }
    ]
  },
  {
    path: '/output',
    icon: 'logout',
    name: Intl.get('menu.OutputManage'),
    children: [
      {
        path: 'boat',
        icon: 'message',
        name: Intl.get('menu.boatChoice')
      },
      {
        path: 'plan',
        icon: 'message',
        name: Intl.get('menu.plan'),
      },
      {
        path: 'pilot',
        icon: 'message',
        name: Intl.get('menu.pilotRank')
      },
      {
        path: 'schedule',
        icon: 'message',
        name: Intl.get('menu.schedule'),
      }
    ]
  },
  {
    path: '/help',
    icon: 'question-circle-o',
    name: Intl.get('menu.help'),
  }
]


function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      authority: item.authority || parentAuthority,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}


export const getMenuData = () => formatter(menuConfig);



