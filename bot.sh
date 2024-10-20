#!/bin/bash

# to folder
cd /root/marshelltap/telegram-bot || exit

#  git pull (update)
echo "Pulling latest changes from GitHub..."
git pull origin main

# install newNode.js
echo "Installing dependencies..."
npm install

# restart bot thru pm2 
echo "Restarting bot with PM2..."
pm2 restart bot || pm2 start app.js --name "bot"

# save pm2
pm2 save

echo "Update and restart completed!"