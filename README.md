# 🏭 Inventory Management

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> A modern, full-stack inventory management solution built with cutting-edge technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Author](#author)

## 🔍 Overview

This inventory management system provides businesses with a comprehensive solution to track, manage, and analyze their inventory. With a responsive user interface and powerful backend, it allows for real-time updates, detailed reporting, and seamless integration with existing systems.

## 🛠️ Tech Stack

### 🎨 Frontend

- **⚛️ Next.js** - React framework for server-side rendering and static site generation
- **🎭 TailwindCSS** - Utility-first CSS framework
- **📊 Recharts** - Composable charting library built on React components
- **🧩 Material UI** - React component library implementing Material Design

### 🔧 Backend

- **🟢 Node.js** - JavaScript runtime environment
- **🚂 Express.js** - Web application framework for Node.js
- **🔼 Prisma** - Next-generation ORM for Node.js and TypeScript
- **🐘 PostgreSQL** - Advanced open-source relational database

### ☁️ DevOps & Infrastructure

- **🌐 AWS Ecosystem:**
  - **💾 RDS** - Managed relational database service
  - **🖥️ EC2** - Virtual servers in the cloud
  - **🔒 VPC** - Isolated cloud resources
  - **🔌 API** Gateway - Create, publish, and manage APIs at any scale
  - **⚡ Amplify** - Platform to build and deploy full-stack applications
- **🔄 PM2** - Production process manager for Node.js applications

## ✨ Features

- **📱 User-friendly Dashboard** - Visual representation of inventory metrics
- **⏱️ Real-time Inventory Tracking** - Monitor stock levels as changes occur
- **📦 Product Management** - Add, edit, and remove products from inventory
- **📈 Reporting & Analytics** - Generate insights with customizable reports
- **👥 Supplier Management** - Keep track of supplier information and performance

## 📥 Installation

1. Clone the repository

```bash
git clone https://github.com/corb0140/inventory-management.git
cd inventory_management
```

2. Install dependencies

```bash
# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

3. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/inventory_db"

# AWS Configuration (if applicable)
AWS_REGION=
```

## ▶️ Running the Application

### 💻 Development Mode

```bash
# Run backend server
npm run dev

# Run frontend in a separate terminal
npm run dev
```

## 🌐 Deployment

This application is configured for deployment on AWS:

1. Set up a PostgreSQL database on AWS RDS
2. Deploy the Node.js backend on EC2 instances
3. Configure the VPC for security and proper networking
4. Use PM2 to manage the Node.js processes

Detailed deployment instructions:

```bash
# Set up database migrations on production
npx prisma migrate deploy

# Build Next.js application
npm run build

# Start the application with PM2
pm2 start ecosystem.config.js
```

## 👨‍💻 Author

**Mark Corbin**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?style=flat&logo=github)](https://github.com/corb0140)

---

© 2025 Mark Corbin. All Rights Reserved.
