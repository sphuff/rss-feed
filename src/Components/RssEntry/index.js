import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

export default class RssEntry extends Component {
    render() {
        const { title, link, description } = this.props
        return (
            <a className='rss-entry' key={title} href={link}>
                <h3>{ title }</h3>
                { description && <p dangerouslySetInnerHTML={{__html: description}}></p> }
            </a>
        )
    }
}

RssEntry.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
}