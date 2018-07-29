import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { Query } from 'react-apollo'
import  { gql } from 'apollo-boost'
import Getjoke from "./Getjoke";

export default class Newfetch extends Component {
    render() {

        return (
            <div>
                <Query
                    query={JOKE_QUERY}
                >
                    {({ loading, error, data, refetch }) => {
                        if (loading) return null;
                        if (error) return `Error!: ${error}`;

                        return (
                            <div>
                                <img
                                    src={data.getJoke.icon_url}
                                    style={{ height: 100, width: 100 }}
                                />
                                <h1>{data.getJoke.value}</h1>
                                <button onClick={() => refetch()}>Next Norris!</button>
                            </div>
                        );
                    }}
                </Query>

            </div>
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
