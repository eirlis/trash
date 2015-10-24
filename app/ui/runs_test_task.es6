import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";
import CardBody from "./components/card_body";
import { Input, Button } from "react-bootstrap";
import UniformDistribution from "../stat/uniform_distribution";
import ExponentialDistribution from "../stat/exponential_distribution";
import NormalDistribution from "../stat/normal_distribution";
import RunsTest from "../stat/runs_test";


export default class RunsTestTask extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return(
      <Card>
        <CardTitle>Случайнойность выборки</CardTitle>
        <CardBody>
        </CardBody>
      </Card>
    )
  }
}
