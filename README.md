# Chats

## ℹ️ General Info

This is the repository responsible for Chats apps.

## 🏭 Applications

 _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

 ## 🖍 Requirements

-   [NodeJS](https://nodejs.org/en/) (18.x.x);
-   [NPM](https://www.npmjs.com/) (9.x.x);

## 🏃‍♂️ Simple Start

1. **`npm install`** at the root
2. Fill ENVs
3. **`npm run start:dev`**
4. Enjoy ❤️

### 🌕 Technology

-   [express](https://expressjs.com/) — a backend framework.
-   [axios](https://axios-http.com/) - making request to quotes api 
-   [mongoDB](https://axios-http.com/) - a NoSQL database
-   [socket.io](https://socket.io/) - a real-time communication library.

### DB Schema

```mermaid
erDiagram
    User {
        uuid id PK
        varchar firstName
        varchar lastName
        varchar email
        varchar password
        timestamp createdAt
        timestamp updatedAt
    }
    Chat {
        uuid id PK
        varchar firstName
        varchar lastName
        uuid[] messages FK
    }
    Message {
        uuid id PK
        enum senderRole
        varchar text
        uuid chatId FK
        timestamp timestamp
    }

    %% Relationships
    Chat ||--o{ Message : contains
    Message ||--|| Chat : chatId
