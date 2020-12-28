/**
 * For decode and encode multiple query,
 * connect by '&'
 */
class ParseQuery {
    constructor(query) {
        this.query = query
    }

    encode() {
        if (typeof(this.query) === 'string') {
            return this
        } else {
            this.query = this.query.join('&')
            return this
        }
    }

    decode() {
        if (Array.isArray(this.query)) {
            return this
        } else {
            this.query = this.query.split('&')
            return this
        }
    }

    output() {
        return this.query
    }
}

function parseQuery(query) {
    return new ParseQuery(query)
}

export default parseQuery;