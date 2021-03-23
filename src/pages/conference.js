import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from "../components/header"
import SideNav from '../components/sideNav'
import Grid from '@material-ui/core/Grid';
import ContentWrapper from '../components/contentWrapper'
import { writeConferenceFigures } from '../helper/writeFigures'
import loansByItemType from '../data/monthly_loans_by_item_type.json'
import loansBySite from '../data/monthly_loans_by_site.json'
import selectAndCollectUsers from '../data/weekly_select_and_collect_users.json'
import onlineEvents from '../data/online_events.json'
import makeID from '../helper/makeId';

const Side = ({ children }) => <Grid item md={2} sm={false} xs={false}>{children}</Grid>
const Main = ({ children }) => <Grid item md={10} sm={12} xs={12}>{children}</Grid>

function ConferencePage() {
  const csvData = useStaticQuery(graphql`
  {
    allSocialMediaCsv {
      nodes {
        Week_commencing
        Facebook_Engagements
        Twitter_Engagements
      }
    }
    allYtVideosCsv {
      nodes {
        date
        publishedAt
        title
        viewCount
        age
      }
    }
    allFbVidsCsv {
      nodes {
        title
        views
        description
        created_time
      }
    }
  }
  `)
  const jsonData = {
    'Loans by item type': loansByItemType,
    'Loans by site': loansBySite,
    'Select and collect weekly users': selectAndCollectUsers,
    'Online events': onlineEvents
  }
  const figures = writeConferenceFigures(csvData, jsonData)
  const titles = figures.map(o => typeof (o.layout.title) === 'string' ? o.layout.title : o.layout.title.text)
  return (
    <Grid container>
      <Side><SideNav titles={titles} /></Side>
      <Main>
        <Header siteTitle='Barnet Libraries' subTitle='2020-21' />
        <ContentWrapper figures={figures} />
      </Main>
    </Grid>
  )
}

export default ConferencePage
