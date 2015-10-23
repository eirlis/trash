import React from "react";


export default class CardTitle extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let titleStyle = {
      height: "2em",
      lineHeight: "2em",
      fontSize: "1.6em",
      padding: "0 1.3em"
    };

    return(
      <div style={titleStyle}>{this.props.children}</div>
    )
  }
}
