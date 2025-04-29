import type { FC, PropsWithChildren } from 'react';
import './index.scss';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={'layout'}>{children}</div>;
};

export default Layout;
