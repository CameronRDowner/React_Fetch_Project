import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ItemList = () => {
    const [items, setItems] = useState({});

    const endpointUrl = "https://fetch-hiring.s3.amazonaws.com/hiring.json"

    const getItems = () => {
        return axios.get(endpointUrl);
    }

    const filterAndSortItems = (items: Item[]) => {
       return  items.filter(item => item.name)
                    .sort((itemA, itemB) => (itemA.listId > itemB.listId) ? 1 : -1)
                    .sort((itemA, itemB) => (itemA.name > itemB.name) ? 1 : -1)
    }

    useEffect(() => {
        getItems().then((res) => {
            setItems(filterAndSortItems(res.data.body.items))
        })
    }, [])


    return (
        <ul>

        </ul>
    )
}
