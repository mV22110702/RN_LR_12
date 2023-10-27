import { Button, Center, FormControl, Modal, Spinner, Text } from 'native-base';
import { FC, useCallback, useMemo, useState } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Product } from '../../../../../app/models/Product';
import { useRealm } from '@realm/react';
import { Basket } from '../../../../../app/models/Basket';

type Properties = {
  product: Product | null;
  setChosenProduct: (product: Product | null) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
};
export const ModalBuy: FC<Properties> = ({
  product,
  setChosenProduct,
  isModalVisible,
  setIsModalVisible,
}) => {
  const INITIAL_AMOUNT = useMemo(() => 1, []);
  const realm = useRealm();
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const handleChangeAmount = useCallback(
    (value: number) => {
      if (typeof value !== 'number') {
        return;
      }
      setAmount(value);
    },
    [amount, setAmount],
  );
  const handlePressBuy = useCallback(() => {
    if (!product || amount === 0 || product.quantity < amount) {
      return;
    }
    realm.write(() => {
      realm.create(Basket, {
        amount,
        chosenProduct: product,
        _id: new Realm.BSON.ObjectId(),
      });
    });
    setChosenProduct(null);
  }, [product, amount]);

  const handleClose = () => {
    setAmount(INITIAL_AMOUNT);
    setIsModalVisible(false);
  };

  return (
    <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          {product ? `Buy ${product.name}` : 'Loading...'}
        </Modal.Header>
        <Modal.Body>
          {product ? (
            <FormControl alignItems={'center'}>
              <FormControl.Label>
                {' '}
                <Text fontSize={'xl'}>How much You want to buy?</Text>
              </FormControl.Label>
              <NumericInput
                minValue={0}
                maxValue={product.quantity}
                value={amount}
                iconSize={1}
                onChange={handleChangeAmount}
              />
            </FormControl>
          ) : (
            <Center>
              <Spinner />
              <Text>Loading...</Text>
            </Center>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleClose}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                handlePressBuy();
                handleClose();
              }}
            >
              Buy
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
