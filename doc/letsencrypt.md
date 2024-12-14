Setting up **SSL/TLS** with NGINX using **OpenSSL** involves creating a **self-signed certificate** or obtaining a **certificate from a trusted CA** (Certificate Authority). In this guide, we'll cover both options step by step, including generating the SSL certificates, configuring NGINX, and enabling HTTPS on your server.

We'll start with a **self-signed certificate** (good for development or testing), and then move on to using **Let’s Encrypt** with **Certbot** for production environments (trusted certificate).

---

### 1. **Create a Self-Signed SSL Certificate with OpenSSL**

#### Step 1: Install OpenSSL (If Not Already Installed)

Most Linux distributions come with OpenSSL pre-installed, but you can install it if it's not present:

```bash
sudo apt update
sudo apt install openssl
```

#### Step 2: Generate a Self-Signed SSL Certificate

To generate a self-signed certificate, run the following commands. This will create a new SSL certificate and a private key.

```bash
# Navigate to the directory where you want to store the certificate files
cd /etc/ssl

# Create a directory for your certificate
sudo mkdir my_ssl

# Generate the private key and certificate (valid for 365 days)
sudo openssl req -x509 -newkey rsa:4096 -keyout /etc/ssl/my_ssl/mydomain.key -out /etc/ssl/my_ssl/mydomain.crt -days 365
```

During this process, you'll be prompted to enter some information, including:

- **Country Name** (2-letter code, e.g., US)
- **State or Province**
- **Locality** (City)
- **Organization Name** (Company/Organization)
- **Organizational Unit** (Optional)
- **Common Name**: The domain name (e.g., `example.com` or `www.example.com`)
- **Email Address**

This command generates two files:

- **`mydomain.crt`**: The certificate file.
- **`mydomain.key`**: The private key.

#### Step 3: Configure NGINX to Use the SSL Certificate

Now that you have your SSL certificate (`mydomain.crt`) and private key (`mydomain.key`), you need to configure NGINX to use them.

1. **Open your NGINX configuration file**:

```bash
sudo nano /etc/nginx/sites-available/default
```

2. **Update the NGINX server block to use SSL**:

Modify the configuration to look like this (substitute your file paths as needed):

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Redirect all HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;

    server_name example.com www.example.com;

    # Path to SSL certificate and key
    ssl_certificate /etc/ssl/my_ssl/mydomain.crt;
    ssl_certificate_key /etc/ssl/my_ssl/mydomain.key;

    # Enable SSL parameters (you can customize these)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
    ssl_prefer_server_ciphers off;

    # Root directory for your web content
    root /var/www/html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

- **`listen 443 ssl`**: Specifies that the server should listen on port 443 (the default HTTPS port).
- **`ssl_certificate`**: Points to the path of your certificate file (`.crt`).
- **`ssl_certificate_key`**: Points to the path of your private key file (`.key`).

3. **Test the NGINX configuration**:

```bash
sudo nginx -t
```

If you see `syntax is ok` and `test is successful`, you can proceed to the next step.

4. **Reload NGINX to apply the changes**:

```bash
sudo systemctl reload nginx
```

#### Step 4: Verify SSL is Working

Visit your domain (e.g., `https://example.com`) in a web browser. You should see the SSL padlock icon, indicating that the connection is secure. If you're using a self-signed certificate, your browser may show a warning. You can proceed by adding an exception for the certificate.

---

### 2. **Obtain an SSL Certificate from Let’s Encrypt (Recommended for Production)**

For a trusted SSL certificate in production, **Let’s Encrypt** provides free, automated SSL certificates. We'll use **Certbot** to obtain and install the certificate for NGINX.

#### Step 1: Install Certbot and NGINX Plugin

On Ubuntu or Debian-based systems, you can install Certbot and the NGINX plugin with the following commands:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

For CentOS/RHEL, you can install it with:

```bash
sudo yum install certbot python3-certbot-nginx
```

#### Step 2: Obtain SSL Certificates with Certbot

Run the following command to automatically obtain and install the SSL certificate for your domain (replace `example.com` with your actual domain):

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will:

1. Verify that you own the domain (using HTTP-01 challenge).
2. Automatically configure NGINX to use the obtained SSL certificate.

#### Step 3: Verify SSL is Working

After Certbot has configured your server, visit your domain using HTTPS (`https://example.com`) in a web browser. You should see a padlock icon indicating the SSL is active and valid.

#### Step 4: Set Up Automatic SSL Renewal

Let’s Encrypt certificates are only valid for 90 days, but you can set up automatic renewal with Certbot. Certbot automatically installs a cron job to renew certificates, but you can manually test it like this:

```bash
sudo certbot renew --dry-run
```

This simulates the renewal process and ensures it's working correctly. If successful, your certificates will be renewed automatically without any further action required.

---

### 3. **Optimize SSL Settings (Optional)**

You can improve SSL security and performance by tuning NGINX’s SSL settings.

1. **Enable HTTP/2**: HTTP/2 offers improved performance over HTTP/1.1.

```nginx
server {
    listen 443 ssl http2;
    # Rest of your config...
}
```

2. **Improve SSL Security**: Use strong cipher suites and disable weak protocols. You can also add **OCSP Stapling** for improved certificate revocation checking.

Here’s an optimized set of SSL settings:

```nginx
server {
    listen 443 ssl http2;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
    ssl_prefer_server_ciphers off;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_stapling on;
    ssl_stapling_verify on;
}
```

3. **Redirect HTTP to HTTPS**: Make sure all HTTP traffic is redirected to HTTPS:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
```

---

### Summary

1. **Self-Signed SSL Certificate**:

   - Use OpenSSL to generate a certificate and key.
   - Configure NGINX to use these files for SSL.
   - Useful for development or internal applications.

2. **Trusted SSL Certificate with Let’s Encrypt**:

   - Use Certbot to obtain a free SSL certificate from Let’s Encrypt.
   - Automatically configure NGINX for SSL.
   - Ideal for production environments.

3. **SSL Optimization**:
   - Enable HTTP/2 for improved performance.
   - Optimize SSL settings for better security.
   - Ensure automatic renewal of SSL certificates using Certbot.

Once you have set up SSL for your domain, your NGINX server will handle secure connections with HTTPS.
