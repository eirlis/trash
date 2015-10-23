import React from "react";


export default class Card extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let cardStyle = {
      backgroundColor: "#ffffff",
      boxShadow: "0 0 1px #343434",
      width: "100%",
      minHeight: "100px",
      marginBottom: "1em",
      boxSizing: "border-box"
    };

    return (
      <div style={cardStyle}>
        {this.props.children}
      </div>
    )
  }
}
