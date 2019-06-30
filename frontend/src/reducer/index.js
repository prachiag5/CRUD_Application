export const reducer = function(state=[],action)
{
    switch(action.type)
    {
        case 'ADD_CONTACT':
            return state = {ContactData:action.contactdata}
        case 'DELETE_CONTACT':
            return state = {ContactData:action.contactdata}
        case 'UPDATE_CONTACT':
            return state = {ContactData:action.contactdata}
        case 'LIST_CONTACT':
            return state = {ContactData:action.contactsdata}
       default :
            return null;  
    }
}