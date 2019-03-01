import React, { Component, Fragment } from 'react';
import { Animated, Button, ViewStyle } from 'react-native';

interface State {
  visible: boolean;
}

export default class MyComponent extends Component<{}, State> {
  public state = {
    fadeAnim: new Animated.Value(0),
    visible: false,
  };

  public render() {
    const { fadeAnim } = this.state;
    return (
      <Fragment>
        <Animated.View
          style={{
            backgroundColor: 'red',
            height: 100,
            opacity: fadeAnim,
            width: 100,
          }}
        >
          {this.props.children}
        </Animated.View>
        <Button onPress={this.handlePress} title="toggle" />
      </Fragment>
    );
  }

  private handlePress = () => {
    this.setState(({ visible }) => {
      const value = visible ? 0 : 1;
      Animated.timing(this.state.fadeAnim, {
        duration: 5000,
        toValue: value,
      }).start();
      return { visible: !visible };
    });
  };
}
