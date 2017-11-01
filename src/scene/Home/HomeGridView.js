import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "../../widget";
import { screen, system, tool } from "../../common";
import HomeGridItem from "./HomeGridItem";

export default class HomeGridView extends PureComponent {
  static defaultProps = {
    infos: []
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.infos.map((info, index) => (
          <HomeGridItem
            info={info}
            key={index}
            onPress={() => this.props.onGridSelected(index)}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderTopWidth: screen.onePixel,
    borderLeftWidth: screen.onePixel,
    borderColor: color.border
  }
});
