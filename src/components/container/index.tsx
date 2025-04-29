import type { FC, PropsWithChildren } from 'react';
import * as styles from './index.module.scss';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
