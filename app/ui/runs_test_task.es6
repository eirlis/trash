import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";
import CardBody from "./components/card_body";
import { Input, Button } from "react-bootstrap";
import UniformDistribution from "../stat/uniform_distribution";
import ExponentialDistrubtion from "../stat/exponential_distribution";
import NormalDistribution from "../stat/normal_distribution";
import RunsTest from "../stat/runs_test";


export default class RunsTestTask extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      median: {
        sample: "",
        median: "",
        series: "",
        vn_v: "",
        tn_t: "",
        summary: ""
      }
    }
  }

  componentDidMount()
  {
    this.onMedian();
  }

  render()
  {
    return(
      <Card>
        <CardTitle>Критерий серий</CardTitle>
        <CardBody>
          <Input type="select" ref="distribution">
            <option value="uniform">Равномерный</option>
            <option value="exponential">Экспоненциальный</option>
            <option value="normal">Нормальный</option>
          </Input>
          <h5>Ряд:</h5>
          <Input type="text" value={this.state.median.sample} />
          <h5>Медиана:</h5>
          <Input type="text" value={this.state.median.median} />
          <h5>Серии:</h5>
          <Input type="text" value={this.state.median.series} />
          <h5>v(n) &gt; v:</h5>
          <Input type="text" value={this.state.median.vn_v} />
          <h5>t(n) &lt; t:</h5>
          <Input type="text" value={this.state.median.tn_t} />
          <Input type="text" value={this.state.median.summary} />
          <Button onClick={this.onMedian.bind(this)}>Новый ряд</Button>
        </CardBody>
      </Card>
    )
  }

  onMedian()
  {
    let distribution = null;
    switch (this.refs.distribution.getValue())
    {
      case "uniform":
        distribution = new UniformDistribution(0, 1);
        break;
      case "exponential":
        distribution = new ExponentialDistrubtion(1);
        break;
      case "normal":
        distribution = new NormalDistribution(0, 1);
        break;
      default:
        return;
    }

    let sample = distribution.generate(100);
    let metadata = RunsTest.median(sample);

    // out
    let summary = metadata.isRandom ?
      "Данная выборка случайная" :
      "Данная выборка не случайная";
    let median = {
      sample: sample.data.map(x => x.toFixed(2)).join(", "),
      median: sample.median().toFixed(2),
      series: metadata.series.join(""),
      vn_v: metadata.vn + " > " + metadata.v,
      tn_t: metadata.tn + " < " + metadata.t,
      summary: summary
    };

    this.setState({
      median: median
    });
  }
}
