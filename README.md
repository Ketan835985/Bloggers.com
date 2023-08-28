# Blogging Application

A blogging site is an online platform that allows individuals or organizations to create and publish their own content in the form of blog posts. It serves as a medium for sharing information, knowledge, opinions, and experiences with a wide audience.

Blogging sites have gained immense popularity due to their ease of use, accessibility, and the ability to reach a global audience. They provide a platform for writers, professionals, enthusiasts, and experts to showcase their expertise, share their ideas, and engage with readers through interactive discussions.

# Tech Stack

* Node.JS - Runtime Environment
* Express.js - Framework Create backed Application
* MongoDB - MongoDB Database (No-Sql Database)
* JsonWebToken - JSON Web Token for security purposes
* bcrypt - Bcrypt for security purposes in Password Encoding and Hash Authentication
* mongoose - Mongoose for build relationShip between NodeJS and MongoDB
* AWS -S3  - AWS Database Cloud Storage for Store Images and Database


# Model 

## userModel
```
fname  - First name
lname - Last name
email - Email Address
phone - Phone Number
password - Password
```

## blogModel 

```
title - Blog Title
body - Blog Content
isPublished - Blog is published(Boolean)
isDelete - Blog is Sweet delete flag
category - Blog category
subcategory - Blog subcategory(Array)
tags - Blog tags(Array)
authorId - reference to the User(ObjectId)
```

# EndPoints

## End Points - User
```
* /register - Register user (POST)
* /login - Login user (POST request)
```
## EndPoints - Blog
```
* /createBlog - Create blog (POST request)
* /getBlogs - Get blogs (GET request)
* /updateBlog - Update blog (PUT request)
* /deleteBlog - Delete blog (DELETE request)
```


# .env Credentials Name

```Server Credentials```
* MONGO_URL =  "http://localhost:27010/
* PORT = 3000
* SECRET_KEY = '-----'

```Aws Credentials```
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_REGION 

## Contact Information

Feel free to adjust the content according to your project's specific requirements and add any additional details that would make your project documentation more engaging and informative.

```GMAIL : guptaketan6375@gmail.com```