# API-REST
Here I have created the RESTFUl APi

software used for APis: Postman 

Database : mongoose database

server: nodeserver


Working flow of project :

I have created the 2 collections in one database

1.User's collection

	fields in user's collection documents:
	
		----> name: 
				constraint : name should not be empty,mendatory field
		----> email: 
				constraint : should be in email format,mendatory field
		----> password: 
				constraint : does not contain password word in password,mendatory field string
		----> age : 
				constraint : Not mendatory field , default value is set to be 0
		
2.Task's colletions

	fields in taks's collection document:
	
		---> description: 
				constraint : must be string, mendatory field
		---> completed: 
				constraint : not mendatory field, default value is set to be false


Using RESTFul APi :

Post Method : using post method one can add the new users data and task data to mongoose database
while inserting the data to database i have sanitized the data according to constraints

Get method : using get method we can get the all the users information and task information which 
are stored in the database,can able to retrive the one specific user's information and one specific task's information

Delete Method : Using delete Method can able to delete the all user's info and task info which are in database, besides can
able to delete the specific user and task information from database

Patch Method : using patch method one can update the details of user and task. While updating it check the all constraints which are applyed while creating the documents. No other extra field which is not in database model will not be added to database.

