#!/bin/bash
echo "Setting up environment..."
npm install --legacy-peer-deps 
echo "Setting up database..."
npm run prisma:generate
echo "Setting up database...OK"
echo "Seeding database..."
npx prisma db seed
echo "Seeding database...OK"
echo "Starting the server..."
npm run dev

