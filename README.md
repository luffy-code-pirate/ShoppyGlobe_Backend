# ShoppyGlobe Backend

Express + MongoDB Atlas + JWT backend for the ShoppyGlobe e-commerce app.

## Repo Link

https://github.com/luffy-code-pirate/ShoppyGlobe_Backend

---

## Setup

```bash
npm install
# create .env file and fill in your MongoDB URI and JWT secret
node seed.js       # populates the products collection with sample data
npm run dev        # starts on http://localhost:3000 (nodemon, auto-restarts)
```

`.env` needs:

---

## Project Structure

config/        # MongoDB connection setup

models/        # Mongoose schemas (User, Product, Cart)

middleware/    # auth.js — JWT guard for protected routes

routes/        # authRoutes, productRoutes, cartRoutes

seed.js        # Populates products collection with 10 sample products

server.js      # Entry point — connects DB and starts Express server

---

## API Routes

| Method | Route | Auth Required | Body | Notes |
|--------|-------|---------------|------|-------|
| POST | `/api/register` | No | `username`, `email`, `password` | Hashes password with bcrypt |
| POST | `/api/login` | No | `email`, `password` | Returns a JWT token |
| GET | `/api/products` | No | — | Returns all products |
| GET | `/api/products/:id` | No | — | 400 if id invalid, 404 if not found |
| POST | `/api/cart` | Yes | `productId`, `quantity` | 404 if product does not exist |
| PUT | `/api/cart/:id` | Yes | `quantity` | id is the product id, quantity cannot go below 1 |
| DELETE | `/api/cart/:id` | Yes | — | Removes product from cart |

For protected routes send `Authorization: Bearer <token>` using the token returned from `/api/login`.

---

## Testing with ThunderClient

All routes were tested using ThunderClient in VS Code.

1. Install Thunder Client extension in VS Code
2. Run **POST /api/register** to create a new user
3. Run **POST /api/login** and copy the `token` from the response
4. Run **GET /api/products** and copy a product `_id`
5. Run **POST /api/cart** with the token in Authorization header and productId in body
6. Run **PUT /api/cart/:id** with the same productId to update quantity
7. Run **DELETE /api/cart/:id** with the same productId to remove from cart

---

## MongoDB Collections

### Users
Each user has username, email and a bcrypt hashed password.

### Products
Each product has name, price, description, stock, category and imageUrl.

### Carts
Each cart belongs to one user and contains an array of items with product references and quantities.

---