import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { ApolloConsumer } from 'react-apollo';
import  { gql } from 'apollo-boost'

export default class Getjoke extends Component {
    state = { joke: ""}

    onJokeFetched = joke => this.setState( () => ({joke}))

    render() {
        console.log(this.state)
        return (
            <ApolloConsumer>
                {client => (
                    <div>
                        {/*{this.state.joke && <img src={this.state.joke.icon_url} />}*/}
                        <button
                            onClick={async () => {
                                const { data } = await client.query({
                                    query: JOKE_QUERY,
                                });
                                this.onJokeFetched(data.getJoke)
                                return (
                                    <div>
                                        img src={data.icon_url} />
                                    </div>

                                );
                            }}
                        >
                            Click me!
                        </button>

                    </div>
                )}
            </ApolloConsumer>

        )
    }
}

export const JOKE_QUERY = gql`
    {
        getJoke {
            icon_url
            value
        }

    }
`
