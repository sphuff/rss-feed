import React, { Component } from 'react'
import './main.scss'
import FeedList from './Components/FeedList'
import RssEntry from './Components/RssEntry'
import _ from 'lodash'
import Search from './Components/Search'
import { getRssEntriesFromURL } from './data/api'

class App extends Component {
    constructor() {
        super()
        this.state = {
            feeds: {},
            selectedFeeds: [],
        }
        this.selectFeed = this.selectFeed.bind(this)
        this.removeFeed = this.removeFeed.bind(this)
    }

    addSiteToRssFeed(url) {
        const { selectedFeeds, feeds } = this.state
        return getRssEntriesFromURL(url)
            .then(newFeed => {
                let feedTitle = Object.keys(newFeed)[0]
                this.setState({
                    feeds: { ...feeds, ...newFeed },
                    selectedFeeds: selectedFeeds.concat(feedTitle)
                })
            })
            .catch(err => { 
                console.log('ERR: ', err)
            })
    }

    selectFeed(feed) {
        const { selectedFeeds, feeds } = this.state
        if (selectedFeeds.length === 1 && selectedFeeds.includes(feed)) {
            this.setState({
                selectedFeeds: Object.keys(feeds)
            })
        } else {
            this.setState({
                selectedFeeds: [feed]
            })
        }
    }

    removeFeed(feed) {
        const { feeds, selectedFeeds } = this.state
        this.setState({
            feeds: _.omit(feeds, feed), 
            selectedFeeds: _.without(selectedFeeds, feed)
        })
    }

    render() {
        const { feeds, selectedFeeds } = this.state
        const entries = selectedFeeds.map(selectedFeed => {
            return feeds[selectedFeed].map(entry => 
                <RssEntry { ...entry }/>
            )
        })
        
        const feedListFeeds = _.map(feeds, (feedEntries, feedName) => {
            return { 
                feedName: feedName, 
                entryNum: feedEntries.length,
                isSelected: selectedFeeds.includes(feedName),
                selectFeed: (feed) => this.selectFeed(feed),
                removeFeed: (feed) =>  this.removeFeed(feed),
            }
        })
        return (
            <div id='app-container'>
                <header>
                    <h1>Feedable</h1>
                    <Search addSiteToRssFeed={ this.addSiteToRssFeed.bind(this) }/>
                </header>
                <div id='app-body'>
                    <FeedList feeds={ feedListFeeds } />
                    <div id='rss-entry-list-container'>
                        { entries }
                    </div>
                </div>
            </div>
        )
    }
}

export default App;