# load ssl custom root ca
# the root ca .crt file should be mounted
# inside /usr/local/share/ca-certificates/
update-ca-certificates

# https://github.com/gliderlabs/docker-alpine/issues/52#issuecomment-560946618
cp /etc/ssl/certs/ca-certificates.crt /etc/ssl/cert.pem

"$@"
