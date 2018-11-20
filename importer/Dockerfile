ARG ARANGODB
FROM ${ARANGODB}
MAINTAINER Max Neunhoeffer <max@arangodb.com>

ADD rclone.tar.gz /rclone/

RUN apk update && apk add fish git man xz unzip unrar && ln -s /rclone/rclone /usr/bin/rclone && ln -s /rclone/rclone.1 /usr/share/man/man1/rclone.1 && mkdir -p /root/.config/rclone

ADD rclone.conf /root/.config/rclone/rclone.conf

ADD [ "import", "download", "upload", "process", "/" ]

CMD [ "/usr/bin/fish", "-c" , "/import" ]
