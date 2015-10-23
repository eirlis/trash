import React from "react";


export default class CardBody extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let actionsStyle = {
      marginTop: "1.8em"
    };
    return(
      <div style={actionsStyle}>{this.props.children}</div>
    )
  }
}
