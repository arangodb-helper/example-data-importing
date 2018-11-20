**Pokec graph importer**

This Docker image can be used to import a social graph into an already
deployed ArangoDB instance. You need the enterprise version. For details
about the data see the bottom of this document.

# Import using k8s

Edit `import.yaml` and deploy:

~~~~~
kubectl apply -f import.yaml
~~~~~

You need:

  - AWS credentials to download the data from S3 as `RCLONE_S3_ACCESS_KEY_ID`
    and `RCLONE_S3_SECRET_ACCESS_KEY`, either use your own ArangoDB account
    or the S3downloader credentials in the file `arangodbdownload.csv.asc`
    which is encrypted, use

    ~~~~~
    gpg -d arangodbdownload.csv.asc
    ~~~~~

    and the office WiFi password do decrypt.

  - The endpoint of the ArangoDB instance as `ARANGODB_ENDPOINT`.
    If your cluster is running in k8s, you probably want to do

    ~~~~~
    kubectl get service
    ~~~~~

    and identify the `-ea` external access endpoint. Do not forget to specify
    the `ssl://` prefix, if you use TLS (which is the default!).

  - Credentials to access your database (username and password), this could
    be `root` and an empty password if you have not changed it.

The import process automatically generates two graphs - one smart and one
non-smart - and imports the data.


# Import using Docker

You can also use the Docker image locally with `docker`, here is the command:

~~~~~
docker run -it -e RCLONE_S3_ACCESS_KEY_ID=<ACCESS_KEY_ID> -e RCLONE_S3_SECRET_ACCESS_KEY=<SECRET_KEY> -e ARANGODB_ENDPOINT=<ENDPOINT> -e ARANGODB_USER=root -e ARANGODB_PASSWD= arangodb/pokecimporter:3.4
~~~~~

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
downloads and imports a graph that describes a social network. The original
data has been taken from

  [https://snap.stanford.edu/data/soc-pokec.html](https://snap.stanford.edu/data/soc-pokec.html)

We have added a stringified number as `region` Attribute, which will be used as a SmartGraph attribute for sharding.
Afterwards we have used the `smartifier` as described here:

  [https://www.arangodb.com/arangodb-smartifier/](https://www.arangodb.com/arangodb-smartifier/)

to transform the data into the SmartGraph format.

Here are some queries which illustrate smart graphs:

~~~~~
FOR v, e, p IN 2 OUTBOUND "profiles_smart/1:P172922" GRAPH "pokec_smart"
  FILTER p.vertices[1].AGE == 18
  RETURN v._key

FOR v, e, p IN 2 OUTBOUND "profiles_random/1:P172922" GRAPH "pokec_random"
  FILTER p.vertices[1].AGE == 18
  RETURN v._key
~~~~~

