# Update NPM
npm config set strict-ssl=false
npm audit fix

# Update APT
sudo apt update
sudo apt install -y build-essential curl file git

# Install Protobuf Compiler
sudo apt install -y protobuf-compiler

# Install Buf CLI
# Substitute PREFIX for your install prefix.
# Substitute VERSION for the current released version.
PREFIX="/usr/local" && \
VERSION="1.26.1" && \
sudo curl -sSL --insecure \
"https://github.com/bufbuild/buf/releases/download/v${VERSION}/buf-$(uname -s)-$(uname -m).tar.gz" | \
sudo tar -xvzf - -C "${PREFIX}" --strip-components 1

# Install Husky
npm install husky --insecure
npx husky install
sudo chmod +x .husky/pre-commit

# Install GO (Pre-requisite for protoc-gen-doc)
wget https://dl.google.com/go/go1.21.1.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.21.1.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
rm go1.21.1.linux-amd64.tar.gz

# Install protoc-gen-doc
go install github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc@latest