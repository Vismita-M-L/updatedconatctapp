class ContactInfo {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  
    static newContactInfo(type, value) {
      return new ContactInfo(type, value);
    }
  }
  
  module.exports = ContactInfo;
  