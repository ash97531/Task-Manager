const mongoose = require('mongoose');

/* // __REMOVED_FOR_SECURITY_PURPOSE__
const connectionString = 'mongodb+srv://ashwani:<PASSWORD>@nodeexpressproject.vychu.mongodb.net/<DATABASE-NAME>?retryWrites=true&w=majority'
*/

const connectDB = (url)=>{
    return mongoose.connect(
        url,{
        useNewUrlParser:true,
        useCreateIndex :true,
        useFindAndModify:false,
        useUnifiedTopology:true,    
    });
}

module.exports = connectDB;

/*   // ___DIRECT_CALLING_THE_FUNCTION_AND___
     // ___CHECKING_WHETHER_IT_IS_CONNECTED_TO_DATABASE_OR_NOT___
mongoose.connect(
    connectionString,{
    useNewUrlParser:true,
    useCreateIndex :true,
    useFindAndModify:false,
    useUnifiedTopology:true,

}).then(()=>{
    console.log('CONNECTED TO THE DB...');
}).catch((err)=>{
    console.log(err);
});
*/