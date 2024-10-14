// Inspired and adopted from https://nicolas-hoizey.com/
let filteredCollectionsMemoization = {}
let now = new Date().getTime()

const getFilteredCollection = (collection, type) => {
    if (type in filteredCollectionsMemoization) {
        return filteredCollectionsMemoization[type]
    } else {
        const pattern = type
        let filteredCollection = collection
            .getFilteredByGlob(`src/${pattern}/**/*.md`)
            .filter((item) => now >= item.date.getTime())
            .sort((a, b) => b.date - a.date)
        filteredCollectionsMemoization[type] = filteredCollection

        return filteredCollection
    }
}

export default {
    getFilteredCollection,
}
