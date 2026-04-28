#!/usr/bin/env bash
# setup-ec2.sh — Run once on a fresh Ubuntu EC2 instance (ubuntu@3.235.47.30)
# Usage: bash setup-ec2.sh

set -euo pipefail

APP_DIR="/var/www/gh-aws"
SERVICE="gh-aws"
PORT=3000
USER="ubuntu"

echo "==> Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "==> Creating app directory..."
sudo mkdir -p "$APP_DIR"
sudo chown "$USER:$USER" "$APP_DIR"

echo "==> Writing systemd service unit..."
sudo tee /etc/systemd/system/${SERVICE}.service > /dev/null <<EOF
[Unit]
Description=AIFormación — Next.js standalone app
After=network.target

[Service]
Type=simple
User=${USER}
WorkingDirectory=${APP_DIR}
ExecStart=/usr/bin/node ${APP_DIR}/server.js
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=${SERVICE}
Environment=NODE_ENV=production
Environment=PORT=${PORT}
Environment=HOSTNAME=0.0.0.0

[Install]
WantedBy=multi-user.target
EOF

echo "==> Enabling and starting service..."
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE"
sudo systemctl start "$SERVICE"

echo ""
echo "✅  Service '${SERVICE}' running on port ${PORT}"
echo "    Check status : sudo systemctl status ${SERVICE}"
echo "    Follow logs  : sudo journalctl -u ${SERVICE} -f"
echo ""
echo "==> (Optional) Install nginx as reverse proxy:"
echo "    sudo apt-get install -y nginx"
echo "    sudo tee /etc/nginx/sites-available/${SERVICE} > /dev/null <<'NGINX'"
echo "    server {"
echo "        listen 80;"
echo "        server_name _;"
echo "        location / {"
echo "            proxy_pass http://localhost:${PORT};"
echo "            proxy_http_version 1.1;"
echo "            proxy_set_header Upgrade \$http_upgrade;"
echo "            proxy_set_header Connection 'upgrade';"
echo "            proxy_set_header Host \$host;"
echo "            proxy_cache_bypass \$http_upgrade;"
echo "        }"
echo "    }"
echo "    NGINX"
echo "    sudo ln -s /etc/nginx/sites-available/${SERVICE} /etc/nginx/sites-enabled/"
echo "    sudo nginx -t && sudo systemctl reload nginx"
