import { ShopListCategoryItem } from './shop-list-category-item';
import { Divider, FlatList } from 'native-base';
import {FC, memo} from 'react';
import {Category} from "../../../../../app/models/Category";

type Properties = {
  categories: Realm.Results<Category>;
};
export const ShopCategoriesList: FC<Properties> = memo(
  ({
     categories,
  }) => {
    return (
      <FlatList
        width={'100%'}
        px={5}
        data={categories}
        renderItem={({ item }) => (
          <ShopListCategoryItem
            category={item}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  },
  (prevProps, nextProps) => prevProps.categories === nextProps.categories,
);
