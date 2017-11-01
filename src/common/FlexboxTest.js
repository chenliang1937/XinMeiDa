import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text
} from "react-native";

export default class FlexboxTest extends PureComponent {
  
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

/**
 * 弹性布局：
 * 1.flexDirection 
 *    设置是row，子项目一律从左到右排列
 *    默认为column，子项目从上往下竖着排列
 * 2.flex: 1
 *    使view成为弹性容器的同时，让view的宽高可以充满其父容器
 * 3.flexWrap
 *    默认nowrap 内容不换行
 *    wrap 内容换行
 * 4.justifyContent
 *    center 水平方向居中
 *    默认flex-start 水平方向居左
 *    fles-end 水平方向居右
 *    space-between 两端对齐
 *    space-around 两端对齐（绝对分配空间）
 * 5.alignItems
 *    center 垂直方向居中
 *    flex-start 垂直方向居上
 *    flex-end 垂直方向局下
 *    stretch 拉伸到和父容器等高
 * 6.alignSelf
 *    添加在子项目上的属性，可以覆盖原父容器的对齐方式，定义自己是如何对齐
 *    flex-start／center／flex-end
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
