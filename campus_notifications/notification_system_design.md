# Campus Notification System Design

## Stage 1: API & Real-time Delivery
- **API Design**: `GET /notifications` to fetch and `PATCH /notifications/:id` to update status.
- **Real-time**: Implementing WebSockets for instant campus updates without constant polling.

## Stage 2: Database Storage
- **Storage**: Using PostgreSQL for relational data integrity and structured queries.
- **Schema**: `Notifications(id, studentID, notificationType, message, isRead, createdAt)`.

## Stage 3: Database Optimization
- **Optimization**: The slow query needs a **Composite Index** on `(studentID, isRead, createdAt)` to speed up lookups.
- **Placement Query**: `SELECT * FROM notifications WHERE notificationType = 'Placement' AND createdAt >= NOW() - INTERVAL '7 days';`

## Stage 4: Performance
- **Performance**: Use **Redis Caching** for unread counts to significantly reduce database load on frequent page refreshes.

## Stage 5: Scalability
- **Scalability**: Replace the synchronous loop with an **Asynchronous Message Queue** (like RabbitMQ or Kafka) to distribute the load and handle 50,000 notifications without crashing the server.

## Stage 6: Priority Inbox Logic (Implementation)
- **Data Fetching**: Consumed the external evaluation API using an authenticated Bearer token.
- **Sorting Algorithm**: Implemented a weighted sorting mechanism on the client side to prioritize high-value alerts.
  - **Weights Applied**: `Placement` (3), `Result` (2), `Event` (1).
  - **Execution**: Data is sorted primarily by Weight (descending) and secondarily by `Timestamp` (newest first) to ensure the top 10 notifications surfaced are always the most critical and recent.