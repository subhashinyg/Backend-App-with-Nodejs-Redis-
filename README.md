Redis Integration Practice — Node.js / Express App

This project is a hands-on learning setup for integrating Redis caching with a Node.js + Express + MongoDB backend.
It demonstrates how to use Redis for caching database queries to improve performance and reduce DB load.


*****Features******

🔹 Node.js + Express API

🔹 MongoDB for persistent storage

🔹 Redis for in-memory caching

🔹 Environment variable configuration (.env)

🔹 Centralized Redis handler with connection management

🔹 Cache-first data fetching for user profiles

🛠️ Tech Stack

Node.js — Backend runtime

Express.js — Web framework

MongoDB / Mongoose — Database layer

Redis — Caching layer

TypeScript — Type safety

dotenv — Environment management

📁 Folder Structure
src/
 ├─ controller/
 │   └─ user/
 │       └─ user-controller.ts
 ├─ services/
 │   ├─ detail-service.ts
 │   └─ create-service.ts
 ├─ utilities/
 │   └─ handler/
 │       └─ redis-handler.ts
 ├─ app.ts
 └─ server.ts


 *****Learning Objectives*****

Understand Redis client integration in Node.js

Learn how to structure a reusable Redis handler

Implement caching logic for common API use-cases

Observe cache performance vs direct DB queries
