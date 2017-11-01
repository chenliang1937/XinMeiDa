import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Imagem,
  StatusBar
} from "react-native";
import { color, Button, NavigationItem } from "../../widget";
import { Heading1, Heading2, Paragraph } from "../../widget/Text";
import { screen, system, tool } from "../../common";
import api from "../../api";

import NearbyCell from "./NearbyCell";
import NearbyHeaderView from "./NearbyHeaderView";

export default class NearbyListScene extends PureComponent {
  state: {
    refreshing: boolean,
    dataSource: Array<Object>,
    typeIndex: number
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: [],
      typeIndex: 0
    };
  }

  componentDidMount() {
    this._requestData();
  }

  async _requestData() {
    this.setState({ refreshing: true });
    try {
      let response = await fetch(api.recommend);
      let json = await response.json();

      let dataList = json.data.map(info => {
        return {
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        };
      });

      // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
      dataList.sort(() => {
        return 0.5 - Math.random();
      });

      this.setState({
        refreshing: false,
        dataSource: dataList
      });
    } catch (error) {
      this.setState({
        refreshing: false
      });
    }
  }

  _keyExtractor(item: Object, index: number) {
    return item.id;
  }

  _renderHeader() {
    return (
      <NearbyHeaderView
        titles={this.props.types}
        selectedIndex={this.state.typeIndex}
        onSelected={index => {
          if (index != this.state.typeIndex) {
            this.setState({ 
              refreshing: true, 
              typeIndex: index 
            });
          }
        }}
      />
    );
  }

  _renderCell(info: Object) {
    return (
      <NearbyCell
        info={info.item}
        onPress={() => {
          this.props.navigation.navigate("GroupPurchase", { info: info });
        }}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        keyExtractor={this._keyExtractor.bind(this)}
        onRefresh={this._requestData.bind(this)}
        refreshing={this.state.refreshing}
        ListHeaderComponent={this._renderHeader.bind(this)}
        renderItem={this._renderCell.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
