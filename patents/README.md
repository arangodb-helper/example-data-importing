**Patent graph importer**

This Docker image can be used to import a patent graph into an already
deployed ArangoDB instance. You need the enterprise version.

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
docker run -it -e RCLONE_S3_ACCESS_KEY_ID=<ACCESS_KEY_ID> -e RCLONE_S3_SECRET_ACCESS_KEY=<SECRET_KEY> -e ARANGODB_ENDPOINT=<ENDPOINT> -e ARANGODB_USER=root -e ARANGODB_PASSWD= arangodb/patentsimport:3.4
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
