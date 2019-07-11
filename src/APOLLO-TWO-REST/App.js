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

// Apollo client setup
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

// This will be used to structure the query
import gql from 'graphql-tag';

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

    // setup your `RestLink` with your endpoint
    const restLink = new RestLink({ uri: "https://cors-anywhere.herokuapp.com/https://swapi.co/api/" });

    // setup your client
    const client = new ApolloClient({
      link: restLink,
      cache: new InMemoryCache(),
    });

    const query = gql`
    query swapiData {
      people @rest(type: "people", path: "people") {
        results
      }
      films @rest(type: "films", path: "films") {
        results
      }
    }
    `;

    // Invoke the query and manipulate the data

    client.query({ query }).then(response => {
      // loop over the peoples array to create card objects for each
      let PeoplesObject = response.data.people.results.map((person) => {
        return (
          <Col sm="auto" key={uuidv4()}>
            <PeopleCard results={person} />
          </Col>
        )
      })

      // loop over the films array to create card objects for each
      let FilmsObject = response.data.films.results.map((film) => {
        return (
          <Col sm="auto" key={uuidv4()}>
            <FilmsCard results={film} />
          </Col>
        )
      })

      // combine the created objects and send it to state
      let results = { "people": PeoplesObject, "films": FilmsObject };
      this.setState({ FetchedData: results, Loading: false });
    });

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