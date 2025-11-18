#!/bin/sh
mkdir -p /tmp/loki/chunks /tmp/loki/index /tmp/loki/cache /tmp/loki/compactor /tmp/loki/rules
exec /usr/bin/loki -config.file=/loki-config.yml -config.expand-env=true
