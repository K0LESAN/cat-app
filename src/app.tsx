import { useCallback, useEffect, useRef, useState } from 'react';
import type { Cat } from './types';
import Checkbox from './components/checkbox';
import Container from './components/container';
import Layout from './components/layout';
import CatImage from './components/cat-image';
import * as styles from './app.module.scss';

const App = () => {
  const intervalIdRef = useRef<NodeJS.Timeout | number | undefined>(undefined);
  const [isAutoRefreh, setIsAutoRefreh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [catUrl, setCatUrl] = useState<string>('');
  const disabled = !isEnabled || isLoading;
  const changeIsEnabled = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, []);
  const changeIsAutoRefreh = useCallback(() => {
    setIsAutoRefreh((prev) => !prev);
  }, []);
  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  const fetchCat = useCallback(async () => {
    setIsLoading(true);

    try {
      const response: Response = await fetch(
        'https://cataas.com/cat?json=true'
      );
      const cat: Cat = await response.json();

      setCatUrl(cat.url);
    } catch (error: unknown) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!isAutoRefreh) {
      return;
    }

    intervalIdRef.current = setInterval(fetchCat, 5000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isAutoRefreh]);

  useEffect(() => {
    if (!isEnabled) {
      setIsAutoRefreh(false);
    }
  }, [isEnabled]);

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <Layout>
      <Container>
        <div className={styles.wrapper}>
          <Checkbox
            label='Enabled'
            checked={isEnabled}
            onChange={changeIsEnabled}
          />
          <Checkbox
            label='Auto-refresh every 5 second'
            checked={isAutoRefreh}
            onChange={changeIsAutoRefreh}
            disabled={disabled && !isAutoRefreh}
          />
        </div>
        <button
          className={styles.button}
          onClick={fetchCat}
          disabled={disabled || isAutoRefreh}
        >
          Get cat
        </button>
        <CatImage src={catUrl} onLoad={onLoad} onError={fetchCat} alt='cat' />
      </Container>
    </Layout>
  );
};

export default App;
