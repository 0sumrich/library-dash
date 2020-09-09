const timeSeries = (x, y, name = undefined) =>
    name ?
        {
            type: 'scatter',
            mode: 'lines',
            x: x,
            y: y,
            name: name
        } :
        {
            type: 'scatter',
            mode: 'lines',
            x: x,
            y: y,
        }

// current borrowers
function cb(d) {
    // filter data first
    // Current_borrowers__at_this_date_ = COUNT
    // field1 = DATE
    const dateField = 'field1'
    const countField = 'Current_borrowers__at_this_date_'
    const data = d.filter(o => o[countField] !== '')
    return [
        timeSeries(
            data.map(o => o[dateField]),
            data.map(o => +o[countField])
        )
    ]
}

function nb(d) {
    // filter data first
    // Current_borrowers__at_this_date_ = COUNT
    // field1 = DATE
    const dateField = 'field1'
    const countField = 'New_borrowers_during_this_week'
    return [
        timeSeries(
            d.map(o => o[dateField]),
            d.map(o => +o[countField])
        )
    ]
}

function eloans(d) {
    return ['eaudio', 'ebooks', 'emags_news']
        .map(
            typ => timeSeries(
                d.map(o => o['Week_commencing']),
                d.map(o => o[typ]),
                typ
            )
        )
}

function eusers(d) {
    // 'Week_commencing',
    return [
        'RBDigital',
        'Pressreader',
        'Overdrive',
        'Bolinda'
    ].map(
        typ => timeSeries(
            d.map(o => o['Week_commencing']),
            d.map(o => o[typ]),
            typ
        )
    )
}

function issuesRenewals(d) {
    const x = d.map(o => o.Week_Commencing)
    const stackgroup = 'one'
    return [
        {
            y: d.map(o => o.Loans),
            name: 'Loans',
            x,
            stackgroup
        },
        {
            y: d.map(o => o.Renewals),
            name: 'Renewals',
            x,
            stackgroup
        },
    ]
}

function writeFigures(data) {
    return {
        'Current borrowers': cb(data['allBorrowersCsv'].nodes),
        'New borrowers': nb(data['allBorrowersCsv'].nodes.slice(0, -1)),
        'eloans': eloans(data['allEloansCsv'].nodes),
        'eusers': eusers(data['allEusersCsv'].nodes),
        'Issues and renewals': issuesRenewals(data['allIssuesRenewalsCsv'].nodes),
        // 'Social media': '',
        // 'Website': '',
        // 'Youtube': '',
        // 'Youtube scatter': ''
    }
}

export default writeFigures