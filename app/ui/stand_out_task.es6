import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";
import CardMedia from "./components/card_media";
import CardBody from "./components/card_body";
import Scatter from "./components/scatter";
import { Button, Modal } from "react-bootstrap";
import getStandOutElement from "../stat/stand_out";
import Sample from "../stat/sample";


function copySample(sample)
{
  let data = sample.data.slice(0);
  return new Sample(data);
}


export default class StandOutTask extends React.Component
{
  constructor(props)
  {
    super(props);

    this.standOutElement = null;
  }

  componentDidMount()
  {
    this.update();
  }

  update()
  {
    let sample = this.props.samples.normal.sample;
    this.sample = copySample(sample);
    this.standOutElement = null;
    this.updateScatter(this.sample);
  }

  updateScatter(sample)
  {
    this.refs.scatter.update(sample.scatter());
    this.refs.scatter.updateYLines([{ value: sample.mean(), width: 2, color: '#ff0000' }]);
  }

  render()
  {
    return(
      <Card>
        <CardTitle>Резко-выделяющиеся наблюдения</CardTitle>
        <CardMedia height="400px">
          <Scatter ref="scatter" />
        </CardMedia>
        <CardBody>
          <Button onClick={this.onNext.bind(this)}>Шаг</Button>
        </CardBody>
      </Card>
    )
  }

  onNext()
  {
    if (this.standOutElement != null)
    {
      this.refs.scatter.hideTooltip
      this.sample.data.splice(this.standOutElement, 1);
      this.standOutElement = null;
      this.updateScatter(this.sample);
    }

    let element = getStandOutElement(this.sample);
    if (element)
    {
      this.standOutElement = element.index;
      this.refs.scatter.tooltipAt(element.index);
    }
  }
}
