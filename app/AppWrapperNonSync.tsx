import React, { useEffect, useRef, useState } from 'react';
import { AppNonSync } from './AppNonSync';

import { RealmProvider } from '@realm/react';
import { schemas } from './models';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Spinner } from 'native-base';
import { Provider } from 'react-redux';
import { initDb } from '../libs/packages/sqlite-db/helpers/init-db.helper';

export const AppWrapperNonSync = () => {
  const realmRef = useRef<Realm | null>(null);
  const [isDbAvailable, setIsDbAvailable] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (!realmRef || isDbAvailable) {
        return;
      }
      await initDb(realmRef);
      setIsDbAvailable(true);
    })();
  }, [realmRef]);
  console.log(isDbAvailable);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RealmProvider
          schema={schemas}
          realmRef={realmRef}
          schemaVersion={2}
          deleteRealmIfMigrationNeeded
        >
          {isDbAvailable ? <AppNonSync /> : <Spinner />}
        </RealmProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
