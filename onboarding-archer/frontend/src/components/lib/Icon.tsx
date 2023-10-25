import { Icons } from '@/utils/icons';
import { HTMLAttributes } from 'react';

interface PropTypes extends HTMLAttributes<HTMLElement> {
  icon: keyof typeof Icons;
  className?: string;
}
export default function Icon({ icon, ...otherProps }: PropTypes) {
  const paths = icon.split('.');
  let Comp = (Icons as Record<string, any>)[paths[0]];
  for (let i = 1; i < paths.length; i++) {
    Comp = Comp[paths[i]];
  }
  if (!Comp) {
    console.error(`Missing icon: ${icon}`);
    return null;
  }
  return <Comp {...otherProps} />;
}
