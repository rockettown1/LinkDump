# Basic UI for collecting useful links.

Log in, and post links. Ability to view all links, and submit a new link (if you're logged in). Also added the functionality of upvoting links.

Technical:

Front end is Reactjs, with a graphQL API using the react-Apollo client. Queries from the front end are sent to Prisma (a graphQL interface for databases) Back end is made in Nodejs. This app uses a MySQL database, but thanks to the Prisma generated interface you don't actually need to write SQL queries

The Prisma client instance takes your graphQL resolvers and schema, and generates an API that can interact with a database type of your choice. Pretty handy.

Through graphQL, this app also makes use of Subscriptions (via websockets) which means links will be re-rendered on the front-end (by react) in realtime. The same applies for up votes.
