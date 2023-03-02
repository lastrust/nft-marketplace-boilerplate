import routes from '@/config/routes';
import { PlusCircle } from '@/components/icons/plus-circle';

export const menuItems = [
  {
    name: 'MARKETPLACE',
    icon: <PlusCircle />,
    href: routes.marketplace,
  },
  {
    name: 'ROADMAP',
    icon: <PlusCircle />,
    href: routes.roadmap,
  },
  {
    name: 'TEAM',
    icon: <PlusCircle />,
    href: routes.team,
  },
  {
    name: 'FAQ',
    icon: <PlusCircle />,
    href: routes.faq,
  },
];
