// register controller
const db = require("../firebase/firebase");
let users = db.collection('users')
const recipes = db.collection('recipes');

async function addUser(req, res) {
    const {email, password = ""} = req.body;

    let user = await users.where('email', '==', email).limit(1).get()

    if (!user.empty) {
        res.json({code: 1, user: {...user.docs[0].data(), id: user.docs[0].id}});
    } else {
        users.add({email, password})
            .then((docRef) => {
                res.json({code: 0, id: docRef.id});
            })
            .catch((error) => {
                res.json({error});
            });
    }
}

// login controller
async function login(req, res) {
    const {email, password = ""} = req.body;

    let user = await users.where('email', '==', email).where('password', '==', password).limit(1).get()

    if (!user.empty) {
        res.json({code: 1, user: {...user.docs[0].data(), id: user.docs[0].id}});
    } else {
        res.json({code: 0, message: "The account or password is incorrect"});
    }
}

async function getUser(req, res) {
    const {id} = req.body;
    const docRef = db.doc('users/' + id); // Build document references using string concatenation
    docRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                data.id = docSnapshot.id;
                res.json(data);
            } else {
                console.log('Document does not exist.');
            }
        })
        .catch((error) => {
            console.error('Error getting document:', error);
        });
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const {
        email,
        username,
        bio = '',
        firstName = '',
        lastName = '',
        password = '',
        avatar = '',
    } = req.body;

    // Build the updated data object
    const updatedData = {
        username,
        email,
        bio,
        firstName,
        lastName,
        password,
        avatar,


    };
    if (password === "") {
        delete updatedData.password
    }

    // update user information
    const userRef = users.doc(userId);
    userRef.update(updatedData)
        .then(() => {
            res.json({message: "update success"});
        })
        .catch((error) => {
            console.error('Error updating user:', error);
            res.sendStatus(500);
        });
}


module.exports = {
    addUser, login, getUser, updateUser
};
