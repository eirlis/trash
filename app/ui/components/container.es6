import React from "react";


export default class Container extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="container" style={this.props.style}>{this.props.children}</div>
    )
  }
}
