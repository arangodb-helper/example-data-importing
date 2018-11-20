**Example data importing tools for ArangoDB**

This is a collection of tools to make the import of example data sets
for ArangoDB easy. It is based on a few Docker images which can fetch
data from S3 or elsewhere and import into already running ArangoDB
instances. The setup works with k8s as well.

Here is an overview over what is available:

  - `importer` has the setup for the generic base image `importer`
  - `patents`: a graph whose vertices are patents and edges are citations
  - `pokec`: a social network with anonymized data

