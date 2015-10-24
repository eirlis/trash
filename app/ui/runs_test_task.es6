import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";
import CardBody from "./components/card_body";
import { Input, Button } from "react-bootstrap";
import TextField from "./components/text_field";
import UniformDistribution from "../stat/uniform_distribution";
import ExponentialDistribution from "../stat/exponential_distribution";
import NormalDistribution from "../stat/normal_distribution";
import RunsTest from "../stat/runs_test";


export default class RunsTestTask extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      median_distribution: "uniform",
      ascdesc_distribution: "uniform"
    }
  }

  componentDidMount()
  {
    this.update();
  }

  update()
  {
    this.updateMedian(this.state.median_distribution);
    this.updateAscDesc(this.state.ascdesc_distribution);
  }

  render()
  {
    return(
      <Card>
        <CardTitle>Случайнойность выборки</CardTitle>
        <CardBody>
          <h3>Критерий серий</h3>
          <Input type="select" onChange={this.onSelectMedianDistribution.bind(this)}>
            <option value="uniform">Равномерный</option>
            <option value="exponential">Экспоненциальный</option>
            <option value="normal">Нормальный</option>
          </Input>
          <h6>Выборка:</h6>
          <TextField ref="median_sample" />
          <h6>Медиана:</h6>
          <TextField ref="median_median" />
          <h6>Серии:</h6>
          <TextField ref="median_series" />
          <h6>v(n) &gt; v:</h6>
          <TextField ref="median_vn_v" />
          <h6>t(n) &lt; t:</h6>
          <TextField ref="median_tn_t" />
          <TextField ref="median_summary" />
        </CardBody>
        <CardBody>
          <h3>Критерий восходящих и нисходящих серий</h3>
          <Input type="select" onChange={this.onSelectAscDescDistribution.bind(this)}>
            <option value="uniform">Равномерный</option>
            <option value="exponential">Экспоненциальный</option>
            <option value="normal">Нормальный</option>
          </Input>
          <h6>Выборка:</h6>
          <TextField ref="ascdesc_sample" />
          <h6>Серии:</h6>
          <TextField ref="ascdesc_series" />
          <h6>v(n) &gt; v:</h6>
          <TextField ref="ascdesc_vn_v" />
          <h6>t(n) &lt; t:</h6>
          <TextField ref="ascdesc_tn_t" />
          <TextField ref="ascdesc_summary" />
        </CardBody>
      </Card>
    )
  }

  onSelectMedianDistribution(e)
  {
    this.updateMedian(e.target.value);
    this.setState({ median_distribution: e.target.value });
  }

  onSelectAscDescDistribution(e)
  {
    this.updateMedian(e.target.value);
    this.setState({ ascdesc_distribution: e.target.value });
  }

  updateMedian(distribution)
  {
    let text = this.medianDistribution(distribution);
    this.refs.median_sample.setText(text.sample);
    this.refs.median_median.setText(text.median);
    this.refs.median_series.setText(text.series);
    this.refs.median_vn_v.setText(text.vn_v);
    this.refs.median_tn_t.setText(text.tn_t);
    this.refs.median_summary.setText(text.summary);
  }

  updateAscDesc(distribution)
  {
    let text = this.ascDescDistribution(distribution);
    this.refs.ascdesc_sample.setText(text.sample);
    this.refs.ascdesc_series.setText(text.series);
    this.refs.ascdesc_vn_v.setText(text.vn_v);
    this.refs.ascdesc_tn_t.setText(text.tn_t);
    this.refs.ascdesc_summary.setText(text.summary);
  }

  medianDistribution(distribution)
  {
    let sample = this.props.samples[distribution].sample;
    let metadata = RunsTest.median(sample);
    let summary = metadata.isRandom ?
      "Выборка случайная" :
      "Выборка не случайная";

    return {
      series: metadata.series.join(""),
      sample: sample.data.map(x => x.toFixed(2)).join(", "),
      median: sample.median().toFixed(2),
      vn: metadata.vn,
      tn: metadata.tn,
      v: metadata.v.toFixed(2),
      t: metadata.t.toFixed(2),
      vn_v: metadata.vn + " > " + metadata.v.toFixed(2),
      tn_t: metadata.tn + " < " + metadata.t.toFixed(2),
      summary: summary
    };
  }

  ascDescDistribution(distribution)
  {
    let sample = this.props.samples[distribution].sample;
    let metadata = RunsTest.ascDesc(sample);
    let summary = metadata.isRandom ?
      "Выборка случайная" :
      "Выборка не случайная";

    return {
      series: metadata.series.join(""),
      sample: sample.data.map(x => x.toFixed(2)).join(", "),
      vn: metadata.vn,
      tn: metadata.tn,
      v: metadata.v.toFixed(2),
      t: metadata.t.toFixed(2),
      vn_v: metadata.vn + " > " + metadata.v.toFixed(2),
      tn_t: metadata.tn + " < " + metadata.t.toFixed(2),
      summary: summary
    };
  }
}
