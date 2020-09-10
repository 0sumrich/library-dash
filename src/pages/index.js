import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from "../components/header"
import SideNav from '../components/sideNav'
import Grid from '@material-ui/core/Grid';
import ContentWrapper from '../components/contentWrapper'
import writeFigures from '../helper/writeFigures'

const Side = ({ children }) => <Grid item sm={2}>{children}</Grid>
const Main = ({ children }) => <Grid item sm={10}>{children}</Grid>

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
