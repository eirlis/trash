import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";
import CardMedia from "./components/card_media";
import CardBody from "./components/card_body";
import CardActions from "./components/card_actions";
import Histogram from "./components/histogram";
import { Input, Button } from "react-bootstrap";
import TextField from "./components/text_field";
import UniformDistribution from "../stat/uniform_distribution";
import ExponentialDistribution from "../stat/exponential_distribution";
import NormalDistribution from "../stat/normal_distribution";


function interval(bin, closed)
{
  return "[" + bin.start.toFixed(2) + ", " + bin.end.toFixed(2) + (closed ? "]" : ")");
}


function getBins(sample)
{
  let bins = sample.histogram();

  let frequencies = bins.map(x => x.frequency);
  let labels = bins.map((x, i) => interval(x, i == bins.length - 1));

  return {
    frequencies: frequencies,
    labels: labels
  };
}


export default class GenerateTask extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      distribution: "uniform"
    };
  }

  renderOptions()
  {
    switch (this.state.distribution)
    {
      case "uniform":
        return (
          <div>
            <h6>Начало:</h6>
            <TextField ref="uniform_start" key="uniform_start" text={this.props.samples.uniform.start} />
            <h6>Конец:</h6>
            <TextField ref="uniform_end" key="uniform_end" text={this.props.samples.uniform.end} />
            <h6>Размер выборки:</h6>
            <TextField ref="uniform_size" key="uniform_size" text={this.props.samples.uniform.size} />
          </div>
        );
      case "exponential":
        return (
          <div>
            <h6>Лямбда:</h6>
            <TextField ref="exponential_lambda" key="exponential_lambda" text={this.props.samples.exponential.lambda} />
            <h6>Размер выборки:</h6>
            <TextField ref="exponential_size" key="exponential_size" text={this.props.samples.exponential.size} />
          </div>
        );
      case "normal":
        return (
          <div>
            <h6>Мат. ожидание:</h6>
            <TextField ref="normal_mean" key="normal_mean" text={this.props.samples.normal.mean} />
            <h6>Среднеквадратическое отклонение:</h6>
            <TextField ref="normal_std" key="normal_std" text={this.props.samples.normal.std} />
            <h6>Размер выборки:</h6>
            <TextField ref="normal_size" key="normal_size" text={this.props.samples.normal.size} />
          </div>
        );
    }
  }

  render()
  {
    let { frequencies, labels } = getBins(this.props.samples[this.state.distribution].sample);
    let options = this.renderOptions();

    return (
      <Card>
        <CardTitle>Сгенерировать выборку</CardTitle>
        <CardMedia height="400px">
          <Histogram data={frequencies} labels={labels} />
        </CardMedia>
        <CardBody>
          <h6>Распределение:</h6>
          <Input type="select" onChange={this.onSelectDistribution.bind(this)}>
            <option value="uniform">Равномерный</option>
            <option value="exponential">Экспоненциальный</option>
            <option value="normal">Нормальный</option>
          </Input>
          {options}
          <CardActions>
              <Button bsStyle="info" onClick={this.onGenerate.bind(this)}>Сгенерировать</Button>
          </CardActions>
        </CardBody>
      </Card>
    )
  }

  onSelectDistribution(e)
  {
    this.setState({ distribution: e.target.value });
  }

  generateUniform()
  {
    let samples = this.props.samples;

    samples.uniform.start = parseFloat(this.refs.uniform_start.getText());
    samples.uniform.end = parseFloat(this.refs.uniform_end.getText());
    samples.uniform.size = parseFloat(this.refs.uniform_size.getText());
    samples.uniform.sample = new UniformDistribution(samples.uniform.start,
      samples.uniform.end).generate(samples.uniform.size);
  }

  generateExponential()
  {
    let samples = this.props.samples;

    samples.exponential.lambda = parseFloat(this.refs.exponential_lambda.getText());
    samples.exponential.size = parseFloat(this.refs.exponential_size.getText());
    samples.exponential.sample = new ExponentialDistribution(samples.exponential.lambda)
      .generate(samples.exponential.size);
  }

  generateNormal()
  {
    let samples = this.props.samples;

    samples.normal.mean = parseFloat(this.refs.normal_mean.getText());
    samples.normal.std = parseFloat(this.refs.normal_std.getText());
    samples.normal.size = parseFloat(this.refs.normal_size.getText());
    samples.normal.sample = new NormalDistribution(samples.normal.mean,
      samples.normal.std).generate(samples.normal.size);
  }

  onGenerate()
  {
    switch (this.state.distribution)
    {
      case "uniform":
        this.generateUniform();
        break;
      case "exponential":
        this.generateExponential();
        break;
      case "normal":
        this.generateNormal();
        break;
    }
    this.props.onNewSample();
    this.forceUpdate();
  }
}
