import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  InteractionManager
} from "react-native";
import {
  color,
  Button,
  NavigationItem,
  Separator,
  SpacingView
} from "../../widget";
import { Heading1, Heading2, Paragraph, HeadingBig } from "../../widget/Text";
import { screen, system, tool } from "../../common";
import api, { recommendUrlWithId, groupPurchaseDetailWithId } from "../../api";
import GroupPurchaseCell from "./GroupPurchaseCell";

export default class GroupPurchaseScene extends PureComponent<{}> {
  state: {
    refreshing: boolean,
    info: Object,
    dataSource: Array<Object>
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "团购详情",
    headerStyle: { backgroundColor: "white" },
    headerRight: (
      <NavigationItem
        icon={require("../../img/Public/icon_navigationItem_share.png")}
        onPress={() => {}}
      />
    )
  });

  constructor(props: Object) {
    super(props);
    this.state = {
      refreshing: false,
      info: {},
      dataSource: []
    };
  }

  componentDidMount() {
    this._requestData();
  }

  _requestData() {
    this.setState({ refreshing: true });
    this._requestDetail();
    this._requestRecommend();
  }

  _requestDetail() {
    //原详情接口已经被美团关掉，这里暂时从上一级列表中获取详情数据
  }

  async _requestRecommend() {
    try {
      let info = this.props.navigation.state.params.info;
      let response = await fetch(recommendUrlWithId(info.id));
      let json = await response.json();

      let dataList = json.data.deals.map(info => {
        return {
          id: info.id,
          imageUrl: info.imgurl,
          title: info.title,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        };
      });

      this.setState({
        dataSource: dataList,
        refreshing: false
      });
    } catch (error) {
      this.setState({ refreshing: false });
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
    this.props.navigation.navigate("GroupPurchase", { info: info });
  }

  _renderHeader() {
    let info = this.props.navigation.state.params.info;

    return (
      <View>
        <View>
          <Image
            style={styles.banner}
            source={{ uri: info.imageUrl.replace("w.h", "480.0") }}
          />

          <View style={styles.topContainer}>
            <Heading1 style={{ color: color.theme }}>¥</Heading1>
            <HeadingBig style={{ marginBottom: -8 }}>{info.price}</HeadingBig>
            <Paragraph style={{ marginLeft: 10 }}>
              门市价：¥{(info.price * 1.1).toFixed(0)}
            </Paragraph>
            <View style={{ flex: 1 }} />
            <Button
              title="立即抢购"
              style={{ color: "white", fontSize: 18 }}
              containerStyle={styles.buyButton}
            />
          </View>
        </View>

        <Separator />

        <View>
          <View style={styles.tagContainer}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../img/Home/icon_deal_anytime_refund.png")}
            />
            <Paragraph style={{ color: "#89B24F" }}> 随时退</Paragraph>
            <View style={{ flex: 1 }} />
            <Paragraph>已售{1234}</Paragraph>
          </View>
        </View>

        <SpacingView />

        <View style={styles.tipHeader}>
          <Heading2>看了本团购的用户还看了</Heading2>
        </View>
      </View>
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
  banner: {
    width: screen.width,
    height: screen.width * 0.5
  },
  topContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  buyButton: {
    backgroundColor: "#fc9e28",
    width: 94,
    height: 36,
    borderRadius: 7
  },
  tagContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
  },
  tipHeader: {
    height: 35,
    justifyContent: "center",
    borderWidth: screen.onePixel,
    borderColor: color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: "white"
  }
});
