import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export const ItemList = () => {
    const [itemsByList, setItemsByList] = useState({});
    const [listSelected, setListSelected] = useState(null);
    const [listOptions, setListOptions] = useState(null);

    const endpointUrl = "https://fetch-hiring.s3.amazonaws.com/hiring.json"

    const getItems = () => {
        return axios.get(endpointUrl);
    }

    const groupItemsByListId = (items: Item[]) => {
        const _itemsByList: { [name: string] : Item[]} = {};
        items.forEach(item => {
            if(_itemsByList[`${item.listId}`]){
                _itemsByList[`${item.listId}`].push(item)
            }
            else{
                _itemsByList[`${item.listId}`] = [item]
            }
        });
        return _itemsByList;
    }

    const sortItemsByName = (items: Item[]) => {
        return items.sort((itemA, itemB) => (itemA.name > itemB.name) ? 1 : -1);
    }

    const filterNamedItems = (items: Item[]) => {
        return items.filter((item: Item) => { return item.name })
    }

    const handleSelectChange = (event: any) => {
        setListSelected(event.target.value)
    }

    useEffect(() => {
        getItems().then((res) => {
            setItemsByList(groupItemsByListId(filterNamedItems(res.data)))
            setListOptions(Object.keys(itemsByList).map(list => { return {value: list} }))
        })
    }, [])


    return (
        <>
        <Select options={Object.keys(itemsByList)} onChange={handleSelectChange}>
            <option></option>
        </Select>
        <ul>

        </ul>
        </>
    )
}
