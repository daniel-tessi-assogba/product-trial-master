# ALTEN SHOP BACK : USER MICROSERVICE
This is a maven springboot project. To run this project follew these steps:
1. Create a postgres database and name it crm_db. You can also spin up a postgres docker conatainer running on prt 5432.
2. The the database "password": "xxxxxx" in the pacakage datasource/datasource  and in the application.yaml file
3. cd into user-managment project and run the 2 commands : 
      a) mvn clean instal 
      b) mvn spring-boot:run 
4. The create a user with the command : 
   curl -X POST http://localhost:8080/api/auth/register   -H "Content-Type: application/json"   -d '{
   "username": "Daniel",
   "firstname": "Tessi",
   "email": "daniel.cloud.architect@gmail.com",
   "password": "xxxxxx"
   }'
5. Then go back to Frontend UI to login with the newly created user's credentials.