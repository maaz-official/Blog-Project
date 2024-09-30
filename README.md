
# Blog-Project

A modern blogging platform that allows users to create, edit, and publish blog posts with a variety of features such as tagging, commenting, SEO optimization, and social interactions like following authors, liking, and sharing posts. This project is built using TypeScript, Node.js, and MongoDB as the database.


<p align="center">
  <img src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif" alt="Blog GIF" width="300">
</p>

<img align="right" alt="coding" width="400" src="https://user-images.githubusercontent.com/55389276/140866485-8fb1c876-9a8f-4d6a-98dc-08c4981eaf70.gif">

## 🚀 Features

- 🔐 **User Authentication** (Login/Signup with JWT, OAuth, Two-Factor Authentication)
- 📝 **CRUD functionality for blog posts** with drafts and publishing options
- 🏷️ **Tagging and categorization system** for blog posts
- 💬 **Comments section** for each blog post with nested replies and likes
- 🌐 **SEO optimization** with meta tags for each post
- 📱 **Mobile-friendly responsive design**
- 📄 **Pagination** for blog post listings
- 👥 **Follow system** to follow other users/authors
- 🧑‍💼 **User Profile** for managing posts, followers, following, and profile settings
- ❤️ **Heart (Like)** functionality for liking blog posts and comments
- 🔗 **Share functionality** to share blog posts via social platforms
- 📚 **Categories** for organizing posts based on topics
- 📱 **Social media-friendly sharing options**
- 📈 **View post analytics** (views, likes, and comment tracking)
- 🛠️ **Admin functionality** for managing users, posts, and content moderation
- 🧰 **Content moderation** with reporting and reviewing tools for posts and comments
- 🚨 **Security features**: rate limiting, 2FA, CSRF protection, input sanitization
- 🔒 **Role-based access control** to secure privileged actions

<p align="center">
  <img src="https://media.giphy.com/media/fVdGnPNYlvkX9xtHuR/giphy.gif" alt="Blogging GIF" width="400">
</p>

## 🛠️ Project Contribution Workflow

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
1. Create a new branch:
Use the following command to create a new feature branch:

   ```bash
git checkout -b feature-branch-name
   ```
Replace feature-branch-name with whatever you want to name your branch (e.g., new-feature or bugfix).

2. Add your changes:
Make sure your changes are staged:

   ```bash
git add .
   ```
3. Commit your changes:
Commit your staged changes:
   ```bash
git commit -m "Your commit message"
   ```
4. Push the new branch to the remote repository:
Now push your newly created branch to the remote repository:
   ```bash
git push origin feature-branch-name
   ```


1. Fetch the latest changes:
First, ensure you have the latest changes from the remote repository, including the new branch your friend created:

git fetch origin
2. Check the branch list:
Check if the new branch exists locally after fetching:

git branch -a
You should see the new branch your friend created, likely listed as origin/branch-name.

3. Switch to the main branch:
Ensure you're on the main branch before merging:

git checkout main
4. Pull the latest changes to your main branch:
Make sure your main branch is up to date with the remote repository:

git pull origin main
5. Merge the feature branch into main:
Now, merge the changes from your friend’s branch into the main branch:

git merge origin/feature-new-design
Replace branch-name with the name of the branch your friend pushed.

6. Resolve any merge conflicts (if necessary):
If there are any conflicts, Git will notify you. You’ll need to open the conflicted files, resolve them, and then commit the changes.

To mark the conflicts as resolved:
git add .
git commit -m "Resolved merge conflicts"
7. Push the changes to the remote main branch:
After merging, push the updated main branch back to the remote repository:
git push origin main

## Contributors ✨

A heartfelt thank you to all the amazing contributors who have helped make this project a success! 🙌 Your efforts are greatly appreciated!

### Contributors Table

