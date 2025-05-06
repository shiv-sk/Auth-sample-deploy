const validateInput = (schema)=>{
    return (req , res , next)=>{
        const {error} = schema.validate(req.body , { abortEarly: false });
        if(error){
            console.log("the errors are from input validation! " , error);
            return res.status(400).json({
                message:"validation error",
                details:error.details.map(err => err.message).join(", ") 
            })
        }
        next();
    }
}

module.exports = validateInput;