import React, { Component } from 'react'

// the cards to display the fetched information on
import PeopleCard from './PeopleCard'
import FilmsCard from './FilmsCard'

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

    // Query for people
    let PeoplesPromise = fetch('https://cors-anywhere.herokuapp.com/https://swapi.co/api/people')
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
        return FetchedData
      })

    // Query for films
    let filmsPromise = fetch('https://cors-anywhere.herokuapp.com/https://swapi.co/api/films')
      .then(response => response.json())
      .then(json => {
        // manipulate the data
        let FetchedData = json.results.map((film) => {
          return (
            <Col sm="auto" key={uuidv4()}>
              <FilmsCard results={film} />
            </Col>
          )
        })
        return FetchedData
      })

    // combine the two promises into one
    Promise.all([PeoplesPromise, filmsPromise])
      .then(results => {
        results = { "people": results[0], "films": results[1] };
        this.setState({ FetchedData: results, Loading: false });
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

            {/* Check whether the payload has people */}
            {FetchedData.people ? <React.Fragment>
              <h3 className='text-center pb-3 text-success'>
                <u>
                  People
              </u>
              </h3>
              <Row>
                {FetchedData.people}
              </Row>
            </React.Fragment> : <> </>}

            {/* Check whether the payload has films */}
            {FetchedData.films ? <React.Fragment>
              <h3 className='text-center pb-3 text-success'>
                <u>
                  Films
              </u>
              </h3>
              <Row>
                {FetchedData.films}
              </Row>
            </React.Fragment> : <> </>}

          </Container>
            : <> </>}
        </Container>
      </div >
    )
  }
}