require("./extensions");
import React from "react";
import ReactDOM from "react-dom";
import Container from "./ui/components/container";
import GenerateTask from "./ui/generate_task";
import RunsTestTask from "./ui/runs_test_task";
import StandOutTask from "./ui/stand_out_task";


class Root extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let containerStyle = {
      marginTop: "1.5em"
    };

    return (
      <Container style={containerStyle}>
        <GenerateTask />
        <RunsTestTask />
        <StandOutTask />
      </Container>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById("container"));
