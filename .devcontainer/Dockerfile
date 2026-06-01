FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# 1. System Dependencies
# Added libssl-dev and pkg-config as they are essential for compiling many Rust crates
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    git \
    unzip \
    zip \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common \
    sudo \
    erlang \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# 2. Install mise system-wide
RUN curl https://mise.jdx.dev/install.sh | sh \
    && mv /root/.local/bin/mise /usr/local/bin/mise

# 3. User Setup
ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -m -s /bin/bash --uid $USER_UID --gid $USER_GID $USERNAME \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# 4. Apply Global Tool Configuration
# We place the mise.toml into the user's global config directory 
# so these languages are active everywhere in the container, not just /workspace
USER $USERNAME
RUN mkdir -p /home/${USERNAME}/.config/mise
COPY --chown=$USERNAME:$USERNAME mise.toml /home/${USERNAME}/.config/mise/config.toml

# 5. Install Runtimes
# mise reads the config.toml we just copied and installs everything natively
RUN mise install --yes

# 7. Shell Integration & Environment Variables
# Dynamically activates mise features for every interactive terminal session
RUN echo 'eval "$(mise activate bash)"' >> /home/${USERNAME}/.bashrc

# Expose Claude Code's native bin path globally
ENV PATH="/home/${USERNAME}/.local/bin:${PATH}"

WORKDIR /workspace