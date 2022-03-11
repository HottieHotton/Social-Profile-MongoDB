const { Thought, User } = require('../models')


const thoughtController = {
createThought({ body }, res) {
    Thought.create(body)
    .then((thoughtData) =>{
        return User.findByIdAndUpdate(
            {_id: body.userId},
            {$push: { thoughts: thoughtData._id }},
            {new :true}
            );
        })
    .then((userData) => {
        if (!userData){
            res.json(404).json({message: 'No user with this partuculiar ID!'});
            return;
        }
        res.json(userData)
        })
    .catch(err => res.status(400).json(err));
},    
getAllThoughts(req, res) {
    Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
          })
         
         
        .select('-__v')
        
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
          })
         .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.json(404).json({ message: 'No thought found with this ID!' })
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err);
        });
},
editThoughtById({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({
        path: 'reactions', 
        select: '-__v'
    })
    .select('-___v')
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
            res.json(thoughtData);
    })
    .catch(err => res.json(err));
},
deleteThoughtById({params}, res) {
    Thought.findOneAndDelete({_id: params.id})
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
},
addReaction({params,body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
         {$push: {reactions: body}},
        { new: true }
    )
    .select('-__v')
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
    res.json(thoughtData);
    })
    .catch(err => res.json(err));
} ,
deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}},)
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err));
}
}


module.exports = thoughtController;