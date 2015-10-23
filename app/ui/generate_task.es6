import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";
import CardMedia from "./components/card_media";
import CardBody from "./components/card_body";
import CardActions from "./components/card_actions";
import Histogram from "./components/histogram";
import { Input, Button } from "react-bootstrap";
import UniformDistribution from "../stat/uniform_distribution";
import ExponentialDistrubtion from "../stat/exponential_distribution";
import NormalDistribution from "../stat/normal_distribution";


export default class GenerateTask extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      distribution: "uniform"
    };
  }

  renderOptionsForUniform()
  {
    return (
      <div>
        <Input ref="uniform_start" type="text" key="uniform_start" defaultValue="0" placeholder="Левая граница" />
        <Input ref="uniform_end" type="text" key="uniform_end" defaultValue="1" placeholder="Правая граница" />
      </div>
    );
  }

  renderOptionsForExponential()
  {
    return (
      <div>
        <Input ref="exponential_lambda" key="exponential_lambda" type="text" defaultValue="1" placeholder="Лямбда" />
      </div>
    );
  }

  renderOptionsForNormal()
  {
    return (
      <div>
        <Input ref="normal_mean" type="text" key="normal_mean" defaultValue="0" placeholder="Математическое ожидание" />
        <Input ref="normal_std" type="text" key="normal_std" defaultValue="1" placeholder="Среднеквадратическое отклонение" />
      </div>
    );
  }

  renderOptions()
  {
    switch (this.state.distribution)
    {
      case "uniform":
        return this.renderOptionsForUniform();
      case "exponential":
        return this.renderOptionsForExponential();
      case "normal":
        return this.renderOptionsForNormal();
    }
  }

  getBins()
  {
    let distribution = null;
    let size = parseFloat(this.refs.size.getValue());

    if (this.state.distribution == "uniform")
    {
      let start = parseFloat(this.refs.uniform_start.getValue());
      let end = parseFloat(this.refs.uniform_end.getValue());
      distribution = new UniformDistribution(start, end);
    }
    else if (this.state.distribution == "exponential")
    {
      let lambda = parseFloat(this.refs.exponential_lambda.getValue());
      distribution = new ExponentialDistrubtion(lambda);
    }
    else
    {
      let mean = parseFloat(this.refs.normal_mean.getValue());
      let std = parseFloat(this.refs.normal_std.getValue());
      distribution = new NormalDistribution(mean, std);
    }

    let bins = distribution.generate(size)
      .histogram();
    let frequencies = bins.map(x => x.frequency);
    let categories = [];

    return {
      frequencies: frequencies,
      categories: categories
    };
  }

  componentDidMount()
  {
    this.setState(this.getBins());
  }

  render()
  {
    let options = this.renderOptions();

    return (
      <Card>
        <CardTitle>Сгенерировать выборку</CardTitle>
        <CardMedia height="400px">
          <Histogram ref="histogram" data={this.state.frequencies} categories={this.state.categories} />
        </CardMedia>
        <CardBody>
          <Input type="select" onChange={this.onSelectDistribution.bind(this)}>
            <option value="uniform">Равномерный</option>
            <option value="exponential">Экспоненциальный</option>
            <option value="normal">Нормальный</option>
          </Input>
          {options}
          <Input ref="size" type="text" defaultValue="100" placeholder="Количество элементов выборки" />
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

  onGenerate()
  {
    this.setState(this.getBins());
  }
}
