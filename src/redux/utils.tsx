const removeItemById = (
    itemArray: any[] | [],
    idToRemove: string,
    idField: string
): any[] | [] => {
    const newItemArray = [...itemArray]
    newItemArray.forEach((item, index) => {
        if (item[idField] === idToRemove) {
            newItemArray.splice(index, 1)
        }
    })
    return newItemArray
}
  
const editItemById = (
    itemArray: any[] | [],
    idToEdit: string,
    idField: string,
    newData: any,
): any[] => {
    const newItemArray = [...itemArray]
    let itemIndex = 0
    newItemArray.forEach((item, index) => {
        if (item[idField] === idToEdit) {
            itemIndex = index
        }
    })
    newItemArray[itemIndex] = { ...newItemArray[itemIndex], ...newData }
    return newItemArray
}

const editFieldById = (
    itemArray: any[] | [],
    idToEdit: string,
    idField: string,
    fieldToEdit: string,
    newData: any,
): any[] => {
    const newItemArray = [...itemArray]
    let itemIndex = 0
    newItemArray.forEach((item, index) => {
        if (item[idField] === idToEdit) {
            itemIndex = index
        }
    })
    newItemArray[itemIndex][fieldToEdit] = newData
    newItemArray[itemIndex] = { ...newItemArray[itemIndex], ...newData }
    return newItemArray
}

export {
    removeItemById,
    editItemById,
    editFieldById
}