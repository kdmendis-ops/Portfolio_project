// dbErrorHandler.js turns raw Mongoose/MongoDB errors into short,
// human-readable messages so controllers don't have to parse driver
// internals themselves.

// Picks a readable message out of a Mongoose error object.
const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        // err.code is set for low-level MongoDB errors (not validation errors).
        switch (err.code) {
            case 11000:
            case 11001:
                // 11000/11001 = duplicate key error (unique index violation).
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        // No err.code means it's a Mongoose validation error, which can
        // contain multiple field errors keyed by field name.
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message
        }
    }
    return message
}

// Extracts the field name from a MongoDB duplicate-key error message and
// builds a friendlier "X already exists" string.
const getUniqueErrorMessage = (err) => {
    let output
    try {
        // MongoDB's raw message embeds the index name, e.g. "...index: email_1...".
        // This pulls out the field name between ".$" and "_1".
        let fieldName =err.message.substring(err.message.lastIndexOf('.$') + 2,
                err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) +
            ' already exists'
    } catch (ex) {
        // Fallback if the message format doesn't match what we expect.
        output = 'Unique field already exists'
    }
    return output
}

export default { getErrorMessage }
