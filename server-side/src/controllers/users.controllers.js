const userController = {};

userController.register = (req,res,next) => {
    res.send({
       message:'Sing up'
    });
};

module.exports = userController ;