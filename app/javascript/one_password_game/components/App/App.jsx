// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ProgressBar } from "../ProgressBar/index";
import { Header } from "../Header/index";

const App = (props) => {
  const MAX_SCORE = 200;
  const [completed, setCompleted] = useState(0);

  // useEffect(() => {

  // });

  return (
    <div>
      <Header />
      <ProgressBar completed={50} />

      {/* <Tree /> */}
    </div>
  );
};

export { App };
