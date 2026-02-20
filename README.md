🚀 DevOps Capstone Project
End-to-End CI/CD Pipeline for a Node.js Web Application
📌 Project Overview

This project demonstrates a complete End-to-End DevOps pipeline for a Node.js web application using modern DevOps tools and practices.

The pipeline automates:

Code integration

Docker image build & push

Static code analysis

Deployment to AWS EC2

Monitoring & visualization

Log automation using cron jobs

This project simulates a real-world Continuous Integration and Continuous Deployment (CI/CD) workflow.

🏗️ Architecture Flow
Developer → GitHub → Jenkins (CI/CD) → Docker Hub → AWS EC2 (App Server)
                                              ↓
                                   Prometheus → Grafana
                                              ↓
                                   Bash Scripts + Cron Jobs
🛠️ Tech Stack
Layer	Tools Used
Source Control	Git, GitHub
CI/CD	Jenkins (EC2)
Code Quality	SonarScanner
Containerization	Docker
Image Registry	Docker Hub
Infrastructure	AWS EC2 (Ubuntu)
Monitoring	Prometheus, Node Exporter, Grafana
Automation	Bash Scripting + Cron Jobs
📦 Application

Language: Node.js

Type: Single container web application

Hosted on: AWS EC2 (Docker container)

🔄 CI/CD Pipeline Workflow
1️⃣ Developer Push

Code is pushed to GitHub repository

GitHub Webhook triggers Jenkins automatically

2️⃣ Jenkins Pipeline Stages

The Jenkins pipeline includes:

✅ Stage 1 – Code Checkout

Pulls latest code from GitHub

✅ Stage 2 – SonarQube Scan

Runs SonarScanner for static code analysis

Ensures code quality and detects vulnerabilities

✅ Stage 3 – Build Docker Image

Builds Docker image using Dockerfile

✅ Stage 4 – Push to Docker Hub

Authenticates with Docker Hub

Pushes the latest image

✅ Stage 5 – Deploy to EC2

Jenkins connects via SSH to App EC2

Pulls latest image

Stops old container

Runs new container

Deployment is fully automated on every commit.

🐳 Docker

Dockerfile builds the Node.js application container.

Commands used:

docker build -t username/app-name:latest .
docker push username/app-name:latest

Container runs on:

http://<EC2_PUBLIC_IP>:<PORT>
☁️ AWS Infrastructure

Two EC2 Instances:

Jenkins Server EC2

Application Server EC2

Both running Ubuntu.

Security groups configured for:

22 (SSH)

3000 / App port

9090 (Prometheus)

9100 (Node Exporter)

3000 (Grafana)

📊 Monitoring Setup
🔹 Node Exporter

Installed on Application EC2
Exposes system metrics on:

http://<APP_EC2_IP>:9100/metrics
🔹 Prometheus

Installed on Monitoring EC2
Scrapes metrics from Node Exporter

Access:

http://<PROMETHEUS_IP>:9090
🔹 Grafana

Connected to Prometheus as Data Source
Imported Dashboard ID: 1860 (Node Exporter Full)

Access:

http://<GRAFANA_IP>:3000

Metrics monitored:

CPU usage

RAM usage

Disk usage

Network traffic

System load

🔁 Automation with Bash & Cron

Created custom shell scripts for:

Log cleanup

Backup automation

DevOps maintenance tasks

Cron job configured:

0 2 * * * /home/ubuntu/devops_automation.sh >> /home/ubuntu/cron.log 2>&1

Runs daily at 2 AM.
