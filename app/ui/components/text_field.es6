import React from "react";
import { Input } from "react-bootstrap";


export default class TextField extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  onChange(e)
  {
    this.setState({ text: e.target.value });
  }

  getText()
  {
    return this.state.text;
  }

  setText(text)
  {
    this.setState({ text: text });
  }

  render()
  {
    return (
      <Input type="text" value={this.state.text} onChange={this.onChange.bind(this)} />
    );
  }
}

TextField.defaultProps = {
  text: ""
};
