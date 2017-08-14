import React, { PureComponent } from 'react'
import { array } from 'prop-types'
import PieChart from 'react-chartjs/lib/pie'

import './VoteStat.css'

const colors = {
  blue: 'rgb(54, 162, 235)',
  green: 'rgb(75, 192, 192)',
  orange: 'rgb(255, 159, 64)',
  purple: 'rgb(153, 102, 255)',
  red: 'rgb(255, 99, 132)',
  yellow: 'rgb(255, 205, 86)',
  grey: 'rgb(201, 203, 207)',
}
const legendTemplate = '<ul><% for (var i=0; i<segments.length; i++){%><li><span style="background-color: <%=segments[i].fillColor%>"></span><span><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'

class VoteStat extends PureComponent {
  static propTypes = {
    options: array,
  }

  static defaultProps = {
    options: [],
  }

  state = {
    chartLegend: '',
  }

  componentDidUpdate() {
    const chartLegend = this.pieChart && this.pieChart.generateLegend()

    this.setState({ // eslint-disable-line
      chartLegend,
    })
  }

  render() {
    const { options } = this.props
    const colorNames = Object.keys(colors)
    const chartData = options.map((option, index) => ({
      label: option.text,
      value: option.number,
      color: colors[colorNames[index % colorNames.length]],
    }))
    const hasValidData = options.some(option => option.num)

    return hasValidData && (
      <div className="vote-stat">
        <PieChart
          ref={pieChart => {
            this.pieChart = pieChart
          }}
          data={chartData}
          options={{
            legendTemplate,
          }}
        />
        <div
          className="vote-stat__legend"
          dangerouslySetInnerHTML={{ __html: this.state.chartLegend }} // eslint-disable-line
        />
      </div>
    )
  }
}

export default VoteStat
