import React, { Component } from 'react'
import Card from './Card'
import axios from 'axios'
import './Deck.css'


const API_BASE_URL = "https://deckofcardsapi.com/api/deck"

export default class Deck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deck: null,
            drawn: []
        }
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
        this.setState({ deck: deck.data })
    }

    async getCard() {
        // make request using deck id
        // set state using new card info from api
        // "https://deckofcardsapi.com/api/deck/${deck_id}/draw/."

        try{
            let id = this.state.deck.deck_id
            let cardUrl = `${API_BASE_URL}/${id}/draw/`
            let cardRes = await axios.get(cardUrl)
            console.log(cardRes.data)

            if(!cardRes.data.success){
                throw new Error("No cards remaining!!!")
            }

            let card = cardRes.data.cards[0]
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))
        } catch(err){
            alert(err)
        }
    }

    render() {
        const cards = this.state.drawn.map(c => (
            <Card name={c.name} image={c.image} key={c.id}/>
        ))
        return (
            <div>
                <h1>CARD SCHTANZER</h1>
                <button onClick={this.getCard}>Get Card!</button>
                <div className="Deck-cardarea"> 
                    {cards}
                </div>
            </div>
        )
    }
}
