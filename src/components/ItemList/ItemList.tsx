import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select, { OptionTypeBase } from 'react-select'

export const ItemList = () => {
    const [itemsByList, setItemsByList] = useState<{[listId: string]: Item[]}>({});
    const [listSelected, setListSelected] = useState<OptionTypeBase>(null);
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
        return items.sort((itemA, itemB) => (Number(itemA.name.match(/(\d+)/g)[0]) - Number(itemB.name.match(/(\d+)/g)[0])));
    }

    const filterNamedItems = (items: Item[]) => {
        return items.filter((item: Item) => { return item.name })
    }

    const buildSelectOptions = (_itemsByList: {[listId: string]: Item[]}) => {
        return Object.keys(_itemsByList).map(listId => { return {value: listId, label: listId} })
    }

    const handleSelectChange = (option: OptionTypeBase) => {
        setListSelected(option)
    }

    useEffect(() => {
        getItems().then((res) => {
            setItemsByList(groupItemsByListId(filterNamedItems(res.data)))
        })
    }, [])

    useEffect(() => {
        setListOptions(buildSelectOptions(itemsByList));
    }, [itemsByList])

    useEffect(() => {
        setListSelected(listOptions[0]);
    }, [listOptions])

    return (
        <>
            <div>
                {listOptions.length > 0 && 
                <div className="flex-row-center">
                <span>List ID: </span>
                <Select options={listOptions} onChange={handleSelectChange} value={listSelected}/>
                </div>
                }
            </div>
            {listSelected != null &&
            <ul>
                {sortItemsByName(itemsByList[listSelected.value]).map(item => (
                    <li key={item.id}>{item.name}</li>
                ))
                }
            </ul>
            }
        </>
    )
}
