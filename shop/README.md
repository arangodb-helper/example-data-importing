**E-commerce shop data importer**

This Docker image can be used to import an example shop into an already
deployed ArangoDB instance. For details about the data see the bottom of
this document.

# Import using k8s

Edit `import.yaml` and deploy:

~~~~~
kubectl apply -f import.yaml
~~~~~

You need:

  - The endpoint of the ArangoDB instance as `ARANGODB_ENDPOINT`.
    If your cluster is running in k8s, you probably want to do

    ~~~~~
    kubectl get service
    ~~~~~

    and identify the `-ea` external access endpoint. Do not forget to specify
    the `ssl://` prefix, if you use TLS (which is the default!).

  - Credentials to access your database (username and password), this could
    be `root` and an empty password if you have not changed it.

The import process automatically generates some a database `"shop"` and
some collections and graphs.


# Import using Docker

You can also use the Docker image locally with `docker`, here is the command:

~~~~~
docker run -it -e ARANGODB_ENDPOINT=<ENDPOINT> -e ARANGODB_USER=root -e ARANGODB_PASSWD= arangodb/pokecimporter:3.4
~~~~~

For the argument values, use the same values as describe above under
k8s.

# Recreate the Docker image

This step is normally not necessary.

To rebuild the Docker image, simply do:

~~~~~
make build
make push
~~~~~

Note that the image `arangodb/importer:3.4` must be created first, which
it usually is.

# About this data

This is a toy example of an e-commerce system. It illustrates
particularly the benefits of a native multi-model database.

This creates 1000000 random customers, 100000 random items, 100000 sales,
100000 shopping baskets and 10000 reviews with some likes.

To modify these numbers, adjust the following environment variables in the
`import.yaml` file or in the `docker run` call above:

    NRUSERS
    NRITEMS
    NRSALES
    NRREVIEWS
    NRSALES

Use, for example, `-e NRUSERS=1000000` in `docker run`.

## Data model

There are altogether 6 collections, 4 vertex collections:

  - `customers`
  - `items`
  - `reviews`
  - `baskets`

and 2 edge collections:

  - `sales`
  - `reviewRel`

The general idea is that the `sales` edge collection has an edge from a
customer to an item for each item the customer buys in a sale. Furthermore,
the `reviewRel` collection has edges of type `wrote` and `liked`, each
pointing from a customer to a review, with the obvious meaning.

The `baskets` collection is simply using ArangoDB as a key/value store,
so it has many shards and no replication configured.

In a single server setup all sharding and replication settings are simply
ignored.
