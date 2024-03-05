# React Form

## Installation

1. Generate `.env` file
   ```shell
   make env
   ```

2. Build docker image
   ```shell
   make image
   ```

3. Install project dependencies
   ```shell
   make install
   ```
## Usage

### Development server

To start development run the following command:
```shell
make dev-server
```
Then open your browser by command:
```shell
make open-browser
```

### Creating production build

For creating production build run the following command:
```shell
make production-build
```

### Other commands

1. To install some package run the following command:
   ```shell
   make install my-package-name
   ```

2. To remove some package run the following command:
   ```shell
   make remove my-package-name
   ```
