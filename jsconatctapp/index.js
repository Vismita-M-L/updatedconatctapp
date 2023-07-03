//Driver Code

const User = require("./user");

try {
    const admin = User.newAdmin("Vismita", "vismita");

    const user1 = admin.newUser("Mithali", "mithali");
    const user2 = admin.newUser("Rahul", "rahul");
    const user3 = admin.newUser("Karan", "karan");

    console.log(admin.getAllUser());

    admin.updateUser("mithali", "name", "Mithali Raj");
    admin.deleteUser("mithali");

    user1.newContact("sonal");
    user1.updateContact("sonal", "jinesh");
    user1.deleteContact("sonal");

    user1.addContactInfo("jinesh", "Number", "1246567");
    user1.updateContactInfo("jinesh", "Number", "154555475");
    user1.deleteContactInfo("jinesh", "Number");

    console.log(user1);
    console.log(user1.contacts[0]);
} catch (error) {
    console.log(error.message);
}

