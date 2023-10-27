import React from 'react';

import {useQuery} from '@realm/react';
import {NavigatorScreenParams} from "@react-navigation/native";
import {ShopParamsList, ShopScreen} from "../libs/components/screens/shop/shop-screen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Entypo, FontAwesome5} from "@expo/vector-icons";
import {BasketScreen} from "../libs/components/screens/basket/basket.screen";
import {ProfileScreen} from "../libs/components/screens/profile/profile.screen";


export type MainTabParamList = {
    Shop: NavigatorScreenParams<ShopParamsList>;
    Basket: undefined;
    Profile: undefined;
};
const MainBottomTab = createBottomTabNavigator<MainTabParamList>();

export const AppNonSync = () => {
    return (
        <MainBottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 20 },
                headerShown: route.name !== 'Shop',
            })}
        >
            <MainBottomTab.Screen
                name={'Shop'}
                component={ShopScreen}
                options={{
                    tabBarIcon: () => <Entypo name="shop" size={24} color="black" />,
                }}
            />
            <MainBottomTab.Screen
                name={'Basket'}
                component={BasketScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="shopping-basket" size={24} color="black" />
                    ),
                }}
            />
            <MainBottomTab.Screen
                name={'Profile'}
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <FontAwesome5 name={'user'} size={24} />,
                }}
            />
        </MainBottomTab.Navigator>
    );
};
