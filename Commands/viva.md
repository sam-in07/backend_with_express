Here is a **short and clear explanation** of each topic for your viva:

---

## **1. What is Authentication?**

Authentication is the process of verifying the identity of a user or system.
It ensures that only authorized users can access certain data or features.
Common methods include **username/password**, **tokens (JWT)**, **OAuth**, or **biometrics**.

---

## **2. APIs We Need to Build for Authentication**

Typical authentication system requires these APIs:

1. **Register (Signup):**

   * Creates a new user account.
   * Stores user details like name, email, password (hashed).

2. **Login:**

   * Verifies user credentials.
   * Returns a token (like JWT) if login is successful.

3. **Logout (optional):**

   * Invalidates user’s token or session.

4. **Get User / Me endpoint:**

   * Fetches the currently logged-in user’s information using the token.

5. **Refresh Token (optional):**

   * Gives a new access token when the old one expires.

---

## **3. How to Pass Data Through a Request**

There are three main ways to pass data to a backend API:

1. **Query Parameters:**
   `GET /users?search=rahul`
   Used for filtering or searching.

2. **Route Parameters:**
   `GET /users/:id`
   Used for identifying specific resources.

3. **Body (JSON):**
   Sent in POST/PUT requests.
   Example:

   ```json
   {
     "email": "test@example.com",
     "password": "123456"
   }
   ```

4. **Headers:**
   Used for metadata like `Authorization: Bearer <token>`.

---

## **4. Intro to Data Validation and Zod**

**Data validation** ensures the data sent by the user is correct, safe, and in the right format.

**Zod** is a TypeScript-first validation library that:

* Checks data types (string, number, email, etc.)
* Ensures required fields are present
* Provides clear error messages

Example:

```ts
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
```

---

## **5. Insert Into Database With Prisma**

Prisma is an ORM (Object Relational Mapping) tool used with Node.js.

To insert data into the database:

1. Import the Prisma client.
2. Use Prisma models to create records.

Example:

```ts
const user = await prisma.user.create({
  data: {
    email: "test@example.com",
    password: "hashedpassword"
  }
});
```

Prisma automatically handles SQL queries internally.

---

Prisma ব্যবহার করি কারণ এটি ডাটাবেসের কাজকে খুব সহজ, পরিষ্কার ও ত্রুটিমুক্ত করে এবং টাইপ-সেফটির মাধ্যমে ভুল হওয়ার সম্ভাবনা কমায়। এছাড়া এটি অটো-মাইগ্রেশন দেয়, যা ডেভেলপমেন্টকে আরও দ্রুত ও সুবিধাজনক করে।


Zod ব্যবহার করি কারণ এটি ইউজারের ইনপুট ডাটা ঠিক আছে কিনা যাচাই করে এবং ভুল বা ক্ষতিকর ডাটা API-তে ঢুকতে দেয় না। এটি টাইপ ও ফরম্যাট চেক করে আগেই ভুল ধরতে সাহায্য করে।


**## Viva part 2 **

Here are the **1–2 line Bangla viva-ready answers**:

---

## ⭐ **1. CRUD Operations with Prisma (Bangla)**

**Prisma দিয়ে CRUD মানে ডাটাবেসে Create, Read, Update, Delete কাজগুলো খুব সহজ ও টাইপ-সেফভাবে করা যায়, যেখানে কোড লেখা অনেক কম লাগে।**

---

## ⭐ **2. Remaining Authentication APIs (Bangla)**

**Sign-up ছাড়া Login, Logout, /me এবং Refresh Token API বানিয়ে পুরো অথেন্টিকেশন সিস্টেম সম্পূর্ণ করা হয়।**

---

## ⭐ **3. JSON Web Token (JWT) (Bangla)**

**JWT হলো লগইনের পরে সার্ভার থেকে পাওয়া একটি নিরাপদ টোকেন, যা ব্যবহারকারী প্রতিটি রিকোয়েস্টে পাঠায় এবং সার্ভার টোকেন দেখে ইউজারকে চিনে।**

---

## ⭐ **4. Middlewares in Express (Bangla)**

**Middleware হলো এমন একটি ফাংশন যা রিকোয়েস্ট আসার পরে এবং রেসপন্স যাওয়ার আগে চলে—এটি লগইন চেক, ডাটা ভ্যালিডেশন বা এরর হ্যান্ডলিংয়ের মতো কাজ করতে ব্যবহৃত হয়।**

---


