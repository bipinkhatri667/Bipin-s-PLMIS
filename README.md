# SLMS — Self Learning Management System

Single-user self-directed learning application built with PHP 8.2+, MySQL 8+, HTML, CSS and vanilla JavaScript.

## Included in this release
- Single-owner login (no instructor, student or administrator roles)
- Collapsible sidebar and adaptive light/dark theme
- Dashboard with learning KPIs and recent activity
- Courses and subjects
- Personal resource library
- MCQ question creation, practice attempts and incorrect-answer revision list
- Learning goals and tasks
- Learning journal
- Analytics page
- Optional AI assistant endpoint (disabled until configured)
- JSON data export and SQL backup instructions
- PWA manifest and service worker

## Requirements
- PHP 8.2+ with PDO MySQL and fileinfo extensions
- MySQL 8.0+
- Apache/Nginx (XAMPP is suitable for local development)

## Installation (XAMPP)
1. Copy the `SLMS` folder into `C:\xampp\htdocs\`.
2. Start Apache and MySQL.
3. Open phpMyAdmin and import `database/schema.sql`.
4. Edit `config/config.php` with your database credentials and `APP_URL`.
5. Ensure `storage/uploads/` is writable by the web server.
6. Visit `http://localhost/SLMS/setup.php`.
7. Create your single owner account. The setup page disables itself after an account is created.
8. Visit `http://localhost/SLMS/`.

## Security notes
- Change `APP_KEY` to a long random secret before deployment.
- Use HTTPS on a public server.
- Keep `storage/` inaccessible from the public web. The included `.htaccess` blocks direct access on Apache.
- Configure regular database and file backups.
- The AI assistant is intentionally inactive until an API key and endpoint are configured. Never put an API key in browser JavaScript.
- This starter release does not provide password reset email or multi-device synchronization.

## AI configuration
Set `AI_ENABLED` to `true`, then set `AI_API_URL`, `AI_API_KEY` and `AI_MODEL` in `config/config.php` to an API endpoint compatible with the documented chat-completions request format. Keep the key server-side.

## PWA
Serve the app from localhost or HTTPS. Browser service workers do not work reliably from ordinary HTTP hosting. The service worker caches the application shell; private database content and uploaded documents are not automatically cached offline.

## Main structure
- `index.php`: authenticated application shell and routing
- `setup.php`: one-time owner account creation
- `login.php`, `logout.php`: authentication
- `pages/`: application screens
- `api/`: JSON endpoints
- `config/`: configuration and database connection
- `includes/`: shared helpers and layout
- `assets/`: CSS, JavaScript and icons
- `database/schema.sql`: complete database schema
- `storage/`: private uploads and backups

## Important
This is a functional starter application intended for local installation and iterative extension. Review security, hosting permissions, backups and AI provider compatibility before exposing it publicly.
