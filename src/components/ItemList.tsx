import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select, { OptionTypeBase } from 'react-select'

export const ItemList = () => {
    const [itemsByList, setItemsByList] = useState<{[listId: string]: Item[]}>({});
    const [listSelected, setListSelected] = useState<OptionTypeBase>({});
    const [listOptions, setListOptions] = useState<OptionTypeBase[]>([]);

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

    const handleSelectChange = (option: OptionTypeBase) => {
        setListSelected(option)
    }

    useEffect(() => {
        getItems().then((res) => {
            setItemsByList(groupItemsByListId(filterNamedItems(res.data)))
            setListOptions(Object.keys(itemsByList).map(listId => { return {value: listId, label: listId} }))
            setListSelected(listOptions[0])
        })
    }, [])


    return (
        <>
        {listOptions.length > 0 && 
           <Select options={listOptions} onChange={handleSelectChange} defaultValue={listSelected}/>
        }
        <ul>

        </ul>
        </>
    )
}
