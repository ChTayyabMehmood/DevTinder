/** what is monolith vs microServices

In monolith: all backend + db connect forntend +auth+emails+analytics are in on project 

MicroServices: Microservices are an architectural style that structures an application as a collection of small, independent, and loosely coupled services, each implementing a specific business capability.

there small services own backend type : 
auth is : own backend, 
forntend is own services; 

Developement SPeed: microServices is faster than Monolith 
code Repo: multiple  vs only single 
Scalability : easir in the microservices than monlith 
deployment : 
tech Stack : monolith is single : stack stick 
Infra cost: low Monolith is low cost than Microservices; 
Complexity: tough in microservices if project is low ; vice versa

fault isolation : if any services only one microservices is down, 
testing: end to end test case is easir in monolith , 
ownership: small teams -> microservices 
maintainces 
debugging : difficult in microservices  : there will be blame game 


What happens in NamasteDev.com? 
is there are not alot of microservices only few : 

student web -> next.js 
admin web -> react js 
backend -> node js: all code of sending emails and analytics are all in backend 
student app -> react native ;



What are we going to build in dev Tinder?

FE -> React 
BE -> Node JS 

these two communicate with each other through API ; 


DevTinder : 
Feature 
1. create a account 
2. login 
3. update your profile 
4. feed page - explore 
5. send connection request
6. see our matches 
7. see request we have sent sent / received 





Before writing SDE is do the lld & hlld 

lld: 
first important thing : 
#DB design 







epsiode -03: 



Episode-05 | Middlewares & Error Handlers

if i didnot send back a response, the request is hangout; 

one route have multiple route handle
app.use("/user",()=>{},)
**/

app.use('/home',
(req,res)=>{
res.send("first handler")
},
(req,res)=>{
res.send("first handler")

})


here is tayyab

//testing commit 