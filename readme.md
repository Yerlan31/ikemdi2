# Ikemdi

Automation of Judo tournaments in Kazakhstan.

## Features

* <b>User Registration and Login:</b> Allows user registration and login.
* <b>Account Confirmation via Email:</b> Performs account confirmation via email.
* <b>Secure Password Storage:</b> Stores securely hashed user passwords.
* <b>Main Page Display:</b> Displays a list of tournaments (up to 10 per page).
* <b>User Dashboard:</b> After login, users can check their upcoming tournaments, participate in available tournaments, and create their own tournaments.
* <b>Tournament Details:</b> Allows users to view details of each tournament after clicking on a button.
* <b>Create Tournaments:</b> Users can create new tournaments after inserting all the required information.
* <b>Tournament Sign Up:</b> Users can sign up for a tournament by providing ranking and license number, which cannot be repeated among other participants.
* <b>Tournament Ladder Generation:</b> Generates a tournament ladder after the deadline of the start of the tournament, viewable on the detailed tournament page by anyone.
* <b>Result Submission:</b> Allows participants to insert their results and checks if they match the opponents' input. If they match, the system updates the tournament ladder.
* <b>Concurrency Handling:</b> Ensures that concurrency will not result in errors.

## Usage

Prerequisites: PSQL, Node

To install libs, use the command:

        npm install

To run app.js, use the command:

        node app.js

To run datasetCreator.js, use the command:

        node datasetCreator.js

Note that the entire website operates solely on your local machine, so any emails sent by the system (e.g., for account confirmation) will be available in the terminal as a link to the local email website.

If you do not wish to install all these requirements, you can watch a demo presented below:

https://github.com/Mickeyo0o/TournamentsWebsite/assets/119634889/efdeb34d-90de-408b-9a91-b53702a37a6c


## Note

This project was completed as part of the Internet Application course.

## Creator

Mikołaj Marmurowicz (Mickeyo0o)
