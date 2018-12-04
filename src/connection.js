'use strict'

class Connection {
  constructor(props) {
    super(props)
    
    this.from = props.from || null
    this.to = props.to || null
    this.weight = props.weight || null
  }
}

module.exports = Connection