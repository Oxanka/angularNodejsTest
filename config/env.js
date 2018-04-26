module.exports = {
    port: process.env.PORT || 9785,
    realm: process.env.REALM || 'http://localhost:9785/',
    url: 'http://localhost:3000',
    db: {
        URI: process.env.DBURI || 'mongodb://localhost:27017/test',
        retry: process.env.DBRETRY || 5
    }

}