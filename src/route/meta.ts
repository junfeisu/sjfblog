import express from 'express'
const route = express.Router

route.get('/', function(req, res) {
    res.json({
        "$auth": {
            "algorithm": "HS256",
            "cookie": null,
            "expiration": 172800,
            "header": "Authorization",
            "refresh": true
        },
        "blog": {
            "get_bloglist": {},
            "post_blogbyid": {},
            "delete_blog": {},
            "get_blogtype": {},
            "get_newcursor": {},
            "get_nearblog": {}
        },
        "user": {
            "get": {},
            "post_login": {},
            "put_password": {}
        }
    })
})

export default route
