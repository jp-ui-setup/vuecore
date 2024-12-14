### NGINX Reverse Proxy Setup

A **reverse proxy** is a server that sits between client devices and a backend server, forwarding client requests to the appropriate backend server. In the case of **NGINX**, it can be used to forward requests to backend services, such as applications running in Node.js, Vue.js, or other server environments. It's commonly used to load balance, cache, and improve security.

### Why Use NGINX as a Reverse Proxy?

- **Load balancing**: Distribute incoming traffic across multiple backend servers to ensure reliability and scalability.
- **Security**: Hide your backend server details and reduce exposure to direct attacks.
- **SSL termination**: Handle SSL/TLS encryption at the proxy level, which reduces the load on your application servers.
- **Caching**: Cache content at the proxy to improve response times and reduce backend load.
- **Performance**: NGINX is lightweight, fast, and can handle a large number of concurrent connections.

### Steps to Set Up NGINX Reverse Proxy

Here’s a step-by-step guide to setting up a reverse proxy using NGINX.

#### 1. Install NGINX

If you haven't installed NGINX yet, follow these steps depending on your operating system.

##### On Ubuntu/Debian:

```bash
sudo apt update
sudo apt install nginx
```

##### On CentOS/RHEL:

```bash
sudo yum install nginx
```

After installation, start NGINX:

```bash
sudo systemctl start nginx
```

#### 2. Configure NGINX as a Reverse Proxy

NGINX configuration files are typically located in `/etc/nginx/`. The main configuration file is `/etc/nginx/nginx.conf`, and server block configurations are usually placed in `/etc/nginx/sites-available/` or `/etc/nginx/conf.d/`.

Let’s say you want to proxy requests to a backend server running on `http://localhost:3000` (for example, a Node.js application). Here’s how you can set it up:

##### Basic Reverse Proxy Configuration

1. Open or create a new NGINX configuration file. For example, to create a new config file for your site:

```bash
sudo nano /etc/nginx/sites-available/my_site.conf
```

2. Add the following configuration to define the reverse proxy:

```nginx
server {
    listen 80;

    # Domain name or IP address of the server
    server_name example.com www.example.com;

    # Root directory for static files (optional)
    root /var/www/html;

    location / {
        # Proxy requests to the backend server
        proxy_pass http://localhost:3000;

        # Preserve the original Host header
        proxy_set_header Host $host;

        # Pass the real IP of the client
        proxy_set_header X-Real-IP $remote_addr;

        # Pass the original server name
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Pass the protocol (http or https)
        proxy_set_header X-Forwarded-Proto $scheme;

        # Additional headers for WebSocket support, if needed
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    # Optional: Handle static files directly with NGINX
    location /static/ {
        root /var/www/html;
    }
}
```

3. Save and close the file.

##### Enable the Site (on Debian/Ubuntu)

1. Create a symbolic link to enable the site in NGINX:

```bash
sudo ln -s /etc/nginx/sites-available/my_site.conf /etc/nginx/sites-enabled/
```

##### Test NGINX Configuration

Before reloading NGINX, it’s important to check for syntax errors:

```bash
sudo nginx -t
```

If there are no errors, you should see `nginx: configuration file /etc/nginx/nginx.conf test is successful`.

##### Reload NGINX

To apply the changes, reload the NGINX service:

```bash
sudo systemctl reload nginx
```

#### 3. Handle SSL/TLS (HTTPS) with Let’s Encrypt (Optional)

If you want to enable SSL (HTTPS) for your reverse proxy, you can use **Let’s Encrypt** to generate free SSL certificates.

1. Install Certbot (Let’s Encrypt client):

```bash
sudo apt install certbot python3-certbot-nginx
```

2. Obtain an SSL certificate for your domain:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

This command will automatically configure NGINX to use SSL, and it will handle the renewal of the certificate for you.

3. Once the certificate is installed, NGINX will automatically be updated with HTTPS configuration.

#### 4. Additional Reverse Proxy Configuration

##### Load Balancing (Multiple Backend Servers)

To distribute the load across multiple backend servers, you can configure NGINX to use a **load balancing** method (round-robin, least_conn, etc.).

Example with 2 backend servers:

```nginx
http {
    upstream backend {
        # Define multiple backend servers
        server backend1.example.com:3000;
        server backend2.example.com:3000;
    }

    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://backend;

            # Proxy headers (same as before)
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

##### WebSocket Support

If you’re using **WebSockets** (e.g., in real-time applications), ensure NGINX supports upgrading the connection:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;

        # Enable WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

##### Handling Static Files

If your backend server is serving static files (e.g., images, CSS, JavaScript), you can serve them directly from NGINX instead of proxying all requests to the backend server.

```nginx
server {
    listen 80;
    server_name example.com;

    # Serve static files directly from NGINX
    location /static/ {
        root /var/www/html;
    }

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

#### 5. Monitor and Troubleshoot

NGINX provides useful logs that can help you troubleshoot any issues. The default location for access and error logs is:

- **Access log**: `/var/log/nginx/access.log`
- **Error log**: `/var/log/nginx/error.log`

You can tail these logs to monitor incoming requests:

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Summary

Setting up NGINX as a reverse proxy is a powerful way to handle multiple backend servers, secure connections with SSL, and manage load balancing. The basic steps involve:

1. **Install NGINX** and configure the reverse proxy with `proxy_pass`.
2. Optionally, **set up SSL** using Let’s Encrypt for HTTPS.
3. **Enable Load Balancing** if needed by using the `upstream` directive.
4. **Serve static files** and ensure WebSocket support for real-time applications.

NGINX's high performance and flexibility make it an excellent choice for acting as a reverse proxy for a wide variety of backend services.
