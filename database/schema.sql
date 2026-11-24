CREATE DATABASE IF NOT EXISTS slms_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE slms_database;

CREATE TABLE users (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 email VARCHAR(190) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE courses (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 description TEXT NULL,
 category VARCHAR(100) DEFAULT 'General',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE subjects (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 course_id BIGINT UNSIGNED NOT NULL,
 name VARCHAR(180) NOT NULL,
 description TEXT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE chapters (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 subject_id BIGINT UNSIGNED NOT NULL,
 title VARCHAR(200) NOT NULL,
 sort_order INT DEFAULT 0,
 FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE lessons (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 chapter_id BIGINT UNSIGNED NOT NULL,
 title VARCHAR(200) NOT NULL,
 content LONGTEXT NULL,
 estimated_minutes INT DEFAULT 0,
 status ENUM('not_started','in_progress','completed') DEFAULT 'not_started',
 completed_at DATETIME NULL,
 FOREIGN KEY(chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE resources (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(255) NOT NULL,
 resource_type VARCHAR(40) NOT NULL DEFAULT 'link',
 source_url TEXT NULL,
 file_path VARCHAR(255) NULL,
 description TEXT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE tags (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 tag_name VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE resource_tags (
 resource_id BIGINT UNSIGNED NOT NULL,
 tag_id BIGINT UNSIGNED NOT NULL,
 PRIMARY KEY(resource_id,tag_id),
 FOREIGN KEY(resource_id) REFERENCES resources(id) ON DELETE CASCADE,
 FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bookmarks (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 resource_id BIGINT UNSIGNED NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_bookmark(resource_id),
 FOREIGN KEY(resource_id) REFERENCES resources(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE questions (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 subject_id BIGINT UNSIGNED NULL,
 topic_id BIGINT UNSIGNED NULL,
 question_text TEXT NOT NULL,
 correct_option CHAR(1) NOT NULL,
 explanation TEXT NULL,
 difficulty ENUM('easy','medium','hard') DEFAULT 'medium',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
 INDEX idx_question_subject(subject_id)
) ENGINE=InnoDB;

CREATE TABLE options (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 question_id BIGINT UNSIGNED NOT NULL,
 option_label CHAR(1) NOT NULL,
 option_text TEXT NOT NULL,
 UNIQUE KEY uq_question_option(question_id,option_label),
 FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE attempts (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 total_questions INT NOT NULL,
 correct_answers INT NOT NULL,
 score_percent DECIMAL(5,2) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE responses (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 attempt_id BIGINT UNSIGNED NOT NULL,
 question_id BIGINT UNSIGNED NOT NULL,
 selected_option CHAR(1) NULL,
 is_correct TINYINT(1) NOT NULL DEFAULT 0,
 FOREIGN KEY(attempt_id) REFERENCES attempts(id) ON DELETE CASCADE,
 FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE,
 INDEX idx_response_question(question_id)
) ENGINE=InnoDB;

CREATE TABLE revision_items (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 question_id BIGINT UNSIGNED NOT NULL,
 source_attempt_id BIGINT UNSIGNED NULL,
 next_review_at DATETIME NOT NULL,
 review_count INT NOT NULL DEFAULT 0,
 last_reviewed_at DATETIME NULL,
 UNIQUE KEY uq_revision_question(question_id),
 FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE,
 FOREIGN KEY(source_attempt_id) REFERENCES attempts(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE goals (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 description TEXT NULL,
 target_date DATE NULL,
 priority ENUM('low','medium','high') DEFAULT 'medium',
 status ENUM('active','completed','paused') DEFAULT 'active',
 completed_at DATETIME NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE tasks (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 description TEXT NULL,
 task_date DATE NOT NULL,
 priority ENUM('low','medium','high') DEFAULT 'medium',
 status ENUM('active','completed') DEFAULT 'active',
 completed_at DATETIME NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_tasks_date(task_date)
) ENGINE=InnoDB;

CREATE TABLE study_logs (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 subject_id BIGINT UNSIGNED NULL,
 activity VARCHAR(150) NOT NULL,
 start_time DATETIME NOT NULL,
 duration_minutes INT NOT NULL,
 notes TEXT NULL,
 FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE lesson_progress (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 lesson_id BIGINT UNSIGNED NOT NULL UNIQUE,
 status ENUM('not_started','in_progress','completed') DEFAULT 'not_started',
 completed_at DATETIME NULL,
 FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE journal (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 entry_date DATE NOT NULL,
 title VARCHAR(200) NOT NULL,
 subject VARCHAR(150) NULL,
 content LONGTEXT NULL,
 reflection TEXT NULL,
 next_action TEXT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE settings (
 setting_key VARCHAR(100) PRIMARY KEY,
 setting_value TEXT NULL
) ENGINE=InnoDB;
