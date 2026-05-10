FROM erlang:29-alpine

RUN apk add --no-cache curl tar

# Install specific Gleam version.
RUN curl -fL -o gleam.tar.gz https://github.com/gleam-lang/gleam/releases/download/v1.15.3/gleam-v1.15.3-aarch64-unknown-linux-musl.tar.gz \
    && tar -xzf gleam.tar.gz \
    && mv gleam /usr/local/bin/gleam \
    && chmod +x /usr/local/bin/gleam \
    && rm gleam.tar.gz

WORKDIR /workspace