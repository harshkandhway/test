function checkPermissions(requestUser,resourceUserId){
    if(requestUser.role === 'admin') return true;
    else if(requestUser.userId.toString() === resourceUserId.toString()) return true;
    else
        return false
}

module.exports = {checkPermissions}