## Introduction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6. It is expected to be run along with with [XAMPP](https://www.apachefriends.org/download.html) on a linux (Ubuntu) computer.
This project has mainly 3 kind of code files : Angular code files (for frontend), PHP scripts (for backend) and MySQL script (for backend).

## Clone Repository

After installing Angular CLI (version 10.1.6) and XAMPP on your linux computer, clone/save this [project repository/directory](https://git.cse.iitb.ac.in/ayushjangir/sfcode/) inside the `/opt/lampp/htdocs/` directory.
Make sure that you recursively change the permissions for the `sfcode/` directory (project directory) and its subdirectories (It is recommended that they be set to 777).

## Set Up Backend

Start the XAMPP servers by going into `/opt/lampp` directory and using the command `./xampp start` as a superuser. 

Now, if you are using XAMPP for this project for the first time, the follow these steps:
1. Open your browser and go to the adress `http://localhost/phpmyadmin/` and create a MySQL database with name *ssl_database*.
2. Go into the created database and import the script present in `backend/database.sql` script from the project repository, which create two tables : *users* and *questions*.

## Start Angular Server

Open a terminal in the project directory, `/opt/lampp/htdocs/sfcode`. Now, follow these steps:

1. Use `npm install`.
2. Use `ng build` to build the project.
3. Use `ng serve` to start angular server at `http://localhost:4200/`. If you wish to make the website to be available to your local network, use 
```
ng serve --host local_ip --port port_no
```
Here, *local_ip* is your computer's local ip adress and *port_no* is the port number (default value 4200) at which the website will be hosted. Use the ip adress *0.0.0.0* to make it available from any network. Note that the XAMPP server is already running while you are following the above three steps. The XAMPP server can also be started after starting the angular server, using `./xampp start` command in the `/opt/lampp/` directory.

Now, you can open the website on your browser and the default Registration/Login page will open.

## Documentation

Documentation Folder contains three folders i.e, backend (for the backend php files), frontend (documentation of frontend parts with description of components) and frontend-dom (documentation of frontend parts with DOM models).

To access the documentation pertaining to each parts go to `index.html` in each sub directory of documentation folder.