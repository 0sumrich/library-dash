import moment from 'moment';

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

function eusers(data) {
    const d = data.filter(o => moment(o['Week_commencing']).isSameOrAfter('2020-01-01'))
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

function socialMedia(data) {
    const d = data.filter(o => o['Facebook_Engagements'] !== '' && o['Twitter_Engagements'] !== '')
    const x = d.map(o => o['Week_commencing'])
    const trace = (x, y, name) => ({ x, y, name, type: 'bar' })
    return [
        trace(x, d.map(o => o['Facebook_Engagements']), 'Facebook'),
        trace(x, d.map(o => o['Twitter_Engagements']), 'Twitter')
    ]
}

function website(data) {
    const x = data.map(o => o['Week_commencing'])
    const y = data.map(o => o['Page_Views'])
    return [timeSeries(x, y)]
}

function youtube(data) {
    const trace = o => ({
        type: 'scatter',
        mode: 'markers',
        x: [o.publishedAt],
        y: [o.viewCount],
        name: o.title,
        text: [o.title, o.viewCount],
        showlegend: false
    })
    return data.map(o => trace(o))
}

function writeFigures(data) {

    return [
        { data: cb(data['allBorrowersCsv'].nodes), layout: { title: 'Current borrowers' } },
        { data: nb(data['allBorrowersCsv'].nodes.slice(0, -1)), layout: { title: 'New borrowers' } },
        { data: eloans(data['allEloansCsv'].nodes), layout: { title: 'eloans' } },
        { data: eusers(data['allEusersCsv'].nodes), layout: { title: 'eusers' } },
        { data: issuesRenewals(data['allIssuesRenewalsCsv'].nodes), layout: { title: 'Issues and renewals' } },
        { data: socialMedia(data['allSocialMediaCsv'].nodes), layout: { title: 'Social media', barmode: 'group', xaxis: { title: "Week commencing" }, yaxis: { title: 'Engagements' } } },
        { data: website(data['allPrismCsv'].nodes), layout: { title: 'Prism', xaxis: { title: "Week commencing" }, yaxis: { title: 'Page views' } } },
        { data: website(data['allWebsiteCsv'].nodes), layout: { title: 'Council website', xaxis: { title: "Week commencing" }, yaxis: { title: 'Page views' } } },
        { data: youtube(data['allYtVideosCsv'].nodes), layout: { title: 'Youtube Videos', hovermode: 'closest', xaxis: { title: 'Date published' }, yaxis: { title: 'Number of views' } } }
    ]
}

export default writeFigures