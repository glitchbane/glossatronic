![glossatronic](https://materialthoughts.files.wordpress.com/2017/09/glossatronic-logo.png)

Glossatronic is software that supports the creation of a generic glossary of terms by domain, which can be translated into one or more other languages.

At this time, simply read the Wiki for more information.  This is a nascent project.

You must have Node installed on your machine to run this locally.

To run the app:

clone the repository: git clone https://github.com/glitchbane/glossatronic.git

switch to the glossatronic directory

run npm install from the glossatronic root directory: npm install

start the client: ng serve (the app will run by default on port 4200)

start the server: npm run server (the api will run by default on port 3500)

to view the app go to url http://localhost:4200

to view the api go to url http://localhost:3500 -- you should see a welcome message

   sample api calls:  http://localhost:3500/api/users/

                      http://localhost:3500/api/users/1


To run karma tests from the command line

    ng test --sourcemaps=false  (the option of sourcemaps=false is to prevent a recent problem introduced by the latest version of Angular-cli)




