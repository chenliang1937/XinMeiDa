import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Keyboard
} from "react-native";

import { screen, system, tool } from "../common";

export default class SearchBar extends PureComponent {
  props: {
    onSubmitEditing: Function,
    text: string,
    onChangeText: Function,
    onsubmit: Function,
    style: Object
  };

  state: {
    text: string
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  _onChangeText(text: string) {
    this.setState({
      text: text
    });
    this.props.onChangeText && this.props._onChangeText();
  }

  _onSubmitEditing() {
    if (this.props.onsubmit) {
      this.props.onsubmit(this.state.text);
    }
  }

  _click() {
    if (system.isIOS) {
      // 取消
    } else {
      //搜索
      this._onSubmitEditing;
    }
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../img/Home/search_icon.png")}
          />

          <TextInput
            ref="input"
            style={styles.input}
            placeholder="搜索"
            returnKeyType="search"
            onSubmitEditing={this._onSubmitEditing.bind(this)}
            onChangeText={text => {
              this._onChangeText(text);
            }}
            underlineColorAndroid="transparent"
          />
        </View>

        <TouchableOpacity
          onPress={this._click.bind(this)}
          style={styles.cancelBtn}
        >
          <Text style={styles.cancelText}>{system.isIOS ? "取消" : "搜索"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7
  },
  inputContainer: {
    flex: 1,
    height: 32,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "#e4e4e4",
    borderRadius: 5
  },
  icon: {
    marginLeft: 10,
    width: 21,
    height: 21
  },
  cancelBtn: {
    width: 55,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelText: {
    color: "#4683ca",
    fontSize: 14
  },
  input: {
    flex: 1,
    marginHorizontal: 5
  }
});
