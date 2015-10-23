import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";


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
        <CardTitle>Критерий серий</CardTitle>
      </Card>
    )
  }
}
