import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import Header from "../components/header"
import Grid from '@material-ui/core/Grid';
import camelToSpace from '../helper/camelToSpace'
import ChartWrapper from '../components/chartWrapper'

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
        RBdigital
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
const names = Object.keys(data).map(o => <p>{camelToSpace(o.slice(3, -3))}</p>)
  return (
    <Grid container>
      <Side>{names}</Side>
      <Main>
        <Header siteTitle='Barnet Libraries' subTitle='KPIs' />
        <ChartWrapper data={data} />        
      </Main>

    </Grid>
  )
}

export default IndexPage
