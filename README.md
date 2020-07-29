# Evaluate a News Article with Natural Langauge Processing-NLP
The project is to evaluate a News article with natural langauge processing. This's the fourth project in the Front-End Nanodegree by Udacity. 

# Table of Contents
- Introduction
- Project Prerequisites
- Setup
- Setting up the Aylien API
- Project Enhancement
- Unit testing using Jest Framework
- Service Workers
- Deployment

# Project Introduction - What You Will Build
We will build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. NLP is the ability of an application to understand the human language, written or oral.
You don't have to worry about NLP, because we will make use of an external api called Aylien to interact with their NLP system. This tool will help us classify the information available in the article, like whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

# Project Prerequisites
- Webserver - Node.
- Web application framework for routing - Express.
- Build tool - Webpack. Using webpack, we will set up the app to have dev and prod environments, each with their own set of tools and commands.
- External script - Service Worker.
- External API - Aylien.

# Stage 1 - Getting Started - Setting up the Project
It would be good to first get your basic project up and functioning. Fork the project Github repo, and then clone or download the zip file locally. Remember that once you clone, you will still need to install everything:

```Javascript
cd <project directory>
npm install
```
**Note: Do not add service workers just yet**. Add them after finishing the development work. 
Just for your quick reference, you might want to install the following loaders and plugins:
```Javascript
// Choose the necessary installation for your development mode
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
```
# Stage 2 - Setting up the Aylien API
[The Aylien API](https://aylien.com/news-api/) has you install a node module to run certain commands through. It will simplify the requests we need to make from our node/express backend. 

#### Step 1: Signup for an API key
Currently, Aylien API has disabled new account creation for the Text Analysis API. This does not affect users who signed up before July 7th, 2020.
You might search and find an API_ID and API_KEY to make the project work successfully. 

#### Step 2: Install the SDK
Next, you'll need to get the Software Development Kit (SDK) for Node.js. SDK is usually a program that brings together various tools to help you work with a specific technology. For instance, the Aylien SDK brings together a bunch of tools and functions that will make it possible to interface with their API from our server. Aylien SDKs are available for all the major languages and platforms, such as Node, Python, PHP, Go, Ruby, and many others.

Install the SDK in your project, as per the instructions mentioned for **Node.js SDK** at [Text Analysis API Documentation](https://docs.aylien.com/textapi/sdks/#node-js-sdk) .

#### Step 3: Require the SDK package
Your `server/index.js` file must have these things:
```Javascript
// Require the Aylien npm package
var aylien = require("aylien_textapi");
```
#### Step 4: Environment Variables
Next, in `server/index.js`, you need to declare your API credentials, which will look something like this:
```Javascript
// You could call it aylienapi, or anything else
var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});
```
*...but there's a problem with this.* We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly, are never a good thing. So, we have to figure out a way to make that not happen.

The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold value. The environment variables only belong to your local system and won't be visible when you push your code to a different environment like Github. Follow the steps below to configure environment variables:

1. Use npm to install the dotenv package - `npm install dotenv` This will allow us to use environment variables we set in a new file.
2. Create a new `.env` file in the root of your project.
3. Fill the .env file with your API keys like this:

```Javascript
API_ID=**************************
API_KEY=**************************
```
4. Add this code to the very top of your `server/index.js` file:

```Javascript
const dotenv = require('dotenv');
dotenv.config();
```
5. If you want to refer the environment variables, try putting a prefix `process.env.` in front of the variable name in the `server/index.js` file, an example might look like this:

```Javascript
console.log(`Your API key is ${process.env.API_KEY}`);
```
The step above is just to help you understand how to refer an environment variable from your code. In `server/index.js`, your updated API credential settings should look like this:
```Javascript
// You could call it aylienapi, or anything else
var textapi = new aylien({
   application_id: process.env.API_ID,
   application_key: process.env.API_KEY
});
```
6. Go to your `.gitignore` file, in the project root, and add `.env`. It will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys would become pointless.

#### Step 5: Using the API
We're ready to go! The API has a lot of different endpoints you can take a look at the [Aylien API endpoints](https://docs.aylien.com/textapi/endpoints/#api-endpoints). You can see how using the SDK simplifies the requests we need to make.

Now it's up to you to create the various requests and make sure your server is set up appropriately. For example, ensure that the `"dependencies"` in `package.json` have a suitable entry for Aylien, such as, `"aylien_textapi": "^0.7.0",`, where the version may vary with time.

# Stage 3 - Project Enhancement
At the current stage, make enhancement in your project code to ensure most of the requirements as mentioned in the project Requirements are met. In addition, parse the response body to dynamically fill content on the page.

Only the requirements related to "Offline Functionality" and "Testing" criteria should remain for the next stages.

# Stage 4 - Unit Testing using Jest Framework
[Jest](https://jestjs.io/en/) is a framework for testing JavaScript projects. We are interested in the unit-testing of our project. The Jest framework provides us the ability to create, and run unit tests. In general, unit testing means to test the functionality of each unit/component of a project. But, in our case, we will write tests for desired functions defined in the `src/client/js` directory. The tests will check if the functions are behaving expectedly when provided an input. Let's learn to add Jest to your project to handle unit-testing.
### How does it work?
1. Install Jest by using `npm install --save-dev jest`
2. Write the custom JS in your `src/client/js` directory, responsible for the server, and form submission task. **For example**, assume that the `/src/client/js/formHandler.js` file has the following function to be tested:
```Javascript
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
}
export { handleSubmit }
```
3. **You have to ensure that all your custom functions in src/client/js directory can handle error responses if the user input does not match API requirements.** You will write tests in `<function_name>.test.js` or `<function_name>.spec.js` file, to be present in a `__test__ `folder. For each functionality, consider writing a separate test file. The `__test__` folder should be present in the project directory.

In each test file, the general flow of the test block should be:

- Import the js file to test.
- Define the input for the function. Note that, to keep it simple, we will not validate the input being provided to the test cases.
- Define the expected output.
- Check if the function produces the expected output.

For the example function shown above, `/src/client/js/formHandler/handleSubmit()`, you can write a test file `testFormHandler.spec.js` in the `__test__` directory, having a test block as:
```Javascript
// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler"
```

```Javascript
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(handleSubmit).toBeDefined();
})});
```
You must be wondering about the matchers, and other syntactical information about test blocks. At this point, you must refer to the external resources:

- [Jest - Getting started](https://jestjs.io/docs/en/getting-started) - Provides a basic overview, with the help of an example.
- [Jest - matchers](https://jestjs.io/docs/en/using-matchers) - Read carefully to identify the suitable matcher for each of your functions.
- [Jest - testing asynchronous code](https://jestjs.io/docs/en/asynchronous) - If you have code that runs asynchronously.
- [A tutorial for beginners](https://www.valentinog.com/blog/jest/) - A good explanatory tutorial.

4. Configure an npm script named "test" in `package.json` to run your tests from the command line:

```Javascript
"scripts": {
    "test": "jest"
}
```
Also, ensure that the "devDependencies" in `package.json` have a suitable entry for Jest and others, such as, `"jest": "^25.3.0",`, where the version may vary with time.

5. Run the `npm run test` command.

# Stage 5 - Service Workers
Go to the webpack config file, and add the setup for service workers. Test that the site should be available even when you stop your local server.

# Stage 6 - Deployment
A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but check out [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.





