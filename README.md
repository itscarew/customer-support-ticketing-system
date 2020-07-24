# Customer-support-ticketing-system
Fliqpay test . Create the architecture and design of a customer support ticketing system.

## Table of Contents

* Introduction
* Key Features
* Installation
* Technology Stack
* Dependencies
* Project Structure


## Introduction to Customer Support Ticketing System

This is a customer support ticketing API designed to allow customers create support request and also have conversations between them and the support agent.

## Key Features

Users

* Users can create support requests
* Users can view the status of the previous requests.
* Users can comment on a support request.

Support agents
* Support Agents can find and process support requests.
* Support Agents can requests data with all tickets closed in the last one month.

Admin
* Admin has all the priviledges on the api

Authentication
* Users use JWT for authetication.


## Installation

To get started
  * Clone this repository to your local machine using https://github.com/itscarew/customer-support-ticketing-system.git
  * Navigate to the root of the cloned local repository.
  * Run npm install to install the dependencies.
  * Run npm start to run the application.
  * Run npm dev to run the application from the server.ts file


## Technology Stack
* Node js 
* Mongodb
* Express
* Javascript
* Typescript

## Database Used
* Mongo db Atlas

## Dependencies Installed
* bcryptjs
* body-parser
* cors
* dotenv
* express 
* json2csv
* jsonwebtoken
* mongoose
* jest
* nodemon
* supertest
* ts-jest 
* ts-node
* ts-node-dev
* typescript

## Project Structure 
dist/

This is where all the typescript files are transpiled too.

auth/
This older contains all the authentication a user needs to perform any operation.

contoller/

Contain all the functions for each of the request and operations.
download/

The download folder contains the csv file for all the tickets closed in the last one month.
models/

Here lies the structure of how each documents are going to be from the users to the comments and the tickets.
routes/

Here lies the route and path to be type for each of the CRUD operations to be performed.
tests/

This folder containes the test files tested with jest.
server.ts

The app's main entry point.





