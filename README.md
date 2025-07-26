# 📧 Mailora - A Single Page Mail Application

**Mailora** is a dynamic, single-page mail application built using **Django** for the backend and **JavaScript (ES6)** for frontend interactivity. Inspired by Gmail, this project demonstrates how to implement core email functionalities in a full-stack web environment.

---

## 🚀 Features

- 📥 **Inbox View**
  - Displays all received emails.
  - Unread emails appear with a white background.
  - Read emails are styled with a shaded grey background.

- 📝 **Compose Email**
  - Send new emails by entering recipient(s), subject, and body.
  - Automatically validates recipient input.

- 📤 **Sent Mailbox**
  - Lists all emails sent by the currently logged-in user.

- 📦 **Archive / Unarchive**
  - Archive or unarchive received emails to organize your inbox.

- 🔐 **User Authentication**
  - Secure user registration and login/logout system.
  - Each user has a personalized inbox experience.

- ⚡ **Single Page Application (SPA)**
  - Email views dynamically load using JavaScript without refreshing the page.

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                |
|--------------|-------------------------------------------------------------|
| 🧠 Backend   | Python, Django                                              |
| 🎨 Frontend | JavaScript (Vanilla ES6), HTML, CSS, Bootstrap 5           |
| 🗃️ Database | SQLite3 (default Django DB)                                 |

---

## 📸 Screenshots

> _Coming soon..._  
You can include screenshots of Inbox, Compose view, Archived view, etc.

---

## ▶️ How to Run Locally

1. **Clone the repo**
bash
   https://github.com/mohsinwarind/MBox.git
   cd Mbox
`

1. **Create and activate a virtual environment**
bash
   python -m venv venv
   source venv/bin/activate  # On Windows use venv\Scripts\activate
   
1. **Install dependencies**
bash
   pip install -r requirements.txt
   
1. **Run the migrations**
bash
   python manage.py migrate
   
1. **Start the server**
bash
   python manage.py runserver
   
1. **Visit in browser**

   http://127.0.0.1:8000/
   
---

## 🧪 Testing Accounts (Optional)

You can pre-register test users and add that info here, for demo purposes:

* `random1@gmail.com` / `1234`
* `random2@gmail.com` / `1234`

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it for your learning or personal projects!

---

## 💡 Inspiration

This project was built as part of learning how SPAs work with Django backends, inspired by Gmail. While it's minimal in features, it demonstrates core logic like routing, dynamic views, and basic mail CRUD operations.

---

## 🙌 Acknowledgments

* Django Documentation: [https://docs.djangoproject.com](https://docs.djangoproject.com)
* Bootstrap 5: [https://getbootstrap.com](https://getbootstrap.com)
* Harvard CS50 Web Track (Inspiration for the core structure)

---

## ✍️ Author

**[Mohsin Ramzan](https://mohsin-jade.vercel.app/)**