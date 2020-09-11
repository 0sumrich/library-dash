import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Plot from 'react-plotly.js';

// data={this.state.data}
// layout={this.state.layout}
// frames={this.state.frames}
// config={this.state.config}
// onInitialized={(figure) => this.setState(figure)}
// onUpdate={(figure) => this.setState(figure)}

const useStyles = makeStyles(theme => ({
    root: {
        margin: `${theme.spacing(2)}px auto`,
    },
    cardHelper: {
        padding: theme.spacing(3)
    },
    plot: {
        width: '100%',
        height: '100%',
    }
}));

function ChartWrapper({ data, layout, id }) {
    const classes = useStyles()
    const [chartData, setChartData] = useState(data)
    const [chartLayout, setChartLayout] = useState(layout)
    const [figure, setFigure] = useState(null)
    const [config, setConfig] = useState({
        scrollZoom: true,
        responsive: true
    })
    return (
        <section id={id}>
            <Card className={classes.root}>
                <CardContent className={classes.cardHelper}>
                    <Plot
                        className={classes.plot}
                        data={chartData}
                        layout={chartLayout}
                        config={config}
                        onInitialized={(fig) => setFigure(fig)}
                        onUpdate={(fig) => setFigure(fig)}
                    />
                </CardContent>
            </Card>
        </section>
    );
}

export default ChartWrapper
