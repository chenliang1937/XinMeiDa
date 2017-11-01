import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Heading1, Heading2, Paragraph } from "../../widget/Text";
import { screen, system, tool } from "../../common";
import api from "../../api";
import { color, DetailCell, SpacingView } from "../../widget";

import OrderMenuItem from "./OrderMenuItem";
import GroupPurchaseCell from "../GroupPurchase/GroupPurchaseCell";

export default class OrderScene extends PureComponent<{}> {
  state: {
    refreshing: boolean,
    dataSource: Array<Object>
  };

  static navigationOptions = ({ navigation }) => ({
    title: "订单",
    headerStyle: { backgroundColor: "white" }
  });

  constructor(props: Object) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: []
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
      <View style={styles.container}>
        <DetailCell title="我的订单" subtitle="全部订单" style={{ height: 38 }} />

        <View style={styles.itemContainer}>
          <OrderMenuItem
            title="待付款"
            icon={require("../../img/Order/order_tab_need_pay.png")}
          />
          <OrderMenuItem
            title="待使用"
            icon={require("../../img/Order/order_tab_need_use.png")}
          />
          <OrderMenuItem
            title="待评价"
            icon={require("../../img/Order/order_tab_need_review.png")}
          />
          <OrderMenuItem
            title="退款/售后"
            icon={require("../../img/Order/order_tab_needoffer_aftersale.png")}
          />
        </View>

        <SpacingView />

        <DetailCell title="我的收藏" subtitle="查看全部" style={{ height: 38 }} />
      </View>
    );
  }

  _renderCell(info: Object) {
    return (
      <GroupPurchaseCell
        info={info.item}
        onPress={() => {
          StatusBar.setBarStyle("default", false);
          this.props.navigation.navigate("GroupPurchase", { info: info });
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
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
    backgroundColor: "white"
  },
  itemContainer: {
    flexDirection: "row"
  }
});
