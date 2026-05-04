
export const isEmail = value => (!(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)))
export const required = value => !value ? 'The field is Required' : undefined

export const isNumber = value => {
    const regex = /^(?:[1-9][0-9]*|0)$/
    return value && !regex.test(value) ? 'Invalid input' : undefined
}

export const isFloat = value => {
    const regex = /^[-+]?[0-9]+\.[0-9]+$/

    if (value !== '' && isNumber(value) !== undefined) {
        value = value.toString()
        return !value.match(regex) ? 'Invalid input' : undefined
    }
    return undefined
}

export const isEmpty = obj => Object.getOwnPropertyNames(obj).length === 0

export const isObject = value =>{
    try {
        return Object.keys(value).length !== 0
    }catch (e) {
        console.log(e.message)
    }
    return false
}

export const isImage = file => {
    const fileName = file.name || file.path
    const suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase()
    return suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png'
}

export const isFileSizeValid = (bytes, max) => {
    const size = Math.floor(bytes/1024)
    return size <= max
}

export const minChar = min => value => value && value.length < min ? `Characters should be larger or equal to ${min}` : undefined

export const maxChar = min => value => value && value.length > min ? `Characters should be less or equal to ${min}` : undefined