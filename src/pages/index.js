import React from "react"
import Header from "../components/header"
import SideNav from "../components/sideNav"
import Grid from "@material-ui/core/Grid"
import ContentWrapper from "../components/contentWrapper"
import { writeFigures } from "../helper/writeFigures"

import eloans from "../data/eloans.json"
import events from "../data/events.json"
import loansByLib from "../data/loans_by_library.json"
import loansByType from "../data/loans_by_type.json"
import newBorrowers from "../data/new_borrowers.json"
import prism from "../data/prism.json"
import socialMedia from "../data/social_media.json"
import visitorsByLib from "../data/visitors_by_library.json"
import visitorsByType from "../data/visitors_by_type.json"
import youtube from "../data/youtube.json"

const Side = ({ children }) => (
  <Grid item md={2} sm={false} xs={false}>
    {children}
  </Grid>
)
const Main = ({ children }) => (
  <Grid item md={10} sm={12} xs={12}>
    {children}
  </Grid>
)

function IndexPage() {
  const jsonData = {
    "Loans by library": loansByLib,
    "Loans by type": loansByType,
    eloans: eloans,
    "New borrowers": newBorrowers,
    "Visitors by library": visitorsByLib,
    "Visitors by type": visitorsByType,
    Events: events,
    Prism: prism,
    "Social media": socialMedia,
    Youtube: youtube,
  }
  const figures = writeFigures(jsonData)
  const titles = figures.map(o =>
    typeof o.layout.title === "string" ? o.layout.title : o.layout.title.text
  )
  return (
    <Grid container>
      <Side>
        <SideNav titles={titles} />
      </Side>
      <Main>
        <Header siteTitle="Barnet Libraries" subTitle="KPIs" />
        <ContentWrapper figures={figures} />
      </Main>
    </Grid>
  )
}

export default IndexPage
