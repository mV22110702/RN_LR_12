import { FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { categoryToImg } from '../../../../maps/category-to-img.map';
import { Product } from '../../../../../app/models/Product';

type Properties = {
  product: Product;
  setChosenProduct: (product: Product) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
};
export const ShopListProductItem: FC<Properties> = ({
  product,
  setChosenProduct,
  setIsModalVisible,
}) => {
  const handleChooseListing = useCallback(() => {
    setChosenProduct(product);
    setIsModalVisible(true);
  }, [product]);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const imageUri =
        (await categoryToImg(product.category[0].name)) ?? undefined;
      setImageUri(imageUri);
    })();
  }, []);
  return (
    <Pressable onPress={handleChooseListing}>
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
                alt={product.name}
                source={{
                  uri: imageUri,
                }}
                size={10}
              />
            ) : (
              <Center size={10} />
            )}
          </Center>
          <HStack space={70}>
            <Text>
              {product.name} ({product.quantity} left)
            </Text>
            <Text>{product.price.toLocaleString()} $</Text>
          </HStack>
        </HStack>
      </HStack>
    </Pressable>
  );
};
