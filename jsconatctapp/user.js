const Contact = require("./contact")
const ContactInfo = require("./contact_info")

class User {
    static allUser = []
    constructor(name, username, isAdmin) {
        this.name = name
        this.username = username
        this.isAdmin = isAdmin
        this.contacts = []
    }
    static findUser(username) {
        //type validation
        if (typeof username !== 'string') {
            throw new Error('Username must be a string.');
          }
        for (let index = 0; index < User.allUser.length; index++) {
            if (User.allUser[index].username == username) {
                return [true, index]
            }
        }
        return [false, -1]
    }
    

    static newAdmin(name, username) {
        //type validation - name -username
        if (typeof name !== 'string' || typeof username !== 'string') {
            throw new Error('Name and username must be strings.');
          }
          const [isUserExist, indexOfUserFound] = User.findUser(username);
          if (isUserExist) {
            throw new Error('Username already exists.');
          }
      
          const admin = new User(name, username, true);
          User.allUser.push(admin);
          return admin;
        }

        
    
    newUser(name, username) {
        //type validation - name -username
        if (typeof name !== 'string' || typeof username !== 'string') {
            throw new Error('Name and username must be strings.');
          }
        //check
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        let [isUserExist, indexOfUserFound] = User.findUser(username)
        if (isUserExist) {
            throw new Error("Username Already Exist")
        }
        const user = new User(name, username, false)
        User.allUser.push(user)
        return user
    }
    getAllUser() {
        //type validation - name -username
        for (const user of User.allUser) {
            if (typeof user.name !== 'string' || typeof user.username !== 'string') {
              throw new Error('Name and username must be strings for all users.');
            }
          }
        //check
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        return User.allUser
    }
    updateUser(username, parameter, newValue) {
        //type validation - parameter -username
        if (typeof username !== 'string') {
            throw new Error('Username must be a string.');
          }
          if (typeof parameter !== 'string') {
            throw new Error('Parameter must be a string.');
          }
        //check
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        let [isUserExist, indexOfUserFound] = User.findUser(username)
        if (!isUserExist) {
            
            throw new Error("Username Does not Exist")
        }
        switch (parameter) {
            case "name": User.allUser[indexOfUserFound].updateName(newValue)
                break;
            case "username": User.allUser[indexOfUserFound].updateUsername(newValue)
                break;
            default:
                throw new Error("Invalid Parameter")

        }
    }
    updateName(newName) {
        //newName string check
        if (typeof newName !== 'string') {
            throw new Error('New name must be a string.');
        }
          this.name = newName;
    }


    updateUsername(newUsername) {
        let [isUserExist, indexOfUserFound] = User.findUser(newUsername)
        if (isUserExist) {
            throw new Error("Username Already Exists")
        }
        this.username = newUsername
    }
    deleteUser(username) {
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        let [isUserExist, indexOfUserFound] = User.findUser(username)
        if (!isUserExist) {
            throw new Error("Username Does not Exist")
        }


        // User.allUser.slice()
        User.allUser.splice(indexOfUserFound, 1);
    }
    
    newContact(cName) {
    
        //check cname is string
        if (typeof cName !== 'string') {
            throw new Error('Contact name must be a string.');
          }
        //check not admin
        if (this.isAdmin){
            throw new Error("Admin Cannot Create Contacts")
        }
        let [isContactExist, indexOfContact] = this.findContact(cName)
        if (isContactExist) {
          throw new Error("Contact Already Exists");
        }
        const newContact = Contact.newContact(cName)
        this.contacts.push(newContact)
        return newContact
    }
    findContact(cName) {
        for (let index = 0; index < this.contacts.length; index++) {
          if (this.contacts[index].cName == cName) {
            return [true, index];
          }
        }
        return [false, -1];
      }
      
      updateContact(cName, newContactName) {
        // Check contactName and newContactName are strings
      
        if (typeof cName !== 'string' || typeof newContactName !== 'string') {
          throw new Error('Contact names must be strings.');
        }
        // Check not admin
        if (this.isAdmin) {
          throw new Error('Admin Cannot Update Contacts');
        }
        let [isContactExist, indexOfContact] = this.findContact(cName);
        if (!isContactExist) {
          console.log("Contact does not exist.");
          return;
        }
        let [isNewContactExist] = this.findContact(newContactName);
        if (isNewContactExist) {
          throw new Error('New contact name already exists');
        }
      
        this.contacts[indexOfContact].cName = newContactName;
      }
      
    
      deleteContact(cName) {
        // Check contactName is a string
        if (typeof cName !== 'string') {
          throw new Error('Contact name must be a string.');
        }
        // Check not admin
        if (this.isAdmin) {
          throw new Error('Admin Cannot Delete Contacts');
        }
        let [isContactExist, indexOfContact] = this.findContact(cName);
        if (!isContactExist) {
          throw new Error('Contact Does not Exist');
        }
    
        this.contacts.splice(indexOfContact, 1);
        }
      getContactInfo(type , indexOfContact){

        let line = this.contacts[indexOfContact].contactInfos

            for (let index = 0; index < line.length; index++) {
                if (line[index].type == type) {
                    return [true, index]
                }
            }
            return [false, -1]
        }
        addContactInfo(cName, type, value) {
            // Check contactName, type, and value are strings
            if (typeof cName !== 'string' || typeof type !== 'string' || typeof value !== 'string') {
              throw new Error('Contact name, type, and value must be strings.');
            }
            // Check not admin
            if (this.isAdmin) {
              throw new Error('Admin Cannot Add Contact Info');
            }
            let [isContactExist, indexOfContact] = this.findContact(cName);
            if (!isContactExist) {
              throw new Error('Contact Does not Exist');
            }
        
            const contactInfo = ContactInfo.newContactInfo(type, value);
            this.contacts[indexOfContact].contactInfos.push(contactInfo);
            return contactInfo;
        }
          deleteContactInfo(cName, type){
            if (typeof cName !== 'string' || typeof type !== 'string') {
              throw new Error('Contact name and type must be strings.');
            }
            if (this.isAdmin) {
              throw new Error('Admin cannot delete contact info');
            }
            const [isContactExist, indexOfContact] = this.findContact(cName);
            if (!isContactExist) {
              throw new Error('Contact does not exist');
            }
            const contact = this.contacts[indexOfContact];
            contact.deleteContactInfo(type);
          }
        

           
        updateContactInfo(cName, type, value ){
          if (typeof contactName !== 'string' || typeof type !== 'string' || typeof value !== 'string') {
            throw new Error('Contact name, type, and value must be strings.');
          }
           if (this.isAdmin){
                throw new Error("Admin Cannot Add Contact Info")
            }
    
            let [isContactExist, indexOfContact] = this.findContact(cName)
            if (!isContactExist) {
                throw new Error("Contact Does Not Exist")
            }
    
            let [isContactTypeExist, indexOfContactType] = this.getContactInfo(type, indexOfContact )
            if (!isContactTypeExist) {
                throw new Error("ContactType Doesnt Exist")
            }
    
            this.contacts[indexOfContact].contactInfos[indexOfContactType].value = value;
        }
      }
      
      
    
    module.exports = User