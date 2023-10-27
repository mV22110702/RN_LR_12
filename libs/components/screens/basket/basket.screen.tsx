import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../app';
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Toast,
  Divider,
  FlatList,
  Text,
  VStack,
  Center,
  Box,
  Heading,
} from 'native-base';
import { useSelector } from 'react-redux';
import { BasketListItem } from './components/basket-list-item';
import { Notification } from '../../notification';
import { showErrorMessage } from '../../../helpers/show-error-message.helper';
import { useQuery, useRealm } from '@realm/react';
import { Basket } from '../../../../app/models/Basket';

export type BasketScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Basket'
>;
export const BasketScreen: FC<BasketScreenProps> = () => {
  const realm = useRealm();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const basketEntries = useQuery(Basket);
  console.log('basketEntries2341234');
  const totalSum = useMemo(
    () =>
      basketEntries.reduce(
        (prev, entry) => (
          console.log(entry.chosenProduct.price),
          entry.amount * entry.chosenProduct.price + prev
        ),
        0,
      ),
    [basketEntries],
  );
  const handlePressCheckout = useCallback(() => {
    try {
      realm.write(() => {
        basketEntries.forEach((basketEntry) => {
          basketEntry.chosenProduct.quantity -= basketEntry.amount;
          if (basketEntry.chosenProduct.quantity === 0) {
            realm.delete(basketEntry.chosenProduct);
          }
        });
        realm.delete(basketEntries);
        setIsSuccess(true);
      });
    } catch (error) {
      setError(error as Error);
    }
  }, [realm, setError, setIsSuccess, basketEntries]);
  useEffect(() => {
    if (!error && !isSuccess) {
      return;
    }
    Toast.show({
      render: ({ id }) => {
        return (
          <Notification
            marginTop={10}
            id={id}
            title={error ? showErrorMessage(error) : 'Products bought'}
            variant={'solid'}
            status={'success'}
          />
        );
      },
      placement: 'top',
    });
    setIsSuccess(false);
  }, [error, isSuccess]);
  return (
    <VStack flex={1}>
      {basketEntries.length === 0 ? (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize={'4xl'}>Basket is empty!</Text>
        </Box>
      ) : (
        <Fragment>
          <Fragment>
            <FlatList
              data={basketEntries}
              px={5}
              renderItem={({ item }) => <BasketListItem basketEntry={item} />}
              ItemSeparatorComponent={() => <Divider />}
            />
            <Heading>Total: {totalSum.toLocaleString()} $</Heading>
          </Fragment>
          <Button onPress={handlePressCheckout}>Checkout</Button>
        </Fragment>
      )}
    </VStack>
  );
};
