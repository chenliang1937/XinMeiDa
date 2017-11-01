import React, { PureComponent } from "react";
import { AppRegistry } from "react-native";
import RootScene from "./src/RootScene";

export default class XinMeiDa extends PureComponent {
  render() {
    return <RootScene />;
  }
}

AppRegistry.registerComponent("XinMeiDa", () => XinMeiDa);
