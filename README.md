# Backend Engineering Evaluation Submission

This repository contains the completion of two backend microservice tasks: a **Campus Notification System** and a **Vehicle Maintenance Scheduler**.

## 📁 Project Structure

The project is divided into two distinct microservices, along with root-level authentication scripts.
```text
RA2311003020559/
├── campus_notifications/          # Task 1: Priority Inbox & Design
│   ├── middleware.js              # Custom Express logging middleware
│   ├── priority_inbox.js          # Sorting algorithm for urgent alerts
│   ├── notification_system_design.md # System architecture documentation
│   └── stage6_output.png          # Terminal output of sorted inbox
│
├── vehicle_scheduling/            # Task 2: DP Optimization
│   ├── scheduler.js               # 0/1 Knapsack optimization algorithm
│   └── scheduler_output.png       # Terminal output of optimal budget use
│
├── 1_register.js                  # API Registration script
├── 2_login.js                     # API Authentication script
├── .gitignore                     # Git configuration
└── package.json                   # Root dependencies
