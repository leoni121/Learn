exports.tipMsg = ({
    status = true,
    msg = "",
                  }) => {
    return { status, msg }
}


exports.dataMsg = ({
    status = true,
    data = null,
                   }) => {
    return { status, data }
}
