import React from 'react'
import ChartWrapper from './chartWrapper'

function ContentWrapper({ figures }) {
    return (
        <>
            {figures.map(fig => <ChartWrapper key={fig.layout.title.replace(' ', '-').toLowerCase()} data={fig.data} layout={fig.layout} />)}
        </>
    )
}

export default ContentWrapper