import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

export default class Search extends Component {
    constructor() {
        super()
        this.state = { url: ''}
    }
    handleChange(ev) {
        this.setState({
            url: ev.target.value
        })
    }
    handleSubmit(ev) {
        ev.preventDefault()
        this.props.addSiteToRssFeed(this.state.url)
    }
    render() {
        const { url } = this.state
        return (
            <form id='search-form' onSubmit={ this.handleSubmit.bind(this) }>
                <input id="siteInput" value={ url } type="text" placeholder="RSS feed URL" onChange={ this.handleChange.bind(this) }></input>
                <button type="submit">Add Feed</button>
            </form>
        )
    }
}

Search.propTypes = {
    addSiteToRssFeed: PropTypes.func,
    test: PropTypes.string,
}