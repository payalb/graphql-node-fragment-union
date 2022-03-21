const users = require("../../users.js")
const posts = require("../../posts.js")
const resolvers = {

    Query: {        
        user(_, args){
                console.log(args.userid);
               const d= users.filter(x =>  x.id == args.userid);
               console.log("d is "+ JSON.stringify(d))
               if(d){
               return {users: d};
               }else{
                   return { "message": "User not found"}
               }
            }
        ,
        
        users(){
            return users
        }
,
        posts(){
            return posts
        },

        post(parent,args, context, info){
            console.log(context.req)
            return posts.filter(x=> x.id==args.id )
        }
    },
    Mutation: {
        /*
mutation{
    user(input: {name: "test"}){
        id
        name
    }
}
        */
        createUser(_,args) {
            args.input.id= users.length+1;
            users.push(args.input);
            return users;
        },
        deleteUser(_, args){
            return users.filter(x=> x.id!=args.id);
        }
    },
    //Data post and user not related in db
    User: {
        /*
        query{
    user(userid: 1){
        id
        name
        posts {
            id
            title
        }
    }
}

query{
    users{
        id
        name
        posts {
            id
            title
        }
    }
}
        */
        posts(){
            return posts
        }
    },

    UserResult: {
        __resolveType(obj){
            if(obj.users){
                return "UsersSuccessResult"
            }else{
                return "UserErrorResult"
            }
            
        }
    }
}

module.exports = resolvers;

/*
query{
    users{
        id
        name
    },
    posts{
        id
        title
    }
}

*/