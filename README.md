
# Blog-Project

A modern blogging platform that allows users to create, edit, and publish blog posts with a variety of features such as tagging, commenting, SEO optimization, and social interactions like following authors, liking, and sharing posts. This project is built using TypeScript, Node.js, and MongoDB as the database.

<p align="center">
  <img src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif" alt="Blog GIF" width="300">
</p>

<img align="right" alt="coding" width="400" src="https://user-images.githubusercontent.com/55389276/140866485-8fb1c876-9a8f-4d6a-98dc-08c4981eaf70.gif">

## Features

- User Authentication (Login/Signup with JWT)
- CRUD functionality for blog posts
- Tagging and categorization system for blog posts
- Comments section for each blog post
- SEO optimization with meta tags
- Mobile-friendly responsive design
- Pagination for blog post listings
- **Follow** system to follow other users/authors
- **User Profile** for viewing and managing posts, followers, and following
- **Heart (Like)** functionality for liking blog posts
- **Share** functionality to share blog posts via social platforms
- **Categories** for organizing posts based on topics
- Social media-friendly sharing options

## Project Contribution Workflow

1. **Clone the Repository:**
   Your friend can clone the repository using HTTPS or SSH, depending on their authentication method.

   ```bash
   git clone https://github.com/your-username/repo-name.git
   ```

   or using SSH:

   ```bash
   git clone git@github.com:your-username/repo-name.git
   ```

2. **Create a New Branch (Best Practice):**
   Before making changes, create a new branch to keep the `main` (or `master`) branch clean and stable.

   ```bash
   git checkout -b feature-branch-name
   ```

3. **Make Changes:**
   After creating the branch, your friend can make changes to the project files.

4. **Stage and Commit the Changes:**

   ```bash
   git add .

   git commit -m "Brief description of the changes"
   ```

5. **Push the Changes:**

   ```bash
   git push origin feature-branch-name
   ```

6. **Create a Pull Request (PR):**
   On GitHub:
   - Go to the repository.
   - Navigate to the **Pull requests** tab.
   - Click **New pull request** and select the branch they just pushed.

7. **Review and Merge the Pull Request:**
   Review the changes and, if everything looks good, click **Merge pull request**.

8. **Syncing Changes:**
   Pull the latest changes from the `main` branch.

   ```bash
   git checkout main
   git pull origin main
   ```

## Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Frontend**: React.js, HTML, CSS
- **Database**: MongoDB
- **Authentication**: JWT for access and refresh tokens
- **State Management**: Redux
- **Hosting**: AWS EC2 (or your hosting service)

## Prerequisites

- Node.js (v22 or higher)
- MongoDB (v4.4 or higher)
- Redux (for state management)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/maaz-official/blog-project.git
cd blog-project
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGODB_URI=your-url
JWT_SECRET=your_secret_key
PORT=5000
```

### Database Setup

1. Ensure MongoDB is installed and running locally.
2. Start MongoDB using:

```bash
mongodb
```

3. The application will automatically connect to MongoDB when it starts.

### Run the application

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### Running Tests

To run the test suite:

```bash
npm run test
```

## API Endpoints

### Authentication

- `POST /api/auth/login`: User login
- `POST /api/auth/signup`: User signup
- `POST /api/auth/logout`: User logout

### Blog Posts

- `GET /api/posts`: Get all blog posts
- `POST /api/posts`: Create a new blog post
- `GET /api/posts/:id`: Get a single blog post
- `PUT /api/posts/:id`: Update a blog post
- `DELETE /api/posts/:id`: Delete a blog post

### Tags

- `GET /api/tags`: Get all tags
- `POST /api/tags`: Create a new tag
- `PUT /api/tags/:id`: Update a tag
- `DELETE /api/tags/:id`: Delete a tag

### Categories

- `GET /api/categories`: Get all categories
- `POST /api/categories`: Create a new category
- `PUT /api/categories/:id`: Update a category
- `DELETE /api/categories/:id`: Delete a category

### User Profile

- `GET /api/users/:id`: Get user profile details
- `GET /api/users/:id/posts`: Get all posts by a user
- `POST /api/users/follow`: Follow a user
- `POST /api/users/unfollow`: Unfollow a user

### Social Interaction

- `POST /api/posts/:id/like`: Like (heart) a post
- `POST /api/posts/:id/unlike`: Unlike a post
- `POST /api/posts/:id/share`: Share a post on social media

### Comments

- `POST /api/posts/:postId/comments`: Add a comment to a blog post
- `DELETE /api/posts/:postId/comments/:commentId`: Delete a comment

## License

This project is licensed under the MIT License.

---

Feel free to contribute and make this platform better!
