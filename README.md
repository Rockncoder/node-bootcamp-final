

### Importing csv files to mLab (MongoDB)

You must have the MongoDB CLI installed first. To see if you do, from the terminal type `mongoimport`.
You should see something like the following: 

`Europa:assets troymiles$ mongoimport
2017-10-23T03:43:21.375-0700	no collection specified
2017-10-23T03:43:21.376-0700	using filename '' as collection
2017-10-23T03:43:21.376-0700	error validating settings: invalid collection name: collection name cannot be an empty string
2017-10-23T03:43:21.376-0700	try 'mongoimport --help' for more information`

This is a terminal command and should be executed in assets directory.  

`mongoimport -h <hostname> -d <database name> -c <collection name> -u <username> -p <password> --file vehicles-1997.csv  --type csv --headerline`

1. `<hostname>` is obtained from mLab. Delete the forward slash and everything afterwards
1. `<database name>` this is the database name, it was the text after the forward slash on mLab
1. `<collection name>` the name of the collection should be the lowercase pluralization of your Mongoose Model name
1. `<username>` this is the database user name, not you mLab account user name
1. `<password>` this is the password for the database user
1. 