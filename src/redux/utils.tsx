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
    newItemArray.forEach((item) => {
        if (item[idField] === idToEdit) {
            item = newData
        }
    })
    return newItemArray
}

export {
    removeItemById,
    editItemById
}