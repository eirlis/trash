import React from "react";


export default class CardBody extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let bodyStyle = {
      padding: "1em",
      boxSizing: "border-box"
    };
    return(
      <div style={bodyStyle}>{this.props.children}</div>
    )
  }
}
