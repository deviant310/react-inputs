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

To start development on NodeJS server run the following command:
```shell
make dev-server
```
Then open your browser by command:
```shell
make open-browser
```

### Development on a third-party server

For development on a third-party server you can run watcher. Running watcher will generate project files on your host machine without running local development server.

1. Specify build path for generating files on your host by changing `BUILD_PATH_HOST` variable in your `.env` file, e.g.:
   ```shell
   BUILD_PATH_HOST=../my-project/node_modules/react-form
   ```

2. To start development run the following command:
   ```shell
   make dev-watcher
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
