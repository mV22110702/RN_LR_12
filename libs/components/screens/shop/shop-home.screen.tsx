import { Center } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList } from '../../app';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShopParamsList } from './shop-screen';
import { FC } from 'react';
import { ShopCategoriesList } from './components/shop-categories-list';
import {useQuery} from "@realm/react";
import {Category} from "../../../../app/models/Category";

export type ShopHomeScreenParams = CompositeScreenProps<
  NativeStackScreenProps<ShopParamsList, 'ShopHome'>,
  BottomTabScreenProps<MainTabParamList>
>;

export const ShopHomeScreen: FC<ShopHomeScreenParams> = () => {
  const categories:Realm.Results<Category> = useQuery(Category);
  return (
    <Center mt={50} flex={1}>
      <ShopCategoriesList
        categories={categories}
      />
    </Center>
  );
};
