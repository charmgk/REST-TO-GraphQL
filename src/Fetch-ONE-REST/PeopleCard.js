import React from 'react'

// Bootstrap card
import Card from 'react-bootstrap/Card'

// react functional component that takes props as an argument
const PeopleCard = (props) => {
    return (
        <Card style={{ width: '21rem' }} className='mb-3 border-primary'>
            <Card.Body>
                <Card.Title className='mb-5'>{props.results.name}</Card.Title>

                <Card.Title><u>Bio Data</u></Card.Title>
                <Card.Text> Name: {props.results.name}</Card.Text>
                <Card.Text> Birth Year: {props.results.birth_year}</Card.Text>
                <Card.Text> Gender: {props.results.gender}</Card.Text>
                <Card.Text> Skin Color: {props.results.skin_color}</Card.Text>
                <Card.Text> Height: {props.results.height}</Card.Text>
                <Card.Text> Mass: {props.results.mass}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PeopleCard