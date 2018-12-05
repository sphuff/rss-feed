import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.scss'

export default class FeedList extends Component {
    render() {
        const { feeds } = this.props
        
        if (feeds.length === 0) {
            return (
                <h4>You do not have any feeds yet!</h4>
            )
        }
        const feedDOM = feeds.map(feed => {
            const { feedName, entryNum, selectFeed, removeFeed, isSelected } = feed
            return (
                <li key={`${feedName}-container`} className={ classNames('feed-container', {'selected' : isSelected }) } onClick={ () => selectFeed(feedName) }>
                    <button className='feed-remove-btn' onClick={ (ev) => { 
                        ev.stopPropagation()
                        removeFeed(feedName) 
                    } }>X</button>
                    <h5 key={feedName} className='feed-name'>{ feedName }</h5>
                    <h5 key={`${feedName}-length`} className='feed-count'>{ entryNum }</h5>
                </li>
            )
        })
        return (
            <ul id='feed-list'>
                <h4 id='feed-list-header'>Feeds:</h4>
                { feedDOM }
            </ul>
        )
    }
}

FeedList.propTypes = {
    feeds: PropTypes.array,
}