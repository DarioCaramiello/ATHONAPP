#----- ATHONAPP -----

##INTRODUCTION

Every quiz in AthonApp starts with a Start button.\
On clicking the Start button, there will be generated randomly the quiz questions.\
Every quiz category shows different challenges.\
Every question answered correctly assigns a point to the user which will be \
incremented to the Score linked to the user account on the Database. \
Once the user answers wrongly to the questions, will be provided, at the end of the Quiz,
a summary containing the answers and references to some external resources to check the error
and recover the eventual gap.\
Once a quiz has been done, it won’t be allowed to do it again during the same day.\
The user has 60 seconds to choose an answer, otherwise it will declared as an error. \
The user can choose to do every available quiz to keep increasing his score.

##USER MANUAL 
To properly let the website work, you should run the server.py file and you should have MongoDB as cointainer in Docker.
In order to do so please follow the steps:

###1 - Install Python Packages:

  1. Install FLASK
  2. Install CORS
  3. Install PyMongo

###2 - Run MongoDB from Docker

####3 - Set Env. variable FLASK_APP=server.py \
####4 - Set Environment - FLASK_ENV=debug \
####5 - Run flask with the following command : flask run -h (IP) -p (port) 


##PROJECT PRESENTATION LINK
You can now properly navigate through the AthonApp Website!


https://docs.google.com/presentation/d/1I_NFdV2VMQ4wJuBoNa4zon7JrnJgES4Xr31LwkJbNE0/edit#slide=id.gdf81bbaab4_0_0 - Language : ENG
https://docs.google.com/presentation/d/1oW6LNUkNJhuK29k4O-qWxUpvY6Aj1YQhA3bNAuQQVGE/edit?usp=sharing - Language : ITA



