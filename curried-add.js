function curriedAdd(total) {
    if (total === undefined) // if nothing is passed
        return 0;

    return function addNext(num) {
        // if no number passed return total
        if (num === undefined)
            return total;

        total += num;
        // return this function so it can be chained
        return addNext;
    }

}

module.exports = { curriedAdd };
