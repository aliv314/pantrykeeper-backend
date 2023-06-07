const {db} = require('../firebase');

//REQ: id
//RES: [{PANTRYOBJ}]
exports.getPantries = async(req, res) => {
    try{
        const pantriesRef = await db.collection('pantries').where('owner_id', '==', req.params.id);
        const pantriesSnapshot = await pantriesRef.get();
        const pantriesData = []
        await Promise.all(pantriesSnapshot.docs.map( (pantry) => {
            pantriesData.push({pantry_id: pantry.id,
                ...pantry.data()});
        })).catch(error => {
            console.log(error);
        })

        res.status(200).json(pantriesData);
    }catch(error){
        console.log(error)
        res.status(404).send("Error getting pantries.")
    }
}   

function newUser(friendCode) {
    return {
        friendCode: friendCode
    }
}

//Posts user Friend code to 
exports.postUser = async (req, res) => {
    try{
        const result = await db.collection('users').doc(req.body.userId).set({
            friendCode: req.body.friendCode,
        })
        res.status(200).send("Success!");
    }catch(e){
        res.status(400).send("Error updating user.");
    }
}