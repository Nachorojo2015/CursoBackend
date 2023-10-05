export const generateUserErrorInfo = (data)=>{
    return `One or more propieties were incompleted or not valid. List of required properties:
    *title: needs to be a string, received ${data.title}
    *description: needs to be  a string, received ${data.description}
    *code: needs to be a string, received ${data.code}
    *price: needs to be a number, received ${data.price}
    *stock: needs to be a number, received ${data.stock}
    *category: needs to be a string, received ${data.category}
    *thumbnail: needs to be a string url, received ${data.thumbnail}`
}