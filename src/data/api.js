import xml2js from 'xml2js'

function parseXML(xmlString) {
    const parser = new xml2js.Parser({explicitArray: false, mergeAttrs: true})
    return new Promise((resolve, reject) => {
        parser.parseString(xmlString, (err, parsedXML) => {
            if (err) reject(err)
            resolve(parsedXML[Object.keys(parsedXML)[0]])
        })
    })
}

function parseEntries(xml) {
    const entries = xml.item || xml.entry
    return entries.map(entry => {
        if (entry.link && entry.link.href)
            entry.link = entry.link.href
        return entry
    })
}
function getRssEntriesFromURL(url) {
    let feedTitle
    return fetch(url)
        .then(res => res.text())
        .then(unparsedXML => parseXML(unparsedXML))
        .then(parsedXML => parsedXML.channel ? parsedXML.channel : parsedXML)
        .then(parsedXML => {
            feedTitle = parsedXML.title
            return parsedXML
        })
        .then(newEntries => parseEntries(newEntries))
        .then(newEntries =>  ({ [feedTitle] : newEntries }))
        .catch(err => console.log('ERR: ', err))
}

export { getRssEntriesFromURL }