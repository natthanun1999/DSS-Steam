const deleteProperties = (objs, props) => {
    let tmpObj = objs

    props.forEach((prop) => {
        delete tmpObj[prop]
    })

    return tmpObj
}

module.exports = {
    deleteProperties
}