const User = require('../models/Schema')

class UserController {
    
    getAllUsers(req, res, next) {
        User.find({})
        .then(data => {
            if(data) {
                res.json(data)
            }
            else {
                res.status(403).json({ message: 'Không tìm thấy !'})
            }
        })
        .catch(err => {
            res.json({ message: 'Lỗi Server'})
        })
    }

    deleteUser(req, res, next) {
        User.findById(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).json({ data, message: 'Delete successfully'})
            }
            else {
                res.status(403).json({ data, message: 'Đéo'})
            }
        })
        .catch(err => next(err))
        // res.json({ id: req.params.id})
        // console.log('ID:', req.params.id);
    }


}

module.exports = new UserController