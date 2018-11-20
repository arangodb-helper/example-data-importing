build: rclone.tar.gz
	if test -z "${ARANGODB}" ; then echo "Need ARANGODB image name!" ; exit 1 ; fi
	docker build --build-arg ARANGODB=${ARANGODB} -t arangodb/importer:3.4 .

push:
	docker push arangodb/importer:3.4

rclone.tar.gz:
	mkdir tmp
	cd tmp ; curl -O -s https://downloads.rclone.org/rclone-current-linux-amd64.zip ; unzip -x -j rclone-current-linux-amd64.zip ; rm rclone-current-linux-amd64.zip ; tar czvf ../rclone.tar.gz *
	rm -rf tmp

clean:
	rm -rf rclone.tar.gz
