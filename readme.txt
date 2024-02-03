note : sorry for not inspecting the test cases as it is not tested 100% (regarding mongoose lib . vulrnabilities etc... as i have a rush in sessions these days . thank you for uderstanding )


===============project and API documentaion and test cases===============

1)technologies used : nodejs , express framework and mongo db with mongoose lib

2) database models : 

user model(schema and doc struct) : (email,password,deposite,role)

product model : (productname,productamount,cost,sellerid)

3)arc.: MVC  approach

===============API(main func)=========================================================


1)auth routes(post & get(for the views "dummy")):

  /signup: take a user instance and create a user according to the schema
  /login : take a user instance and create a jwt and send it to the client

2)product routes:

  /getproducts (get): get all products what ever the role of the user
  /create-product (post): create a product (has to be a seller) take the sellerid ana create a product in the product model with the sellerid 
  /productupdate (put): update a product in the database (must be a seller of the same product (sellerids must match with current user and product that is being updated))
  /:id (delete): deleting aproduct from the database (must be a seller of the same product)
  /:id (get ): get a single product with the url param. id

3)user action routes:

  /deposit (put): update the current user deposit(buyer check)
  /reset (put): reset the buyer deposit and get back the change 
  /buy (post): take product amount and check both current user deposit and productamount available and cost and if buyer has enough deposit 
               both doc (current user and product ) is updated with the changes (user deposit is dec with the productamount*product cost and product amount is dec with the productamount in the req.)
               then user is informed with the change 


=======================auth middleware===============================


all routes is auth each time with the jwt to verfiy the identity and role 





=====================test cases (test.js)===============

still pending 

