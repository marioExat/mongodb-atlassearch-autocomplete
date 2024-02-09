# MONGO DB ATLAS search sample app

## Links

- [Building an Autocomplete Form Element with Atlas Search and JavaScript](https://www.youtube.com/watch?v=3IDlOI0D8-8&t=830s)

- [Creating a .env file](https://deadsimplechat.com/blog/environment-variables-in-nodejs/)

## Setup

1. Create a sample search index in atlas db with dyanmic mapping similar to this

```
{
    "name": "sample_supplies-sales-dynamic",
    "searchAnalyzer": "lucene.standard",
    "analyzer": "lucene.standard",
    "collectionName": "sales",
    "database": "sample_supplies",
    "mappings": {
        "dynamic": true
    }
}
```

2. in the `$search` stage, set the index as the name of the search `index` field in atlas search, in this case it would be
   `sample_supplies-sales-dynamic`.

3. Create a .env file in root directory and add the following entries

```
DATABASE_URL=sample-mongo-url
PORT=3001
DATABASE_NAME=sample-database-name
COLLECTION_NAME=sample-collection-name
```

4. If all else works fine, then test the file by running the app using `node main.js` and then go to the browser and query the server using the below url `http://localhost:3001/search?term=avvalakki`(change the port number if the running port is different).
