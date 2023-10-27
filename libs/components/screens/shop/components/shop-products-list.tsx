import { Center,Text, Divider, FlatList } from 'native-base';
import {FC, memo} from 'react';
import { ShopListProductItem } from './shop-list-product-item';
import {Product} from "../../../../../app/models/Product";

type Properties = {
  products: Realm.Results<Product>;
  setChosenProduct: (product: Product) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
};
export const ShopProductsList: FC<Properties> = memo(
  ({
     products,
     setChosenProduct,
     setIsModalVisible
  }) => {
    return (
      <FlatList
        width={'100%'}
        px={5}
        data={products}
        renderItem={({ item }) => (
          <ShopListProductItem
            product={item}
            setChosenProduct={setChosenProduct}
            setIsModalVisible={setIsModalVisible}
          />
        )}
        ListEmptyComponent={()=><Center><Text>No products left</Text></Center>}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  },
  (prevProps, nextProps) => prevProps.products === nextProps.products,
);
