import React from "react";


export default class CardMedia extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let mediaStyle = {
      height: this.props.height
    };

    return (
      <div style={mediaStyle}>{this.props.children}</div>
    )
  }
}

CardMedia.defaultProps = {
  height: "500px"
};
