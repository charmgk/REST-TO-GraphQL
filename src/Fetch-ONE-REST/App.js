import React, { Component } from 'react'

// the card to display fetched information on
import PeopleCard from './PeopleCard'

// container to center everything
import Container from 'react-bootstrap/Container'

// Col to contain the card
import Col from 'react-bootstrap/Col'

// row to format the cards
import Row from 'react-bootstrap/Row'

// the button to click to start fetching
import Button from 'react-bootstrap/Button'

// spinner to indicate loading status
import Spinner from 'react-bootstrap/Spinner'

// uuid allocated unique keys to repeated data
const uuidv4 = require('uuid/v4');
export default class componentName extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Loading: false,
      FetchedData: null
    }
  }

  FetchData = () => {
    this.setState({ Loading: true })

    fetch('https://swapi.co/api/people')
      .then(response => response.json())
      .then(json => {
        // manipulate the data
        let FetchedData = json.results.map((person) => {
          return (
            <Col sm="auto" key={uuidv4()}>
              <PeopleCard results={person} />
            </Col>
          )
        })
        this.setState({ FetchedData: FetchedData, Loading: false })
      })
  }

  render() {
    const { Loading, FetchedData } = this.state;
    return (
      <div>
        {/* mother container */}
        <Container>
          {/* Button container */}
          <Container className='text-center pt-5'>
            <Button variant="outline-primary" onClick={this.FetchData}>Fetch People</Button>
          </Container>

          {/* Spinner container */}
          {Loading ?
            < Container className='text-center pt-5'>
              <Spinner animation="border" variant="primary" />
            </Container>
            : <> </>}

          {/* Data container */}
          {FetchedData ? <Container className='pt-5'>
            <h3 className='text-center pb-3 text-success'>
              <u>
                People
              </u>
            </h3>
            <Row>
              {FetchedData}
            </Row>
          </Container>
            : <> </>}
        </Container>
      </div >
    )
  }
}