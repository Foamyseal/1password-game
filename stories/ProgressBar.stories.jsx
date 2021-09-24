import React from "react";

import { ProgressBar } from "../app/javascript/one_password_game/components/ProgressBar/index";

export default {
  title: "Example/ProgressBar",
  component: ProgressBar,
};

const Template = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  completed: 25,
  bgcolor: "red",
};
