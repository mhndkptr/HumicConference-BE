-- CreateEnum
CREATE TYPE "ConferenceScheduleType" AS ENUM ('ICICYTA', 'ICODSA');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('MAIN', 'PARALLEL');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('TALK', 'BREAK', 'ONE_DAY_ACTIVITY');

-- CreateEnum
CREATE TYPE "SessionModeTime" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "conference_schedules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "type" "ConferenceScheduleType" NOT NULL,
    "contact_email" TEXT NOT NULL,
    "timezone_iana" TEXT NOT NULL,
    "onsite_presentation" TEXT NOT NULL,
    "online_presentation" TEXT NOT NULL,
    "notes" TEXT,
    "no_show_policy" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "conference_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "type" "ScheduleType" NOT NULL,
    "notes" TEXT,
    "conference_schedule_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT,
    "description" TEXT,
    "type" "RoomType" NOT NULL,
    "online_meeting_url" TEXT,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "track_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track_sessions" (
    "id" TEXT NOT NULL,
    "paper_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "mode" "SessionModeTime" NOT NULL,
    "notes" TEXT,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "track_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "track_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_conference_Schedules" (
    "id" TEXT NOT NULL,
    "type" "ConferenceScheduleType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_conference_Schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_track_id_key" ON "rooms"("track_id");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_conference_schedule_id_fkey" FOREIGN KEY ("conference_schedule_id") REFERENCES "conference_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track_sessions" ADD CONSTRAINT "track_sessions_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
