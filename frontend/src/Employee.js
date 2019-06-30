import React, { Component } from 'react';
import { store } from './store';
import { AddContact, ListContacts, DeleteContact, UpdateContact } from './actions';

class PhoneBook extends Component {
  constructor(props)
  {
    super();
    this.state = {person:{name:'', contact:''},contactList:[], editMode: false, editIndex: null};
    this.onSubmit =  this.onSubmit.bind(this);
    this.onUpdate =  this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSetChanges = this.onSetChanges.bind(this);
  }
  componentDidMount()
  {
    store.dispatch(ListContacts());
    let ContactList = store.getState();
    //let { contactList } = this.state;
    ContactList.ContactData.then((RetData)=>{
      this.setState({contactList:RetData.result});
      console.log("Employees", RetData, this.state.contactList);
    });
  }
  onSubmit(event)
  {
    event.preventDefault();    
    let {person} = this.state;
    store.dispatch(AddContact(person));
    let Person = store.getState();
    Person.ContactData.then((RetData)=>{
      let { contactList } = this.state;
      contactList.push(RetData.result);
      this.setState({contactList:contactList});            
    }); 
  }
  onUpdate(e)
  {
    let { name, value } = e.target;
    let { person } = this.state;
    this.setState({person:{...person,[name]:value}});
  }
  onDelete(row)
  {
    store.dispatch(DeleteContact(row.id));
    let Person = store.getState();
    Person.ContactData.then((RetData)=>{
      let { contactList } = this.state;
      for (var i=0; i < contactList.length; i++)
      {
        if (contactList[i].id == row.id)
        {
          contactList.splice(i, 1);
        }
      }
      this.setState({contactList : contactList});            
    });
  }
  onEdit(row)
  {
    console.log("edit row", row);
    this.setState({person: {...row}});
    this.setState({editMode: true});
    this.setState({editIndex: row.id});
  }
  onSetChanges(event)
  {
    event.preventDefault();
    let {person} = this.state;
    store.dispatch(UpdateContact(person, this.state.editIndex));
    this.setState({editMode: false});
    let Person = store.getState();
    Person.ContactData.then((RetData)=>{
      let { contactList } = this.state;
      for (var i=0; i < contactList.length; i++)
      {
        if (contactList[i].id == this.state.editIndex)
        {
          contactList[i] = RetData.result;
        }
      }
      this.setState({contactList : contactList});       
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-6">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="form-control" onChange={this.onUpdate} value={this.state.person.name} />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input type="text" name="contact" className="form-control" onChange={this.onUpdate} value={this.state.person.contact} />
          </div>
          {this.state.editMode? <button className="btn btn-primary" onClick={this.onSetChanges}> Update </button> : <button className="btn btn-success" onClick={this.onSubmit}>Submit</button>}
        </form>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12">
         <h1>PhoneBook </h1>
         <table className='table table-striped'>
           <tbody>
           {this.state.contactList.map((row,idx)=>{
              return (
                <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.contact}</td>
                <td className='btn btn-info' onClick={()=>this.onEdit(row)}>Edit</td>
                <td className='btn btn-danger' onClick={()=>this.onDelete(row)}>Delete</td>
                </tr>
              )
            })}
           </tbody>
         </table>
          
          
        </div>
        </div>

       </div>
    );
  }
}


export default PhoneBook;
