
import React from 'react'

// Bootstrap things
import Card from 'react-bootstrap/Card'

const FilmsCard = (props) => {
    return (
        <Card style={{ width: '21rem' }} className='mb-3 border-primary'>
            <Card.Body>
                <Card.Title className='mb-5'>{props.results.title}</Card.Title>

                <Card.Title><u>Movie Info</u></Card.Title>
                <Card.Text> Released: {props.results.releaseDate}</Card.Text>
                <Card.Text> Director: {props.results.director}</Card.Text>
                <Card.Text>Producers: {props.results.producers}</Card.Text>

                <Card.Title className='mt-5'><u>Opening Crawl</u></Card.Title>
                <Card.Text>
                    {props.results.openingCrawl}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default FilmsCard