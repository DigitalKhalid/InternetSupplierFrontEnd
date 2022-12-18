const host = process.env.REACT_APP_HOST

const getListURL = (urlEndPoint, sortField='', sort = 'ASC', search = '', filterField = '') => {
    if (sort === 'DESC') {
        sortField = '-' + sortField
    }

    if (sortField !== null) {
        sort = '?ordering=' + sortField
    }

    if (sortField === null & search !== '') {
        if (filterField !== '') {
            search = '?' + filterField + '=' + search
        } else {
            search = '?search=' + search
        }

    } else if (sortField !== null & search !== '') {
        if (filterField !== '') {
            search = '&' + filterField + '=' + search
        } else {
            search = '&search=' + search
        }
    }

    return `${host}${urlEndPoint}/${sort + search}`
}

export default getListURL;