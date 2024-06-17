let name = {
    firstName: 'venkata satish',
    lastName: 'chakkirala'
}
let printAddress= (homeTown, state)=>{
console.log('***Full Name', this.firstName+""+ this.lastName+ homeTown + state)
}


printAddress.call(name,"hyderabad","andhra pradesh")