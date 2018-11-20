# Instructions

This is only occasionally needed when ArangoDB itself changes. All other
Docker images in this repo derive from this base image.

To rebuild, simply do:

~~~~~
export ARANGODB <NAME_OF_AN_ENTERPRISE_IMAGE>
make build
make push
~~~~~

This will download `rclone`, build a Docker image called
`arangodb/importer:3.4` with all necessary tools, and upload it
to Docker hub.
