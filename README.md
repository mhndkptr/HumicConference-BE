# Humic Conference API

A robust RESTful API built with Express.js.

---

## 🚀 Getting Started

These instructions will get your project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your system:

- **Node.js** (version 22.18.0 or higher recommended)
- **npm** (Node Package Manager) or **yarn**
- A database system (e.g., **PostgreSQL**, **MySQL**).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mhndkptr/HumicConference-BE.git
    cd HumicConference-BE
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your configuration details.

    _Example `.env` content:_

    ```
    PORT=3000
    NODE_ENV=development
    DATABASE_URL=postgresql://userdb:secretpass@localhost:5432/humic_conference_db?schema=public
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

The server should now be running at `http://localhost:3000` (or the port specified in your `.env` file).
