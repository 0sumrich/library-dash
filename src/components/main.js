import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import mainQuery from '../helper/mainQuery'

export default function Main() {
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
const Check = ({data}) => <div>{Object.keys(data).map(o => <p>{o}</p>)}</div>
    return (
        <Check data={data} />
    )
}

