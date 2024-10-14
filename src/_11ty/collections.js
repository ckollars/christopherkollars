import { getFilteredCollection } from '../../_utils/filter-collection'

export const getNotes = (collection) => {
    return getFilteredCollection(collection, 'notes')
}
export const getArticles = (collection) => {
    return getFilteredCollection(collection, 'posts')
}
