import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList
} from "react-native";

import { Heading1, Heading2, Paragraph } from "../../widget/Text";
import {
  color,
  Button,
  NavigationItem,
  SearchBar,
  SpacingView
} from "../../widget";

import { screen, system } from "../../common";
import api from "../../api";

import HomeMenuView from "./HomeMenuView";
import HomeGridView from "./HomeGridView";
import GroupPurchaseCell from "../GroupPurchase/GroupPurchaseCell";

export default class HomeScene extends PureComponent<{}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <TouchableOpacity style={styles.searchBar}>
        <Image
          source={require("../../img/Home/search_icon.png")}
          style={styles.searchIcon}
        />
        <Paragraph>一点点</Paragraph>
      </TouchableOpacity>
    ),
    headerRight: (
      <NavigationItem
        icon={require("../../img/Home/icon_navigationItem_message_white.png")}
        onPress={() => {}}
      />
    ),
    headerLeft: (
      <NavigationItem
        title="合肥"
        titleStyle={{ color: "white" }}
        onPress={() => {}}
      />
    ),
    headerStyle: { backgroundColor: color.theme }
  });

  state: {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      discounts: [],
      dataList: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this._requestData();
  }

  _requestData() {
    this.setState({
      refreshing: true
    });

    this._requestDiscount();
    this._requestRecommend();
  }

  async _requestRecommend() {
    try {
      let response = await fetch(api.recommend);
      let json = await response.json();

      let dataList = json.data.map(info => {
        return {
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.name,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        };
      });

      this.setState({
        dataList: dataList,
        refreshing: false
      });
    } catch (error) {
      this.setState({ refreshing: false });
    }
  }

  async _requestDiscount() {
    try {
      let response = await fetch(api.discount);
      let json = await response.json();
      this.setState({ discounts: json.data });
    } catch (error) {
      alert("hehe" + error);
    }
  }

  _keyExtractor(item: Object, index: number) {
    return item.id;
  }

  _renderCell(info: Object) {
    return (
      <GroupPurchaseCell
        info={info.item}
        onPress={this._onCellSelected.bind(this)}
      />
    );
  }

  _onCellSelected(info: Object) {
    StatusBar.setBarStyle("default", false);
    this.props.navigation.navigate("GroupPurchase", { info: info });
  }

  _renderHeader() {
    return (
      <View>
        <HomeMenuView
          menuInfos={api.menuInfo}
          onMenuSelected={this._onMenuSelected.bind(this)}
        />

        <SpacingView />

        <HomeGridView
          infos={this.state.discounts}
          onGridSelected={this._onGridSelected.bind(this)}
        />

        <SpacingView />

        <View style={styles.recommendHeader}>
          <Heading2>猜你喜欢</Heading2>
        </View>
      </View>
    );
  }

  _onGridSelected(index: number) {
    let discount = this.state.discounts[index];

    if (discount.type == 1) {
      StatusBar.setBarStyle("default", false);

      let location = discount.tplurl.indexOf("http");
      let url = discount.tplurl.slice(location);
      this.props.navigation.navigate("Web", { url: url });
    }
  }

  _onMenuSelected(index: number) {
    alert(index);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataList}
          keyExtractor={this._keyExtractor.bind(this)}
          onRefresh={this._requestData.bind(this)}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this._renderHeader.bind(this)}
          renderItem={this._renderCell.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  recommendHeader: {
    height: 35,
    justifyContent: "center",
    borderWidth: screen.onePixel,
    borderColor: color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: "white"
  },
  searchBar: {
    width: screen.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center"
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5
  }
});
