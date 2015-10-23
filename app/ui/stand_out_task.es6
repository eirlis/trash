import React from "react";
import Card from "./components/card";
import CardTitle from "./components/card_title";


export default class StandOutTask extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return(
      <Card>
        <CardTitle>Резко-выделяющиеся наблюдения</CardTitle>
      </Card>
    )
  }
}
