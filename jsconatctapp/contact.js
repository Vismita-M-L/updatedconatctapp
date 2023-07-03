const ContactInfo = require('./contact_info');
class Contact {
    constructor(cName) {
      this.cName = cName;
      this.contactInfos = [];
    }
  
    static newContact(cName) {
      if (typeof cName !== 'string') {
        throw new Error('Contact name must be a string.');
      }
      return new Contact(cName);
    }
}
    
  module.exports = Contact;
  