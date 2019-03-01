import React from 'react';
import TestRenderer from 'react-test-renderer';
import MyComponent from './MyComponent';

beforeEach(() => {
  jest.clearAllMocks();
});

const start = jest.fn();
jest.mock('react-native', () => {
  const { Animated, Button } = jest.requireActual('react-native');
  const MockAnimated = {
    Value: Animated.Value,
    View: Animated.View,
    timing: jest.fn(() => {
      return {
        start,
      };
    }),
  };
  return { Animated: MockAnimated, Button };
});

it('smoke test', () => {
  TestRenderer.create(<MyComponent />);
});

it('clicking toggle animates', () => {
  const testRender = TestRenderer.create(<MyComponent />);
  const testInstance = testRender.root;
  const buttonInstance = testInstance.findByProps({ title: 'toggle' });
  buttonInstance.props.onPress();
  expect(start.mock.calls.length).toBe(1);
});
