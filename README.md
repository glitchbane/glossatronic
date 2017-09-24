![glossatronic](https://materialthoughts.files.wordpress.com/2017/09/glossatronic-logo.png)

Glossatronic is software that supports the creation of a generic glossary of terms by domain, which can be translated into one or more other languages.

At this time, simply read the Wiki for more information.  This is a nascent project.

You must have Node installed on your machine to run this locally.

To run the app:

clone the glossatronic repository:
```
  $: git clone https://github.com/glitchbane/glossatronic.git
```
clone the glossatronic-api repository:
```
  $: git clone https://github.com/glitchbane/glossatronic-api.git
```
switch to the glossatronic-api  directory

  start the server:  (the api will run by default on port 3500)
```
    $: npm run server
```
switch to the glossatronic directory

  run npm install from the glossatronic root directory:
```
    $: npm install
```
  start the client:  (the app will run by default on port 4200)
```
    $: ng serve
```

to view the app go to url http://localhost:4200

to view the api go to url http://localhost:3500 -- you should see a welcome message

   sample api calls:
    ```
    http://localhost:3500/v1/users/

    http://localhost:3500/v1/users/1
    ```


To run karma tests from the command line
```
    ng test --sourcemaps=false
    ```
    (the option of sourcemaps=false is to prevent a recent problem introduced by the latest version of Angular-cli)




