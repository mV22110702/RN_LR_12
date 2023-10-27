import { HStack, VStack, Image, Text, Center, Button } from 'native-base';
import { FC, useCallback, useEffect, useState } from 'react';
import { categoryToImg } from '../../../../maps/category-to-img.map';
import { Basket } from '../../../../../app/models/Basket';
import { useRealm } from '@realm/react';

type Properties = { basketEntry: Basket };

export const BasketListItem: FC<Properties> = ({ basketEntry }) => {
  const realm = useRealm();
  const handlePressDiscard = useCallback(() => {
    realm.write(() => {
      realm.delete(basketEntry);
    });
  }, [realm, basketEntry]);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const imageUri =
        (await categoryToImg(basketEntry.chosenProduct.category[0].name)) ??
        undefined;
      setImageUri(imageUri);
    })();
  }, []);
  return (
    <VStack>
      <HStack
        my={30}
        flexDirection={'row'}
        justifyContent={'space-between'}
        flex={1}
      >
        <HStack space={2} flex={3}>
          <Center>
            {imageUri ? (
              <Image
                alt={basketEntry.chosenProduct.name}
                source={{
                  uri: imageUri,
                }}
                size={10}
              />
            ) : (
              <Center size={10} />
            )}
          </Center>
          <VStack space={1} alignContent={'start'}>
            <Text>{basketEntry.chosenProduct.name}</Text>
          </VStack>
        </HStack>
        <VStack flex={1}>
          <Text>{basketEntry.chosenProduct.price.toLocaleString()} $</Text>
          <Text>x{basketEntry.amount}</Text>
        </VStack>
      </HStack>
      <HStack py={3} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'xl'}>
          <Text fontWeight={'semibold'}>Total: </Text>
          <Text>
            {(
              basketEntry.amount * basketEntry.chosenProduct.price
            ).toLocaleString()}{' '}
            $
          </Text>
        </Text>
        <Button colorScheme={'danger'} onPress={handlePressDiscard}>
          Discard
        </Button>
      </HStack>
    </VStack>
  );
};
