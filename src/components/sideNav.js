import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeId from '../helper/makeId'
import Scrollspy from 'react-scrollspy'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SideNav({ titles }) {
    const ids = titles.map(o => makeId(o))
    return (
        <List>
            <Scrollspy items={ids} currentClassName="is-current">
                {titles.map((title, i) => <ListItemLink href={`#${ids[i]}`}><ListItemText primary={title}></ListItemText></ListItemLink>)}
            </Scrollspy>
        </List >
    )
}

export default SideNav