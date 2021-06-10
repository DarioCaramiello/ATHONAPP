-------------------ATHONAPP-------------------
REQUIREMENTS:
MongoDB
Python 3.6?
Docker

USER MANUAL :
To properly let the website work, you should run the athonserver.py file and you should have MongoDB as cointainer in Docker.
In order to do so please follow the steps:

1 - Install Python Packages:
  1. Install FLASK
  2. Install CORS
  3. Install PyMongo

2 - Run MongoDB from Docker

3 - Set Env. variable FLASK_APP=athonserver.py
4 - Set Environment - FLASK_ENV=debug
5 - Run flask with the following command : flask run -h (IP) -p (port)

You can now properly navigate through the AthonApp Website!

