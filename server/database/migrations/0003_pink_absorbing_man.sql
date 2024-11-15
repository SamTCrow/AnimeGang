PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`nickname` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`avatar` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text,
	`verified` integer DEFAULT false
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "name", "nickname", "password", "email", "avatar", "createdAt", "updatedAt", "verified") SELECT "id", "name", "nickname", "password", "email", "avatar", "createdAt", "updatedAt", "verified" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_nickname_unique` ON `user` (`nickname`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);