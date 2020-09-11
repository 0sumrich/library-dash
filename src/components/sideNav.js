import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeId from '../helper/makeId'
import Scrollspy from 'react-scrollspy'

const useStyles = makeStyles(theme => {
  return {
    root: {
      position: 'fixed',
      overflow: 'hidden'
    },
    link: {
      color: theme.palette.text.primary
    }
  }
});

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

function SideNav({ titles }) {
  const classes = useStyles()
  const ids = titles.map(o => makeId(o))
  return (
    <Scrollspy items={ids} currentClassName="is-current">
      {titles.map((title, i) => <ListItemLink href={`#${ids[i]}`}><ListItemText className={classes.link} primary={title}></ListItemText></ListItemLink>)}
    </Scrollspy >
  )
}

export default SideNav