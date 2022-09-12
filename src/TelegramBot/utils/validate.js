'use strinc'

exports.validateFile = async (extention)=>{
    let valid = null
    if(extention === 'pdf' || extention === 'xlsx'){
        valid = true;
    } else{
        valid = false;
    }
    return valid;
}
