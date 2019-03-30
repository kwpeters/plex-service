# plex-service
A service that runs Plex Media Server


# Setup

1.  Clone this repo on the Windows Plex Media Server machine.
    ```
    git clone https://github.com/kwpeters/plex-service.git
    ```

2.  Install prerequisites

    This package uses a native Node.js package that will need to be built when
    installed.  **As an administrator**, install the following packages globally. 
    ```
    nvm use
    npm install --global --production windows-build-tools
    npm install -g node-gyp
    ```

3.  Install dependencies.
    ```
    nvm use
    npm install
    ```
    
4.  **As an administrator**, add the service.
    ```
    node src\plexservice.js --add
    ```

5.  Customize the service's configuration in the Windows Services Manager.
    - Change the login account
    - Set "Startup type" to `Automatic (Delayed Start)`
