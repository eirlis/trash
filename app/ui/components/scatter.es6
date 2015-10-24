import React from "react";
import Highcharts from "react-highcharts/dist/bundle/highcharts";


export default class Scatter extends React.Component {
  constructor(props) {
    super(props);
  }

  update(data) {
    let chart = this.refs.chart.getChart();
    chart.series[0].setData(data, true, true);
  }

  updateXLines(lines) {
    let chart = this.refs.chart.getChart();
    let xLines = this._processLines(lines);
    chart.xAxis[0].update({ plotLines: xLines });
  }

  updateYLines(lines) {
    let chart = this.refs.chart.getChart();
    let yLines = this._processLines(lines);
    chart.yAxis[0].update({ plotLines: yLines });
  }

  tooltipAt(index) {
    let chart = this.refs.chart.getChart();
    chart.tooltip.refresh(chart.series[0].data[index]);
  }

  hideTooltip()
  {
    let chart = this.refs.chart.getChart();
    chart.tooltip.hide();
  }

  _processLines(lines) {
    return lines.map(x => {
      return {
        value: x.value,
        color: x.color || '#000000',
        width: x.width || 1,
        zIndex: x.z || 1,
        label: { text: x.label }
      }
    });
  }

  render() {
    let xLines = this._processLines(this.props.xLines);
    let yLines = this._processLines(this.props.yLines);

    let config = {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: this.props.title
      },
      subtitle: {
        text: this.props.subtitle
      },
      xAxis: {
        title: {
          enabled: true,
          text: this.props.xAxis
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: this.props.yAxis
        }
      },
      series: [{
        color: this.props.color,
        data: this.props.data
      }]
    };

    return (
      <Highcharts ref="chart" config={config}></Highcharts>
    );
  }
}


Scatter.defaultProps = {
  title: "",
  subtitle: "",
  xAxis: "",
  yAxis: "",
  color: "rgba(0, 0, 0, .5)",
  data: [],
  xLines: [],
  yLines: []
}
