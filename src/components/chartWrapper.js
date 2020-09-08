import React, { useState } from 'react'
import Plot from 'react-plotly.js';

// data={this.state.data}
// layout={this.state.layout}
// frames={this.state.frames}
// config={this.state.config}
// onInitialized={(figure) => this.setState(figure)}
// onUpdate={(figure) => this.setState(figure)}

function ChartWrapper({ data }) {
    const [chartData, setChartData] = useState([
        {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
    ])
    const [layout, setLayout] = useState({ title: 'A Fancy Plot' })
    const [figure, setFigure] = useState(null)
    const [config, setConfig] = useState({
        scrollZoom: true
    })
    return (
        <Plot
            data={chartData}
            layout={layout}
            config={config}
            onInitialized={(fig) => setFigure(fig)}
            onUpdate={(fig) => setFigure(fig)}
        />
    );
}

export default ChartWrapper
