import React from "react";
import Highcharts from "react-highcharts/dist/bundle/highcharts";


//
// Histogram
//
// <Histogram data=[] categories=[] />
//
export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
  }

  update(props) {
    let chart = this.refs.chart.getChart();

    if ("data" in props) { chart.series[0].setData(props.data, true, true); }
    if ("categories" in props) { chart.xAxis[0].setCategories(props.categories, false); }
  }

  render() {
    let config = {
      chart: {
        type: "column"
      },
      title: {
        text: this.props.title
      },
      xAxis: {
        categories: this.props.labels,
        title: {
          text: this.props.xTitle
        }
      },
      yAxis: {
        title: {
          text: this.props.yTitle
        }
      },
      series: [{
        name: this.props.name,
        data: this.props.data
      }]
    };
    return (
      <Highcharts ref="chart" config={config}></Highcharts>
    );
  }
}


Histogram.defaultProps = {
  title: "",
  name: "",
  data: [],
  labels: [],
  xTitle: "",
  yTitle: ""
};
