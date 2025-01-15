import { and, desc, eq, ilike, isNull, or, sql } from "drizzle-orm";
import { db } from "server/app";
import { complaints } from "~/database/schema/complaints";
import { getCountForPagination } from "../utils/commonUtils";
import { joinPost, crt } from "./repositoryUtils";
import { COMPLAINT_STATUS, PAGINATION_LIMIT } from "~/shared/constants/common";

export async function getCountOfComplaints() {
  return await db.$count(complaints, isNull(complaints.status));
}

export async function getAllComplaints(query: string, page: number) {
  const totalCount = await db.$count(
    complaints,
    and(isNull(complaints.status), or(ilike(complaints.reason, `%${query}%`)))
  );

  if (totalCount === 0) {
    return { allComplaints: [], actualPage: 1, pagesCount: 1 };
  }

  const { offset, actualPage, pagesCount } = getCountForPagination(
    totalCount,
    page
  );

  const allComplaints = await db
    .select({
      id: complaints.id,
      createdAt: complaints.createdAt,
      createdById: complaints.createdById,
      reason: complaints.reason,
      complainedAboutPostId: complaints.complainedAboutPostId,
      consideredAt: complaints.consideredAt,
      consideredById: complaints.consideredById,
      status: complaints.status,
      postSlug: joinPost.postSlug,
      postTitle: joinPost.postTitle,
      postId: joinPost.postId,
      author: crt.author,
    })
    .from(complaints)
    .leftJoin(crt, eq(complaints.createdById, crt.id))
    .leftJoin(joinPost, eq(complaints.complainedAboutPostId, joinPost.postId))
    .where(isNull(complaints.status))
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .orderBy(desc(complaints.createdAt));

  return { allComplaints, actualPage, pagesCount };
}

export async function getComplaintById(complaintId: number) {
  const existingComplaint = await db
    .select({ id: complaints.id, status: complaints.status })
    .from(complaints)
    .where(eq(complaints.id, complaintId));

  return existingComplaint[0];
}

export async function complainAboutPost(
  postId: number,
  reason: string,
  userId: number
) {
  const createdComplaint = await db
    .insert(complaints)
    .values({
      reason,
      createdById: userId,
      complainedAboutPostId: postId,
    })
    .returning({ id: complaints.id, createdAt: complaints.createdAt });

  return createdComplaint[0];
}

export async function considerComplaint(
  complaintId: number,
  sessionUserId: number,
  { accept }: { accept: boolean }
) {
  const updatedComplaint = await db
    .update(complaints)
    .set({
      status: accept ? COMPLAINT_STATUS.ACCEPTED : COMPLAINT_STATUS.REJECTED,
      consideredAt: sql`NOW()`,
      consideredById: sessionUserId,
    })
    .where(eq(complaints.id, complaintId))
    .returning({ postId: complaints.complainedAboutPostId });

  return updatedComplaint[0];
}
