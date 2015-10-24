require("./extensions");
import React from "react";
import ReactDOM from "react-dom";
import Container from "./ui/components/container";
import GenerateTask from "./ui/generate_task";
import RunsTestTask from "./ui/runs_test_task";
import StandOutTask from "./ui/stand_out_task";
import UniformDistribution from "./stat/uniform_distribution";
import ExponentialDistribution from "./stat/exponential_distribution";
import NormalDistribution from "./stat/normal_distribution";


class Root extends React.Component
{
  constructor(props)
  {
    super(props);

    this.samples = {
      uniform: {
        start: 0,
        end: 1,
        size: 100
      },
      exponential: {
        lambda: 1,
        size: 100
      },
      normal: {
        mean: 0,
        std: 1,
        size: 100
      }
    };

    this.samples.uniform.sample = new UniformDistribution(this.samples.uniform.start,
      this.samples.uniform.end).generate(this.samples.uniform.size);
    this.samples.exponential.sample = new ExponentialDistribution(this.samples.exponential.lambda)
      .generate(this.samples.exponential.size);
    this.samples.normal.sample = new NormalDistribution(this.samples.normal.mean,
      this.samples.normal.std).generate(this.samples.normal.size);
  }

  render()
  {
    let containerStyle = {
      marginTop: "1.5em"
    };

    return (
      <Container style={containerStyle}>
        <GenerateTask samples={this.samples} onNewSample={this.onNewSample} />
        <RunsTestTask samples={this.samples} />
        <StandOutTask samples={this.samples} />
      </Container>
    );
  }

  onNewSample()
  {
  }
}


ReactDOM.render(<Root />, document.getElementById("container"));
