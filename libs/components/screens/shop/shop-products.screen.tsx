import { Center } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList } from '../../app';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShopParamsList } from './shop-screen';
import { FC, useState } from 'react';
import { ModalBuy } from './components/modal-buy';
import { ShopProductsList } from './components/shop-products-list';
import { useQuery } from '@realm/react';
import { Product } from '../../../../app/models/Product';

export type ShopProductsScreenParams = CompositeScreenProps<
  NativeStackScreenProps<ShopParamsList, 'ShopProducts'>,
  BottomTabScreenProps<MainTabParamList>
>;

export const ShopProductsScreen: FC<ShopProductsScreenParams> = ({ route }) => {
  const { categoryObjectIdJSON } = route.params;
  const categoryObjectId:Realm.BSON.ObjectId = new Realm.BSON.ObjectId(categoryObjectIdJSON);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const products: Realm.Results<Product> = useQuery(Product, (collection) =>
    collection.filtered('ALL category._id == $0', categoryObjectId),
  );
  const [chosenProduct, setChosenProduct] = useState<Product | null>(null);
  return (
    <Center mt={50} flex={1}>
      <ShopProductsList
        products={products}
        setChosenProduct={setChosenProduct}
        setIsModalVisible={setIsModalVisible}
      />
      <ModalBuy
        product={chosenProduct}
        setChosenProduct={setChosenProduct}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Center>
  );
};