<table>
  <thead>
    <tr>
      <th style="text-align:left; padding: 10px; background-color: #f2f2f2;">Contributor</th>
      <th style="text-align:left; padding: 10px; background-color: #f2f2f2;">GitHub Profile</th>
      <th style="text-align:left; padding: 10px; background-color: #f2f2f2;">Contributions</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>
        <strong>@maaz-official</strong>
        <br>
        <img src="https://github.com/maaz-official.png?size=32" alt="Maaz Official's Avatar" width="32" height="32">
      </td>
      <td>
        <a href="https://github.com/maaz-official" target="_blank">View Profile</a>
      </td>
      <td>
        <span style="color: #ffeb3b; font-weight: bold;">🌟 New Features</span><br>
        <span style="color: #ff5722; font-weight: bold;">🐛 Bug Fixes</span><br>
        <span style="color: #2196f3; font-weight: bold;">📝 Code Reviews</span><br>
        <span style="color: #f44336; font-weight: bold;">🔍 Extensive Testing & Feedback</span>
      </td>
    </tr>
    <tr>
      <td>
        <strong>@ameer-hamza26</strong>
        <br>
        <img src="https://github.com/ameer-hamza26.png?size=32" alt="Ameer Hamza's Avatar" width="32" height="32">
      </td>
      <td>
        <a href="https://github.com/ameer-hamza26" target="_blank">View Profile</a>
      </td>
      <td>
        <span style="color: #3f51b5; font-weight: bold;">📚 Documentation</span><br>
        <span style="color: #4caf50; font-weight: bold;">🎨 Amazing Design Work</span>
      </td>
    </tr>
    
  </tbody>
</table>

### Special Thanks to:

- **@maaz-official** for extensive testing and feedback! 🔍
- **@ameer-hamza26** for their amazing design work! 🎨



## 🖥️ Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Frontend**: React.js, HTML, CSS
- **Database**: MongoDB
- **Authentication**: JWT for access and refresh tokens, OAuth, Two-Factor Authentication
- **State Management**: Redux
- **Hosting**: AWS EC2 (or your hosting service)

<p align="center">
  <img src="https://media.giphy.com/media/jTNG3RF6EwbkpD4LZx/giphy.gif" alt="Technology GIF" width="300">
</p>

## 💡 Prerequisites

- Node.js (v22 or higher)
- MongoDB (v4.4 or higher)
- Redux (for state management)

## 🚀 Getting Started

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

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login`: User login
- `POST /api/auth/signup`: User signup
- `POST /api/auth/logout`: User logout
- `POST /api/auth/2fa-setup`: Two-Factor Authentication setup
- `POST /api/auth/2fa-verify`: Verify Two-Factor Authentication

### Blog Posts

- `GET /api/posts`: Get all blog posts
- `POST /api/posts`: Create a new blog post
- `GET /api/posts/:id`: Get a single blog post
- `PUT /api/posts/:id`: Update a blog post
- `DELETE /api/posts/:id`: Delete a blog post
- `POST /api/posts/:id/draft`: Save post as draft
- `POST /api/posts/:id/publish`: Publish draft post

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
- `DELETE /api/users/:id/profile`: Soft delete user profile

### Social Interaction

- `POST /api/posts/:id/like`: Like (heart) a post
- `POST /api/posts/:id/unlike`: Unlike a post
- `POST /api/posts/:id/share`: Share a post on social media
- `POST /api/posts/:id/bookmark`: Bookmark a post

### Comments

- `POST /api/posts/:postId/comments`: Add a comment to a blog post
- `DELETE /api/posts/:postId/comments/:commentId`: Delete a comment
- `POST /api/posts/:postId/comments/:commentId/like`: Like a comment

### Admin

- `GET /api/admin/users`: Get all users
- `POST /api/admin/users/:id/ban`: Ban a user
- `POST /api/admin/users/:id/unban`: Unban a user
- `GET /api/admin/reports/posts`: View reported posts
- `POST /api/admin/reports/posts/:id/review`: Review reported post

## 📄 License

This project is licensed under the MIT License.

---

Feel free to contribute and make this platform better! ✨
