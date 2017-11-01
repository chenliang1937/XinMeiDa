import React, { PureComponent } from "react";
import { StatusBar } from "react-native";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";

import color from "./widget/color";
import { screen, system, tool } from "./common";
import TabBarItem from "./widget/TabBarItem";

import HomeScene from "./scene/Home/HomeScene";
import OrderScene from "./scene/Order/OrderScene";
import NearbyScene from "./scene/Nearby/NearbyScene";
import MineScene from "./scene/Mine/MineScene";

import WebScene from "./widget/WebScene";
import GroupPurchaseScene from "./scene/GroupPurchase/GroupPurchaseScene";

const lightContentScenes = ["Home", "Mine"];

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default class RootScene extends PureComponent {
  render() {
    return (
      <Navigator
        onNavigationStateChange={(prevState, currentState) => {
          const currentScene = getCurrentRouteName(currentState);
          const previousScene = getCurrentRouteName(prevState);
          if (previousScene !== currentScene) {
            if (lightContentScenes.indexOf(currentScene) >= 0) {
              StatusBar.setBarStyle("light-content");
            } else {
              StatusBar.setBarStyle("dark-content");
            }
          }
        }}
      />
    );
  }
}

const Tab = TabNavigator(
  {
    Home: {
      screen: HomeScene,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "团购",
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require("./img/tabbar/pfb_tabbar_homepage.png")}
            selectedImage={require("./img/tabbar/pfb_tabbar_homepage_selected.png")}
          />
        )
      })
    },
    Nearby: {
      screen: NearbyScene,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "附近",
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require("./img/tabbar/pfb_tabbar_merchant.png")}
            selectedImage={require("./img/tabbar/pfb_tabbar_merchant_selected.png")}
          />
        )
      })
    },
    Order: {
      screen: OrderScene,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "订单",
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require("./img/tabbar/pfb_tabbar_order.png")}
            selectedImage={require("./img/tabbar/pfb_tabbar_order_selected.png")}
          />
        )
      })
    },
    Mine: {
      screen: MineScene,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "我的",
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require("./img/tabbar/pfb_tabbar_mine.png")}
            selectedImage={require("./img/tabbar/pfb_tabbar_mine_selected.png")}
          />
        )
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: color.theme,
      inactiveTintColor: "#979797",
      style: { backgroundColor: "#ffffff" }
    }
  }
);

const Navigator = StackNavigator(
  {
    Tab: { screen: Tab },
    Web: { screen: WebScene },
    GroupPurchase: { screen: GroupPurchaseScene }
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: "#333333",
      showIcon: true
    }
  }
);