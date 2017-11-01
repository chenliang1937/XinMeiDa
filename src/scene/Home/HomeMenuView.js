import React, { PureComponent } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { screen, system, tool } from "../../common";
import { color, PageControl } from "../../widget";
import HomeMenuItem from "./HomeMenuItem";

export default class HomeMenuView extends PureComponent {
  state: {
    currentPage: number
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      currentPage: 0
    };
  }

  _onScroll(e: any) {
    let x = e.nativeEvent.contentOffset.x;
    let currentPage = Math.round(x / screen.width);

    if (this.state.currentPage != currentPage) {
      this.setState({
        currentPage: currentPage
      });
    }
  }

  render() {
    let { menuInfos, onMenuSelected } = this.props;

    let menuItems = menuInfos.map((info, i) => (
      <HomeMenuItem
        key={info.title}
        title={info.title}
        icon={info.icon}
        onPress={() => {
          onMenuSelected && onMenuSelected(i);
        }}
      />
    ));

    let menuViews = [];
    let pageCount = Math.ceil(menuItems.length / 10);

    for (let i = 0; i < pageCount; i++) {
      let items = menuItems.slice(i * 10, i * 10 + 10);

      let menuView = (
        <View style={styles.itemsView} key={i}>
          {items}
        </View>
      );
      menuViews.push(menuView);
    }

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => this._onScroll(e)}
        >
          <View style={styles.menuContainer}>{menuViews}</View>
        </ScrollView>

        <PageControl
          style={styles.PageControl}
          numberOfPages={pageCount}
          currentPage={this.state.currentPage}
          hidesForSinglePage
          pageIndicatorTintColor="gray"
          currentPageIndicatorTintColor={color.theme}
          indicatorSize={{ width: 8, height: 8 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  contentContainer: {},
  menuContainer: {
    flexDirection: "row"
  },
  itemsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screen.width
  },
  PageControl: {
    margin: 10
  }
});