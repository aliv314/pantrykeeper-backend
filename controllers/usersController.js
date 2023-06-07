const {db} = require('../firebase');

//REQ: id
//RES: [{PANTRYOBJ}]
exports.getPantries = async(req, res) => {
    try{
        const pantriesRef = await db.collection('pantries').where('owner_id', '==', req.params.id);
        const pantriesSnapshot = await pantriesRef.get();
        if (pantriesSnapshot.exists){
            return res.status(200).json([])
        }
        let pantries = [];
        pantriesSnapshot.forEach( (pantry) => {
            pantries.push({
                pantry_id: pantry.id,
                ...pantry.data() 
            })
        })
        return res.status(200).json(pantries);
    }catch(error){
        console.log(error)
        return res.status(404).send("Error getting pantries.")
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