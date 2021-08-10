import React from "react";
import { Meta, Story } from "@storybook/react";
import faker from "faker";
import { TeleBoxState } from "../../TeleBox/constants";
import { MaxTitleBarReact, MaxTitleBarReactProps } from "./MaxTitleBarReact";

const storyMeta: Meta = {
    title: "MaxTitleBar",
    component: MaxTitleBarReact,
};

export default storyMeta;

const containerRect = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
};

export const Overview: Story<MaxTitleBarReactProps> = (props) => (
    <MaxTitleBarReact {...props} />
);
Overview.args = {
    state: TeleBoxState.Maximized,
    boxes: Array(3)
        .fill(0)
        .map((_, i) => ({ id: `${i + 1}`, title: `tab ${i + 1}` })),
    containerRect,
};
Overview.args.focusedBox = Overview.args.boxes![1];

export const SingleBox: Story<MaxTitleBarReactProps> = (props) => (
    <MaxTitleBarReact {...props} />
);
SingleBox.args = {
    state: TeleBoxState.Maximized,
    boxes: [{ id: `1`, title: faker.commerce.productName() }],
    containerRect,
};

export const BoxOverflows: Story<MaxTitleBarReactProps> = (props) => (
    <MaxTitleBarReact {...props} />
);
BoxOverflows.args = {
    state: TeleBoxState.Maximized,
    boxes: Array(50)
        .fill(0)
        .map((_, i) => ({ id: `${i + 1}`, title: `tab ${i + 1}` })),
    containerRect,
};
BoxOverflows.args.focusedBox = BoxOverflows.args.boxes![3];