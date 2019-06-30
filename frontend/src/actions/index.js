import axios from 'axios';

const AddContact = function(personData)
{
    //let data = JSON.stringify(personData);
    let data = personData;
    let ContactData = new Promise((resolve, reject)=>{
        axios.post('http://localhost:5000/star', data, {
            headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
        }).then((RetData)=>{
            resolve(RetData.data);
            if (RetData.status == 200){
                
            }
            console.log("Data Posted", RetData);
        })
    });
    return {type:'ADD_CONTACT',contactdata:ContactData};
}

const UpdateContact = function (personData, index){
    let url = `http://localhost:5000/star?id=${index}`;
    let data = JSON.stringify(personData);
    let ContactData = new Promise((resolve, reject)=>{
        axios.put(url, data, {
            headers: {"Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json'}
        }).then((RetData)=>{
            console.log("Data Posted");
            resolve(RetData.data);
            if (RetData.status == 200){
                
            }
        })
    });
    return {type: 'UPDATE_CONTACT', contactdata:ContactData};
}

const ListContacts = function()
{
    // call api    
    let ContactData = new Promise((resolve,reject)=>{
            axios.get('http://localhost:5000/star',{ headers: {"Access-Control-Allow-Origin": "*"}}).then((RetData)=>{
                resolve(RetData.data);   
                if (RetData.status == 200){
                
                }     
            })
        });     
    return {type:'LIST_CONTACT', contactsdata:ContactData};
}

const DeleteContact = function(index)
{
    let url = `http://localhost:5000/star?id=${index}`;
    //const data = {id: index};
    let ContactData = new Promise((resolve, reject)=>{
        axios.delete(url, { headers: {"Access-Control-Allow-Origin": "*"}}).then((RetData)=>{
            resolve(RetData.data);   
            if (RetData.status == 200){
                console.log("delete data", RetData);
            }
        })
    });
    return {type: 'DELETE_CONTACT', contactdata:ContactData};
}



export { AddContact, ListContacts, DeleteContact, UpdateContact };