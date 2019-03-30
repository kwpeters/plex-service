# plex-service
A service that runs Plex Media Server


# Getting Plex ready to be run as a service

- As noted in [this post](https://forums.plex.tv/t/pms-as-a-service/53381#top),
  when Plex runs as a service there is no user session.  Therefore, network
  drive mappings will not exist.  If your libraries are configured with paths
  that use mapped drives, you need to change them to use UNC paths instead.
  
- In order to avoid permissions problems, it is recommended that you run the
  service using the user account that was used when installing Plex Media
  Server.  This is included in the setup instructions below.


# Setup

1.  Clone this repo on the Windows Plex Media Server machine.
    ```
    git clone https://github.com/kwpeters/plex-service.git
    ```

2.  Install prerequisites

    This package uses a native Node.js package that will need to be built when
    installed.  **As an administrator**, install the following packages
    globally.
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
    - Change the login account.  It is recommended that you run the service
      using the user account that was used when installing Plex Media Server. 
    - Set "Startup type" to `Automatic (Delayed Start)`.  This will start Plex
      approximately 2 minutes after Windows is done booting.
    
6.  Reboot the machine.  Plex Media Server should start automatically.


# References

1. [PMS as a service](https://forums.plex.tv/t/pms-as-a-service/53381#top)
