import React from 'react'
import ChartWrapper from './chartWrapper'

function ContentWrapper({ figures }) {
    const keys = Object.keys(figures)
    return (
        <>
            {keys.map(title => <ChartWrapper key={title} data={figures[title]} title={title} />)}
        </>
    )
}

export default ContentWrapper