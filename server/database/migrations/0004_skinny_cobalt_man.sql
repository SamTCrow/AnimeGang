ALTER TABLE `user` RENAME COLUMN "nickname" TO "username";--> statement-breakpoint
DROP INDEX IF EXISTS `user_nickname_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);