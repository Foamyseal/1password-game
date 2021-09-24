import React from "react";

import { ProgressBar } from "../app/javascript/one_password_game/components/ProgressBar/index";

export default {
  title: "Example/ProgressBar",
  component: ProgressBar,
};

const Template = (args) => <ProgressBar {...args} />;

export const LessThanHalf = Template.bind({});
LessThanHalf.args = {
  completed: 25,
};

export const Half = Template.bind({});

Half.args = {
  completed: 50,
};

export const MoreThanHalf = Template.bind({});

MoreThanHalf.args = {
  completed: 75,
};

export const Full = Template.bind({});

Full.args = {
  completed: 100,
};
