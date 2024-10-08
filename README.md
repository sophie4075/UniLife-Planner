## UniLife Planner 

The UniLife Planner is designed to help you navigate the chaos of university life by organizing your courses and tasks. Whether you're tracking coursework, deadlines, or assignments, this planner helps you stay on top of everything – or at least make it look like you have things under control.

UniLife Planner was developed as the final submission for the course "Internet Server Programming". It utilizes the Laravel framework and SQLite for database management.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sophie4075/UniLife-Planner.git
   
3. Navigate to the cloned directory:

   ```bash
   cd UniLife-Planner
   
5. Create `.env` file

   ```bash
   cp .env.example .env

7. Execute:

   ```bash
   composer install
   ```

9. Execute:

   ```bash
   npm install
   ```

5. Set application key:

   ```bash
   php artisan key:generate --ansi
   ```

5. Execute migrations and seed data:
    ```bash
   php artisan migrate --seed
    ```

    You should get a warning here, please hit enter to confirm in order to bring SQLite to work.
   
    <img width="754" alt="image" src="https://github.com/user-attachments/assets/70f06d42-dd11-4b52-95ed-9f9b15e1ac91">

7. Start vite server:

   ```bash
   npm run dev
   ```
    
8. Start Artisan server:

   ```bash
   php artisan serve
   ```

10. The app should now be running on
   
    ```bash
     http://localhost:8000/
    ```


## Demo Account

To explore the UniLife Planner without setting up an account, you can log in directly using the following credentials:

E-Mail: TestUser@test.com
Password: .myTestUser#1
This demo account is pre-filled with dummy data, including sample courses, tasks, and deadlines. Feel free to explore the features, make changes, and see how everything works. The data can be reset periodically, so don’t worry about breaking anything!


## Experimenting with Your Own Data
In case you want to experiment with your own (dummy) data, you may register your own user. This can be done in two ways:

1. Register via the UI
Simply use the registration form to create your account.

Note: When registering through the app, email verification is required, but since actual email verification is not configured for this demo, you’ll need to manually check the application log file to retrieve the verification link. You can find the link in the logs at storage/logs/laravel.log.

<img width="446" alt="image" src="https://github.com/user-attachments/assets/99fa1787-893a-41ee-ac09-fd2b299713e8">


2. Insert a User via the SQLite Command Line
If you'd rather insert a user directly into the database via the SQLite command line, you can follow these steps:

1. Open a terminal and navigate to your project folder.

2. Enter the SQLite shell:

```bash
sqlite3 /path/to/database.sqlite
```
   
3. Insert a user manually into the users table. Here’s an SQL command you can use, with the necessary fields:

```bash
INSERT INTO users (name, email, password, email_verified_at, created_at, updated_at)
VALUES ('YourName', 'youremail@example.com', '$2y$10$XXXXXXXXXXXXXXXXXXXXXXXXXX', datetime('now'), datetime('now'), datetime('now'));
```

- Replace 'YourName' with your desired username.
- Replace 'youremail@example.com' with your email.
- The password field requires a hashed password. You can use the bcrypt hash of your desired password. For example, here’s a bcrypt hash of the password '.myTestUser#1':

```bash
php artisan tinker
>>> bcrypt('.myTestUser#1');
```
Copy the generated hash and use it in the SQL command

4. After inserting the user, exit the SQLite shell:
```bash
   .exit
```


## Demo Screenshots
<img width="1440" alt="Bildschirmfoto 2024-09-11 um 20 33 13" src="https://github.com/user-attachments/assets/39c04932-eb94-4ec3-84c8-3f8a25db9dcb">

<img width="1440" alt="Bildschirmfoto 2024-09-11 um 20 32 40" src="https://github.com/user-attachments/assets/5c6b5c2d-c9a4-4db7-84cd-927a9869e48c">

