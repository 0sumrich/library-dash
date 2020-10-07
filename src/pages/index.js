import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from "../components/header"
import SideNav from '../components/sideNav'
import Grid from '@material-ui/core/Grid';
import ContentWrapper from '../components/contentWrapper'
import writeFigures from '../helper/writeFigures'

const Side = ({ children }) => <Grid item md={2} sm={false} xs={false}>{children}</Grid>
const Main = ({ children }) => <Grid item md={10} sm={12} xs={12}>{children}</Grid>

function IndexPage() {
  const data = useStaticQuery(graphql`
  {
    allBorrowersCsv {
      nodes {
        Current_borrowers__at_this_date_
        field1
        New_borrowers_during_this_week
      }
    }
    allEloansCsv {
      nodes {
        Week_commencing
        eaudio
        ebooks
        emags_news
      }
    }
    allEusersCsv {
      nodes {
        Week_commencing
        RBDigital
        Pressreader
        Overdrive
        Bolinda
      }
    }
    allIssuesRenewalsCsv {
      nodes {
        Week_Commencing
        Total
        Renewals
        Loans
      }
    }
    allPrismCsv {
      nodes {
        Week_commencing
        Page_Views
      }
    }
    allSocialMediaCsv {
      nodes {
        Week_commencing
        Facebook_Engagements
        Twitter_Engagements
      }
    }
    allWebsiteCsv {
      nodes {
        Week_commencing
        Page_Views
      }
    }
    allYtVideosCsv {
      nodes {
        date
        publishedAt
        title
        viewCount
      }
    }
  }
  `)
  const figures = writeFigures(data)
  return (
    <Grid container>
      <Side><SideNav titles={figures.map(o => o.layout.title)} /></Side>
      <Main>
        <Header siteTitle='Barnet Libraries' subTitle='KPIs' />
        <ContentWrapper figures={figures} />
      </Main>

    </Grid>
  )
}

export default IndexPage
