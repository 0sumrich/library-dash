import React, { useState } from 'react'
import Plot from 'react-plotly.js';

// data={this.state.data}
// layout={this.state.layout}
// frames={this.state.frames}
// config={this.state.config}
// onInitialized={(figure) => this.setState(figure)}
// onUpdate={(figure) => this.setState(figure)}

function ChartWrapper({data, layout}) {
    const [chartData, setChartData] = useState(data)
    const [chartLayout, setChartLayout] = useState(layout)
    const [figure, setFigure] = useState(null)
    const [config, setConfig] = useState({
        scrollZoom: true
    })
    return (
        <Plot
            data={chartData}
            layout={chartLayout}
            config={config}
            onInitialized={(fig) => setFigure(fig)}
            onUpdate={(fig) => setFigure(fig)}
        />
    );
}

export default ChartWrapper
