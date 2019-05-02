**Movie ratings graph importer**

This Docker image can be used to import a movie ratings graph into an already
deployed ArangoDB instance. You only need the community version. For details
about the data see the bottom of this document.

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

The import process automatically generates one graph "G" and imports the data.


# Import using Docker

You can also use the Docker image locally with `docker`, here is the command:

~~~~~
docker run -it -e ARANGODB_ENDPOINT=<ENDPOINT> -e ARANGODB_USER=root -e ARANGODB_PASSWD= arangodb/movieratingsimporter:3.4
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

This repository contains all data needed to produce a Docker image that
contains a graph that describes movie ratings by users. The original
data has been taken from ... (please add this information).

