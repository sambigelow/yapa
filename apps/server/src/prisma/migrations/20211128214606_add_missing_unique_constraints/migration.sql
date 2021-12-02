/*
  Warnings:

  - A unique constraint covering the columns `[episodeGuid,subscriptionId]` on the table `PlayedEpisode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feedUrl,userProfileId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayedEpisode_episodeGuid_subscriptionId_key" ON "PlayedEpisode"("episodeGuid", "subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_feedUrl_userProfileId_key" ON "Subscription"("feedUrl", "userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");
