import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Pencil,
  Plus,
  RefreshCw,
  Table2,
  Type,
  Upload,
  Users,
  Video,
  X,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import PortalDashboard from "../PortalDashboard";
import { useAuth } from "../../features/auth/AuthProvider";

const ACADEMY_COURSES_QUERY = gql`
  query AcademyCourses {
    academyCourses {
      id
      code
      title
      description
      durationWeeks
      isActive
      createdAt
      updatedAt
      weeks {
        id
        title
        subtitle
        description
        order
        status
        isActive
        sessions {
          id
          title
          subtitle
          description
          order
          status
          isActive
          contentBlocks {
            id
            type
            title
            textContent
            configuration
            order
            status
            isActive
            media {
              id
              sourceType
              provider
              type
              publicId
              url
              thumbnailUrl
              fileName
              format
              duration
              metadata
            }
            question {
              id
              prompt
              type
              points
              gradingMode
              correctAnswer
              explanation
              options {
                id
                text
                order
                isCorrect
              }
            }
          }
        }
      }
    }
  }
`;

const MY_ACADEMY_COURSES_QUERY = gql`
  query MyAcademyCourses {
    myAcademyCourses {
      id
      code
      title
      description
      durationWeeks
      isActive
      weeks {
        id
        title
        subtitle
        description
        order
        status
        isActive
        sessions {
          id
          title
          subtitle
          description
          order
          status
          isActive
          contentBlocks {
            id
            type
            title
            textContent
            configuration
            order
            status
            isActive
            media {
              id
              sourceType
              provider
              type
              publicId
              url
              thumbnailUrl
              fileName
              format
              duration
              metadata
            }
            question {
              id
              prompt
              type
              points
              gradingMode
              explanation
              options {
                id
                text
                order
              }
            }
          }
        }
      }
    }
  }
`;

const MARK_BLOCK_COMPLETE_MUTATION = gql`
  mutation MarkAcademyBlockComplete($contentBlockId: ID!) {
    markAcademyContentBlockComplete(contentBlockId: $contentBlockId) { id enrolledAt expiresAt }
  }
`;

const MY_ACADEMY_ASSESSMENTS_QUERY = gql`
  query MyAcademyAssessments($courseId: ID!) {
    myAcademyAssessments(courseId: $courseId) { id type title description passingScore }
  }
`;

const START_ACADEMY_ASSESSMENT_MUTATION = gql`
  mutation StartAcademyAssessment($assessmentId: ID!) {
    startAcademyAssessment(assessmentId: $assessmentId) {
      id assessmentId assessmentType title status
      questions { id prompt type points options { id text order } }
    }
  }
`;

const SUBMIT_ACADEMY_ASSESSMENT_MUTATION = gql`
  mutation SubmitAcademyAssessment($input: SubmitAcademyAssessmentInput!) {
    submitAcademyAssessment(input: $input) { passed percentage enrollment { id enrolledAt expiresAt } }
  }
`;

const BYU_REVIEW_QUEUE_QUERY = gql`
  query ByuReviewQueue {
    byuPathwayReviewQueue { id email status proofFileName proofPreviewUrl }
  }
`;

const REVIEW_BYU_MUTATION = gql`
  mutation ReviewByu($input: ReviewByuPathwayVerificationInput!) {
    reviewByuPathwayVerification(input: $input) { id status rejectionReason }
  }
`;

const CREATE_ACADEMY_ASSESSMENT_MUTATION = gql`
  mutation CreateAcademyAssessment($input: CreateAcademyAssessmentInput!) {
    createAcademyAssessment(input: $input) { id title type status }
  }
`;

const ADD_ASSESSMENT_QUESTION_MUTATION = gql`
  mutation AddAssessmentQuestion($input: AddAcademyAssessmentQuestionInput!) {
    addAcademyAssessmentQuestion(input: $input)
  }
`;

const PUBLISH_ASSESSMENT_MUTATION = gql`
  mutation PublishAcademyAssessment($id: ID!) {
    publishAcademyAssessment(id: $id) { id title status }
  }
`;

const CREATE_ACADEMY_COURSE_MUTATION = gql`
  mutation CreateAcademyCourse($input: CreateAcademyCourseInput!) {
    createAcademyCourse(input: $input) {
      id
      code
      title
      description
      durationWeeks
      isActive
      createdAt
      updatedAt
      weeks {
        id
        title
        subtitle
        description
        order
        status
        isActive
        sessions {
          id
          title
          subtitle
          description
          order
          status
          isActive
          contentBlocks {
            id
            type
            title
            textContent
            configuration
            order
            status
            isActive
          }
        }
      }
    }
  }
`;

const UPDATE_ACADEMY_COURSE_MUTATION = gql`
  mutation UpdateAcademyCourse($id: ID!, $input: UpdateAcademyCourseInput!) {
    updateAcademyCourse(id: $id, input: $input) {
      id
      code
      title
      description
      durationWeeks
      isActive
      createdAt
      updatedAt
      weeks {
        id
        title
        subtitle
        description
        order
        status
        isActive
        sessions {
          id
          title
          subtitle
          description
          order
          status
          isActive
          contentBlocks {
            id
            type
            title
            textContent
            configuration
            order
            status
            isActive
          }
        }
      }
    }
  }
`;

const CREATE_ACADEMY_WEEK_MUTATION = gql`
  mutation CreateAcademyWeek($courseId: ID!, $input: CreateAcademyWeekInput!) {
    createAcademyWeek(courseId: $courseId, input: $input) {
      id
      title
      subtitle
      description
      order
      status
      isActive
      sessions {
        id
        title
        subtitle
        description
        order
        status
        isActive
        contentBlocks {
          id
          type
          title
          textContent
          configuration
          order
          status
          isActive
        }
      }
    }
  }
`;

const UPDATE_ACADEMY_WEEK_MUTATION = gql`
  mutation UpdateAcademyWeek($id: ID!, $input: UpdateAcademyWeekInput!) {
    updateAcademyWeek(id: $id, input: $input) {
      id
      title
      subtitle
      description
      order
      status
      isActive
      sessions {
        id
        title
        subtitle
        description
        order
        status
        isActive
        contentBlocks {
          id
          type
          title
          textContent
          order
          status
          isActive
        }
      }
    }
  }
`;

const CREATE_ACADEMY_SESSION_MUTATION = gql`
  mutation CreateAcademySession(
    $weekId: ID!
    $input: CreateAcademySessionInput!
  ) {
    createAcademySession(weekId: $weekId, input: $input) {
      id
      title
      subtitle
      description
      order
      status
      isActive
      contentBlocks {
        id
        type
        title
        textContent
        configuration
        order
        status
        isActive
      }
    }
  }
`;

const UPDATE_ACADEMY_SESSION_MUTATION = gql`
  mutation UpdateAcademySession($id: ID!, $input: UpdateAcademySessionInput!) {
    updateAcademySession(id: $id, input: $input) {
      id
      title
      subtitle
      description
      order
      status
      isActive
      contentBlocks {
        id
        type
        title
        textContent
        configuration
        order
        status
        isActive
      }
    }
  }
`;

const CREATE_ACADEMY_CONTENT_BLOCK_MUTATION = gql`
  mutation CreateAcademyContentBlock(
    $sessionId: ID!
    $input: CreateAcademyContentBlockInput!
  ) {
    createAcademyContentBlock(sessionId: $sessionId, input: $input) {
      id
      type
      title
      textContent
      configuration
      order
      status
      isActive
      media {
        id
        sourceType
        provider
        type
        publicId
        url
        thumbnailUrl
        fileName
        format
        duration
        metadata
      }
      question {
        id
        prompt
        type
        points
        gradingMode
        correctAnswer
        explanation
        options {
          id
          text
          order
          isCorrect
        }
      }
    }
  }
`;

const UPDATE_ACADEMY_CONTENT_BLOCK_MUTATION = gql`
  mutation UpdateAcademyContentBlock(
    $id: ID!
    $input: UpdateAcademyContentBlockInput!
  ) {
    updateAcademyContentBlock(id: $id, input: $input) {
      id
      type
      title
      textContent
      configuration
      order
      status
      isActive
      media {
        id
        sourceType
        provider
        type
        publicId
        url
        thumbnailUrl
        fileName
        format
        duration
        metadata
      }
      question {
        id
        prompt
        type
        points
        gradingMode
        correctAnswer
        explanation
        options {
          id
          text
          order
          isCorrect
        }
      }
    }
  }
`;

type AcademyContentBlockType =
  | "TEXT"
  | "VIDEO"
  | "IMAGE"
  | "PDF"
  | "CALLOUT"
  | "TABLE"
  | "QUICK_CHECK";

type AcademyContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

type AcademyMedia = {
  id: string;
  sourceType: string;
  provider: string;
  type: string;
  publicId?: string | null;
  url: string;
  thumbnailUrl?: string | null;
  fileName?: string | null;
  format?: string | null;
  duration?: number | null;
  metadata?: unknown;
};

type AcademyQuestionOption = {
  id: string;
  text: string;
  order: number;
  isCorrect: boolean;
};

type AcademyQuestion = {
  id: string;
  prompt: string;
  type: string;
  points: number;
  gradingMode: string;
  correctAnswer?: unknown;
  explanation?: string | null;
  options: AcademyQuestionOption[];
};

type AcademyContentBlock = {
  id: string;
  type: AcademyContentBlockType;
  title?: string | null;
  textContent?: string | null;
  configuration?: unknown;
  order: number;
  status: AcademyContentStatus;
  isActive: boolean;
  media?: AcademyMedia | null;
  question?: AcademyQuestion | null;
};

type AcademySession = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  order: number;
  status: AcademyContentStatus;
  isActive: boolean;
  contentBlocks: AcademyContentBlock[];
};

type AcademyWeek = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  order: number;
  status: AcademyContentStatus;
  isActive: boolean;
  sessions: AcademySession[];
};

type AcademyCourse = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  durationWeeks: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  weeks: AcademyWeek[];
};

type AcademyCoursesData = {
  academyCourses: AcademyCourse[];
};

type MyAcademyCoursesData = {
  myAcademyCourses: AcademyCourse[];
};

type CreateAcademyCourseData = {
  createAcademyCourse: AcademyCourse;
};

type UpdateAcademyCourseData = {
  updateAcademyCourse: AcademyCourse;
};

type CreateAcademyWeekData = {
  createAcademyWeek: AcademyWeek;
};

type UpdateAcademyWeekData = {
  updateAcademyWeek: AcademyWeek;
};

type CreateAcademySessionData = {
  createAcademySession: AcademySession;
};

type UpdateAcademySessionData = {
  updateAcademySession: AcademySession;
};

type CreateAcademyContentBlockData = {
  createAcademyContentBlock: AcademyContentBlock;
};

type UpdateAcademyContentBlockData = {
  updateAcademyContentBlock: AcademyContentBlock;
};

const inputClassName =
  "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100";

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-[#003F8E]">
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </article>
  );
}

function Modal({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#003F8E]">
              {eyebrow}
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function CourseForm({
  course,
  onClose,
  onSaved,
}: {
  course?: AcademyCourse | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(course);

  const [code, setCode] = useState(course?.code ?? "");
  const [title, setTitle] = useState(course?.title ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [durationWeeks, setDurationWeeks] = useState(String(course?.durationWeeks ?? 4));
  const [formError, setFormError] = useState("");

  const [createCourse, { loading: creating }] =
    useMutation<CreateAcademyCourseData>(CREATE_ACADEMY_COURSE_MUTATION);

  const [updateCourse, { loading: updating }] =
    useMutation<UpdateAcademyCourseData>(UPDATE_ACADEMY_COURSE_MUTATION);

  const saving = creating || updating;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Course title is required.");
      return;
    }

    if (!isEditing && !code.trim()) {
      setFormError("Course code is required.");
      return;
    }

    const parsedDuration = Number(durationWeeks);
    if (!Number.isInteger(parsedDuration) || parsedDuration < 1) {
      setFormError("Course duration must be at least one week.");
      return;
    }

    try {
      if (isEditing && course) {
        await updateCourse({
          variables: {
            id: course.id,
            input: {
              title: title.trim(),
              description: description.trim() || null,
              durationWeeks: parsedDuration,
              isActive: course.isActive,
            },
          },
        });
      } else {
        await createCourse({
          variables: {
            input: {
              code: code.trim().toUpperCase(),
              title: title.trim(),
              description: description.trim() || null,
              durationWeeks: parsedDuration,
            },
          },
        });
      }

      onSaved();
      onClose();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "The course could not be saved.",
      );
    }
  };

  return (
    <Modal
      eyebrow="Academy"
      title={isEditing ? "Edit course" : "Create course"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-5 p-6">
        {!isEditing && (
          <div>
            <label
              htmlFor="academy-course-code"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Course code
            </label>

            <input
              id="academy-course-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="KATEL-001"
              className={inputClassName}
            />
          </div>
        )}

        <div>
          <label htmlFor="academy-course-duration" className="mb-2 block text-sm font-semibold text-slate-700">Course duration (weeks)</label>
          <input id="academy-course-duration" type="number" min="1" value={durationWeeks} onChange={(event) => setDurationWeeks(event.target.value)} className={inputClassName} />
        </div>

        <div>
          <label
            htmlFor="academy-course-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Course title
          </label>

          <input
            id="academy-course-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Katel Career Foundation"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-course-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="academy-course-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            placeholder="Describe what learners will gain from this course."
            className={`${inputClassName} resize-none`}
          />
        </div>

        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                {isEditing ? "Save changes" : "Create course"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function WeekForm({
  course,
  week,
  onClose,
  onSaved,
}: {
  course: AcademyCourse;
  week?: AcademyWeek | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(week);

  const [title, setTitle] = useState(week?.title ?? "");
  const [subtitle, setSubtitle] = useState(week?.subtitle ?? "");
  const [description, setDescription] = useState(week?.description ?? "");
  const [order, setOrder] = useState(
    String(week?.order ?? course.weeks.length + 1),
  );
  const [status, setStatus] = useState<AcademyContentStatus>(
    week?.status ?? "DRAFT",
  );
  const [formError, setFormError] = useState("");

  const [createWeek, { loading: creating }] =
    useMutation<CreateAcademyWeekData>(CREATE_ACADEMY_WEEK_MUTATION);

  const [updateWeek, { loading: updating }] =
    useMutation<UpdateAcademyWeekData>(UPDATE_ACADEMY_WEEK_MUTATION);

  const saving = creating || updating;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const numericOrder = Number(order);

    if (!title.trim()) {
      setFormError("Week title is required.");
      return;
    }

    if (!Number.isInteger(numericOrder) || numericOrder < 1) {
      setFormError("Week order must be a whole number starting at 1.");
      return;
    }

    try {
      if (isEditing && week) {
        await updateWeek({
          variables: {
            id: week.id,
            input: {
              title: title.trim(),
              subtitle: subtitle.trim() || null,
              description: description.trim() || null,
              order: numericOrder,
              status,
              isActive: week.isActive,
            },
          },
        });
      } else {
        await createWeek({
          variables: {
            courseId: course.id,
            input: {
              title: title.trim(),
              subtitle: subtitle.trim() || null,
              description: description.trim() || null,
              order: numericOrder,
            },
          },
        });
      }

      onSaved();
      onClose();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "The week could not be saved.",
      );
    }
  };

  return (
    <Modal
      eyebrow={course.title}
      title={isEditing ? "Edit week" : "Add week"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-5 p-6">
        <div>
          <label
            htmlFor="academy-week-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Week title
          </label>

          <input
            id="academy-week-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Week 1: Career Foundation"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-week-subtitle"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Subtitle
          </label>

          <input
            id="academy-week-subtitle"
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            placeholder="Understanding yourself, work and opportunity"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-week-order"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Week order
          </label>

          <input
            id="academy-week-order"
            type="number"
            min="1"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-week-status"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Status
          </label>

          <select
            id="academy-week-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as AcademyContentStatus)
            }
            className={inputClassName}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="academy-week-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="academy-week-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Describe the purpose of this week."
            className={`${inputClassName} resize-none`}
          />
        </div>

        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                {isEditing ? "Save week" : "Add week"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SessionForm({
  week,
  session,
  onClose,
  onSaved,
}: {
  week: AcademyWeek;
  session?: AcademySession | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(session);

  const [title, setTitle] = useState(session?.title ?? "");
  const [subtitle, setSubtitle] = useState(session?.subtitle ?? "");
  const [description, setDescription] = useState(session?.description ?? "");
  const [order, setOrder] = useState(
    String(session?.order ?? week.sessions.length + 1),
  );
  const [status, setStatus] = useState<AcademyContentStatus>(
    session?.status ?? "DRAFT",
  );
  const [formError, setFormError] = useState("");

  const [createSession, { loading: creating }] =
    useMutation<CreateAcademySessionData>(CREATE_ACADEMY_SESSION_MUTATION);

  const [updateSession, { loading: updating }] =
    useMutation<UpdateAcademySessionData>(UPDATE_ACADEMY_SESSION_MUTATION);

  const saving = creating || updating;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const numericOrder = Number(order);

    if (!title.trim()) {
      setFormError("Session title is required.");
      return;
    }

    if (!Number.isInteger(numericOrder) || numericOrder < 1) {
      setFormError("Session order must be a whole number starting at 1.");
      return;
    }

    try {
      if (isEditing && session) {
        await updateSession({
          variables: {
            id: session.id,
            input: {
              title: title.trim(),
              subtitle: subtitle.trim() || null,
              description: description.trim() || null,
              order: numericOrder,
              status,
              isActive: session.isActive,
            },
          },
        });
      } else {
        await createSession({
          variables: {
            weekId: week.id,
            input: {
              title: title.trim(),
              subtitle: subtitle.trim() || null,
              description: description.trim() || null,
              order: numericOrder,
            },
          },
        });
      }

      onSaved();
      onClose();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "The session could not be saved.",
      );
    }
  };

  return (
    <Modal
      eyebrow={week.title}
      title={isEditing ? "Edit session" : "Add session"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-5 p-6">
        <div>
          <label
            htmlFor="academy-session-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Session title
          </label>

          <input
            id="academy-session-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Session 1: Discovering Your Strengths"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-session-subtitle"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Subtitle
          </label>

          <input
            id="academy-session-subtitle"
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
            placeholder="Identify the capabilities you already have"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-session-order"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Session order
          </label>

          <input
            id="academy-session-order"
            type="number"
            min="1"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="academy-session-status"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Status
          </label>

          <select
            id="academy-session-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as AcademyContentStatus)
            }
            className={inputClassName}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="academy-session-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="academy-session-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Describe what learners should accomplish in this session."
            className={`${inputClassName} resize-none`}
          />
        </div>

        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                {isEditing ? "Save session" : "Add session"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ContentBlockForm({
  session,
  block,
  onClose,
  onSaved,
}: {
  session: AcademySession;
  block?: AcademyContentBlock | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(block);

  const [type, setType] = useState<AcademyContentBlockType>(
    block?.type ?? "TEXT",
  );
  const [title, setTitle] = useState(block?.title ?? "");
  const [textContent, setTextContent] = useState(block?.textContent ?? "");
  const [order, setOrder] = useState(
    String(block?.order ?? session.contentBlocks.length + 1),
  );
  const [status, setStatus] = useState<AcademyContentStatus>(
    block?.status ?? "DRAFT",
  );
  const [configuration, setConfiguration] = useState(
    block?.configuration ? JSON.stringify(block.configuration, null, 2) : "",
  );
  const [mediaId, setMediaId] = useState(block?.media?.id ?? "");
  const [questionId, setQuestionId] = useState(block?.question?.id ?? "");
  const [formError, setFormError] = useState("");

  const [createBlock, { loading: creating }] =
    useMutation<CreateAcademyContentBlockData>(
      CREATE_ACADEMY_CONTENT_BLOCK_MUTATION,
    );

  const [updateBlock, { loading: updating }] =
    useMutation<UpdateAcademyContentBlockData>(
      UPDATE_ACADEMY_CONTENT_BLOCK_MUTATION,
    );

  const saving = creating || updating;

  const needsText = type === "TEXT" || type === "CALLOUT";
  const needsMedia = type === "VIDEO" || type === "IMAGE" || type === "PDF";
  const needsQuestion = type === "QUICK_CHECK";

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const numericOrder = Number(order);

    if (!Number.isInteger(numericOrder) || numericOrder < 1) {
      setFormError("Content block order must be a whole number starting at 1.");
      return;
    }

    if (!title.trim()) {
      setFormError("Content block title is required.");
      return;
    }

    if (needsText && !textContent.trim()) {
      setFormError("This content block requires text content.");
      return;
    }

    if (needsMedia && !mediaId.trim()) {
      setFormError(
        "This content block requires a media ID. Media management will be connected next.",
      );
      return;
    }

    if (needsQuestion && !questionId.trim()) {
      setFormError(
        "This Quick Check requires a question ID. Question management will be connected next.",
      );
      return;
    }

    let parsedConfiguration: unknown = undefined;

    if (configuration.trim()) {
      try {
        parsedConfiguration = JSON.parse(configuration);
      } catch {
        setFormError("Configuration must contain valid JSON.");
        return;
      }
    }

    const input = {
      type,
      title: title.trim(),
      textContent: textContent.trim() || null,
      configuration: parsedConfiguration,
      order: numericOrder,
      status,
      isActive: block?.isActive ?? true,
      mediaId: mediaId.trim() || null,
      questionId: questionId.trim() || null,
    };

    try {
      if (isEditing && block) {
        await updateBlock({
          variables: {
            id: block.id,
            input,
          },
        });
      } else {
        await createBlock({
          variables: {
            sessionId: session.id,
            input,
          },
        });
      }

      onSaved();
      onClose();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "The content block could not be saved.",
      );
    }
  };

  return (
    <Modal
      eyebrow={session.title}
      title={isEditing ? "Edit content block" : "Add content block"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-5 p-6">
        <div>
          <label
            htmlFor="academy-content-type"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Content type
          </label>

          <select
            id="academy-content-type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as AcademyContentBlockType)
            }
            className={inputClassName}
          >
            <option value="TEXT">Text</option>
            <option value="VIDEO">Video</option>
            <option value="IMAGE">Image</option>
            <option value="PDF">PDF</option>
            <option value="CALLOUT">Callout</option>
            <option value="TABLE">Table</option>
            <option value="QUICK_CHECK">Quick Check</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="academy-content-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Title
            </label>

            <input
              id="academy-content-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Understanding your strengths"
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="academy-content-order"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Order
            </label>

            <input
              id="academy-content-order"
              type="number"
              min="1"
              value={order}
              onChange={(event) => setOrder(event.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="academy-content-status"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Status
          </label>

          <select
            id="academy-content-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as AcademyContentStatus)
            }
            className={inputClassName}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {(needsText || type === "TABLE") && (
          <div>
            <label
              htmlFor="academy-content-text"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              {type === "TABLE" ? "Table content" : "Content"}
            </label>

            <textarea
              id="academy-content-text"
              value={textContent}
              onChange={(event) => setTextContent(event.target.value)}
              rows={type === "TABLE" ? 8 : 10}
              placeholder={
                type === "TABLE"
                  ? "Enter table content or table markup/configuration."
                  : "Enter the learning content learners should read."
              }
              className={`${inputClassName} resize-y leading-6`}
            />
          </div>
        )}

        {needsMedia && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-[#003F8E]">
                {type === "VIDEO" ? (
                  <Video size={19} />
                ) : type === "IMAGE" ? (
                  <ImageIcon size={19} />
                ) : (
                  <Upload size={19} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">
                  Attach existing media
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Enter the ID of an Academy media record. Media creation and
                  Cloudinary upload management will be connected through the
                  backend media workflow.
                </p>

                <input
                  value={mediaId}
                  onChange={(event) => setMediaId(event.target.value)}
                  placeholder="Media UUID"
                  className={`mt-3 ${inputClassName}`}
                />
              </div>
            </div>
          </div>
        )}

        {needsQuestion && (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-2 text-amber-700">
                <ClipboardCheck size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">
                  Attach existing question
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Enter the ID of an Academy question. Question authoring will
                  be connected through the assessment/question workflow.
                </p>

                <input
                  value={questionId}
                  onChange={(event) => setQuestionId(event.target.value)}
                  placeholder="Question UUID"
                  className={`mt-3 ${inputClassName}`}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="academy-content-configuration"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Configuration JSON
          </label>

          <textarea
            id="academy-content-configuration"
            value={configuration}
            onChange={(event) => setConfiguration(event.target.value)}
            rows={7}
            placeholder={`{
  "variant": "info"
}`}
            className={`${inputClassName} resize-y font-mono text-xs leading-5`}
          />

          <p className="mt-2 text-xs text-slate-500">
            Optional structured configuration for rendering this content block.
          </p>
        </div>

        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                {isEditing ? "Save block" : "Add block"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ContentBlockIcon({ type }: { type: AcademyContentBlockType }) {
  if (type === "VIDEO") return <Video size={17} />;
  if (type === "IMAGE") return <ImageIcon size={17} />;
  if (type === "PDF") return <FileText size={17} />;
  if (type === "TABLE") return <Table2 size={17} />;
  if (type === "QUICK_CHECK") return <ClipboardCheck size={17} />;
  if (type === "CALLOUT") return <GraduationCap size={17} />;

  return <Type size={17} />;
}

function contentBlockLabel(type: AcademyContentBlockType) {
  switch (type) {
    case "TEXT":
      return "Text";
    case "VIDEO":
      return "Video";
    case "IMAGE":
      return "Image";
    case "PDF":
      return "PDF";
    case "CALLOUT":
      return "Callout";
    case "TABLE":
      return "Table";
    case "QUICK_CHECK":
      return "Quick Check";
  }
}

function CourseCard({
  course,
  onEdit,
  onToggle,
  onManage,
}: {
  course: AcademyCourse;
  onEdit: (course: AcademyCourse) => void;
  onToggle: (course: AcademyCourse) => void;
  onManage: (course: AcademyCourse) => void;
}) {
  const sessionCount = course.weeks.reduce(
    (total, week) => total + week.sessions.length,
    0,
  );

  const contentBlockCount = course.weeks.reduce(
    (total, week) =>
      total +
      week.sessions.reduce(
        (sessionTotal, session) => sessionTotal + session.contentBlocks.length,
        0,
      ),
    0,
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-[#003F8E]">
            <BookOpen size={21} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {course.code}
            </p>

            <h3 className="mt-1 truncate text-lg font-bold text-slate-900">
              {course.title}
            </h3>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            course.isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {course.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="mt-4 min-h-10 text-sm leading-5 text-slate-500">
        {course.description || "No course description has been added yet."}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Weeks</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {course.weeks.length}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Sessions</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {sessionCount}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Blocks</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {contentBlockCount}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onManage(course)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#003F8E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003477]"
        >
          Manage content
          <ChevronRight size={16} />
        </button>

        <button
          type="button"
          onClick={() => onEdit(course)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onToggle(course)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {course.isActive ? "Deactivate" : "Activate"}
        </button>
      </div>
    </article>
  );
}

function CourseContentManager({
  course,
  onBack,
  onChanged,
}: {
  course: AcademyCourse;
  onBack: () => void;
  onChanged: () => void;
}) {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(
    new Set(),
  );

  const [showWeekForm, setShowWeekForm] = useState(false);
  const [editingWeek, setEditingWeek] = useState<AcademyWeek | null>(null);

  const [showSessionForm, setShowSessionForm] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<AcademyWeek | null>(null);
  const [editingSession, setEditingSession] = useState<AcademySession | null>(
    null,
  );

  const [showContentBlockForm, setShowContentBlockForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState<AcademySession | null>(
    null,
  );
  const [editingContentBlock, setEditingContentBlock] =
    useState<AcademyContentBlock | null>(null);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks((current) => {
      const next = new Set(current);

      if (next.has(weekId)) {
        next.delete(weekId);
      } else {
        next.add(weekId);
      }

      return next;
    });
  };

  const toggleSession = (sessionId: string) => {
    setExpandedSessions((current) => {
      const next = new Set(current);

      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }

      return next;
    });
  };

  const openCreateWeek = () => {
    setEditingWeek(null);
    setShowWeekForm(true);
  };

  const openEditWeek = (week: AcademyWeek) => {
    setEditingWeek(week);
    setShowWeekForm(true);
  };

  const openCreateSession = (week: AcademyWeek) => {
    setSelectedWeek(week);
    setEditingSession(null);
    setShowSessionForm(true);

    setExpandedWeeks((current) => {
      const next = new Set(current);
      next.add(week.id);
      return next;
    });
  };

  const openEditSession = (week: AcademyWeek, session: AcademySession) => {
    setSelectedWeek(week);
    setEditingSession(session);
    setShowSessionForm(true);
  };

  const openCreateContentBlock = (session: AcademySession) => {
    setSelectedSession(session);
    setEditingContentBlock(null);
    setShowContentBlockForm(true);

    setExpandedSessions((current) => {
      const next = new Set(current);
      next.add(session.id);
      return next;
    });

    const week = course.weeks.find((item) =>
      item.sessions.some((itemSession) => itemSession.id === session.id),
    );

    if (week) {
      setExpandedWeeks((current) => {
        const next = new Set(current);
        next.add(week.id);
        return next;
      });
    }
  };

  const openEditContentBlock = (
    session: AcademySession,
    block: AcademyContentBlock,
  ) => {
    setSelectedSession(session);
    setEditingContentBlock(block);
    setShowContentBlockForm(true);
  };

  return (
    <>
      <section className="mt-8">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
                  aria-label="Back to courses"
                >
                  <ChevronRight className="rotate-180" size={19} />
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#003F8E]">
                      {course.code}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        course.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {course.description ||
                      "Build the learning structure for this Katel course."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3"><button type="button" onClick={() => setShowAssessmentForm(true)} className="flex items-center justify-center gap-2 rounded-xl border border-[#003F8E] px-5 py-3 text-sm font-semibold text-[#003F8E] hover:bg-blue-50"><ClipboardCheck size={18} />Add assessment</button><button type="button" onClick={openCreateWeek} className="flex items-center justify-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477]"><Plus size={18} />Add week</button></div>
            </div>
          </div>

          <div className="p-6">
            {course.weeks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#003F8E]">
                  <BookOpen size={26} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No weeks yet
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Start building this course by adding its first week. Weeks
                  contain sessions, and sessions contain learning content
                  blocks.
                </p>

                <button
                  type="button"
                  onClick={openCreateWeek}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477]"
                >
                  <Plus size={17} />
                  Add first week
                </button>
              </div>
            )}

            {course.weeks.length > 0 && (
              <div className="space-y-4">
                {course.weeks.map((week) => {
                  const expanded = expandedWeeks.has(week.id);
                  const sessionCount = week.sessions.length;
                  const blockCount = week.sessions.reduce(
                    (total, session) => total + session.contentBlocks.length,
                    0,
                  );

                  return (
                    <article
                      key={week.id}
                      className="overflow-hidden rounded-2xl border border-slate-200"
                    >
                      <div className="flex flex-col gap-4 bg-white p-5 md:flex-row md:items-center md:justify-between">
                        <button
                          type="button"
                          onClick={() => toggleWeek(week.id)}
                          className="flex min-w-0 items-center gap-4 text-left"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-[#003F8E]">
                            {week.order}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {expanded ? (
                                <ChevronDown size={17} className="shrink-0" />
                              ) : (
                                <ChevronRight size={17} className="shrink-0" />
                              )}

                              <h3 className="truncate font-bold text-slate-900">
                                {week.title}
                              </h3>
                            </div>

                            <p className="mt-1 pl-6 text-xs text-slate-500">
                              {sessionCount}{" "}
                              {sessionCount === 1 ? "session" : "sessions"}
                              {" · "}
                              {blockCount}{" "}
                              {blockCount === 1
                                ? "content block"
                                : "content blocks"}
                              {week.subtitle ? ` · ${week.subtitle}` : ""}
                            </p>
                          </div>
                        </button>

                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => openCreateSession(week)}
                            className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-[#003F8E] hover:bg-blue-100"
                          >
                            <Plus size={16} />
                            Session
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditWeek(week)}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>
                        </div>
                      </div>

                      {expanded && (
                        <div className="border-t border-slate-200 bg-slate-50 p-5">
                          {week.sessions.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
                              <FileText
                                size={24}
                                className="mx-auto text-slate-400"
                              />

                              <p className="mt-2 text-sm font-semibold text-slate-700">
                                No sessions in this week
                              </p>

                              <button
                                type="button"
                                onClick={() => openCreateSession(week)}
                                className="mt-3 text-sm font-semibold text-[#003F8E] hover:underline"
                              >
                                Add the first session
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {week.sessions.map((session) => {
                                const sessionExpanded = expandedSessions.has(
                                  session.id,
                                );

                                return (
                                  <article
                                    key={session.id}
                                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                                  >
                                    <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleSession(session.id)
                                        }
                                        className="flex min-w-0 items-center gap-3 text-left"
                                      >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                                          {session.order}
                                        </div>

                                        <div className="min-w-0">
                                          <div className="flex items-center gap-2">
                                            {sessionExpanded ? (
                                              <ChevronDown
                                                size={15}
                                                className="shrink-0"
                                              />
                                            ) : (
                                              <ChevronRight
                                                size={15}
                                                className="shrink-0"
                                              />
                                            )}

                                            <p className="truncate text-sm font-semibold text-slate-900">
                                              {session.title}
                                            </p>
                                          </div>

                                          <p className="mt-1 pl-5 text-xs text-slate-500">
                                            {session.contentBlocks.length}{" "}
                                            {session.contentBlocks.length === 1
                                              ? "content block"
                                              : "content blocks"}
                                            {session.subtitle
                                              ? ` · ${session.subtitle}`
                                              : ""}
                                          </p>
                                        </div>
                                      </button>

                                      <div className="flex shrink-0 gap-2">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openCreateContentBlock(session)
                                          }
                                          className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-[#003F8E] hover:bg-blue-100"
                                        >
                                          <Plus size={15} />
                                          Content
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            openEditSession(week, session)
                                          }
                                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-[#003F8E]"
                                          aria-label={`Edit ${session.title}`}
                                        >
                                          <Pencil size={15} />
                                        </button>
                                      </div>
                                    </div>

                                    {sessionExpanded && (
                                      <div className="border-t border-slate-200 bg-slate-50 p-4">
                                        {session.contentBlocks.length === 0 ? (
                                          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-center">
                                            <Type
                                              size={22}
                                              className="mx-auto text-slate-400"
                                            />

                                            <p className="mt-2 text-sm font-semibold text-slate-700">
                                              No content blocks yet
                                            </p>

                                            <button
                                              type="button"
                                              onClick={() =>
                                                openCreateContentBlock(session)
                                              }
                                              className="mt-3 text-sm font-semibold text-[#003F8E] hover:underline"
                                            >
                                              Add the first content block
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="space-y-2">
                                            {session.contentBlocks.map(
                                              (block) => (
                                                <div
                                                  key={block.id}
                                                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
                                                >
                                                  <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#003F8E]">
                                                      <ContentBlockIcon
                                                        type={block.type}
                                                      />
                                                    </div>

                                                    <div className="min-w-0">
                                                      <div className="flex items-center gap-2">
                                                        <p className="truncate text-sm font-semibold text-slate-900">
                                                          {block.title ||
                                                            contentBlockLabel(
                                                              block.type,
                                                            )}
                                                        </p>

                                                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                                          {contentBlockLabel(
                                                            block.type,
                                                          )}
                                                        </span>
                                                      </div>

                                                      <p className="mt-1 text-xs text-slate-500">
                                                        Block {block.order}
                                                        {" · "}
                                                        {block.status}
                                                        {block.media
                                                          ? ` · ${block.media.provider}`
                                                          : ""}
                                                        {block.question
                                                          ? " · Question attached"
                                                          : ""}
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      openEditContentBlock(
                                                        session,
                                                        block,
                                                      )
                                                    }
                                                    className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-[#003F8E]"
                                                    aria-label={`Edit ${
                                                      block.title ||
                                                      contentBlockLabel(
                                                        block.type,
                                                      )
                                                    }`}
                                                  >
                                                    <Pencil size={15} />
                                                  </button>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </article>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {showWeekForm && (
        <WeekForm
          course={course}
          week={editingWeek}
          onClose={() => setShowWeekForm(false)}
          onSaved={onChanged}
        />
      )}

      {showSessionForm && selectedWeek && (
        <SessionForm
          week={selectedWeek}
          session={editingSession}
          onClose={() => setShowSessionForm(false)}
          onSaved={onChanged}
        />
      )}

      {showContentBlockForm && selectedSession && (
        <ContentBlockForm
          session={selectedSession}
          block={editingContentBlock}
          onClose={() => setShowContentBlockForm(false)}
          onSaved={onChanged}
        />
      )}

      {showAssessmentForm && <AssessmentBuilder course={course} onClose={() => setShowAssessmentForm(false)} />}
    </>
  );
}

export function AcademyManagerDashboard() {
  const { data, loading, error, refetch } = useQuery<AcademyCoursesData>(
    ACADEMY_COURSES_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const [updateCourse] = useMutation<UpdateAcademyCourseData>(
    UPDATE_ACADEMY_COURSE_MUTATION,
  );

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AcademyCourse | null>(
    null,
  );
  const [managingCourseId, setManagingCourseId] = useState<string | null>(null);

  const courses: AcademyCourse[] = data?.academyCourses ?? [];

  const activeCourses = courses.filter((course) => course.isActive);

  const totalWeeks = courses.reduce(
    (total, course) => total + course.weeks.length,
    0,
  );

  const totalSessions = courses.reduce(
    (total, course) =>
      total +
      course.weeks.reduce(
        (weekTotal, week) => weekTotal + week.sessions.length,
        0,
      ),
    0,
  );

  const totalContentBlocks = courses.reduce(
    (total, course) =>
      total +
      course.weeks.reduce(
        (weekTotal, week) =>
          weekTotal +
          week.sessions.reduce(
            (sessionTotal, session) =>
              sessionTotal + session.contentBlocks.length,
            0,
          ),
        0,
      ),
    0,
  );

  const managingCourse =
    courses.find((course) => course.id === managingCourseId) ?? null;

  const openCreateForm = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const openEditForm = (course: AcademyCourse) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const toggleCourse = async (course: AcademyCourse) => {
    try {
      await updateCourse({
        variables: {
          id: course.id,
          input: {
            title: course.title,
            description: course.description || null,
            isActive: !course.isActive,
          },
        },
      });

      await refetch();
    } catch (mutationError) {
      window.alert(
        mutationError instanceof Error
          ? mutationError.message
          : "The course status could not be changed.",
      );
    }
  };

  if (managingCourse) {
    return (
      <CourseContentManager
        course={managingCourse}
        onBack={() => setManagingCourseId(null)}
        onChanged={() => void refetch()}
      />
    );
  }

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#003F8E]">
              Academy management
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Build and manage learning
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Create courses, organize weeks and sessions, build structured
              learning content, and prepare graduates for the Katel professional
              pathway.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003477]"
          >
            <Plus size={18} />
            Create course
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={BookOpen}
            label="Courses"
            value={courses.length}
            description="Courses currently configured in the Academy."
          />

          <StatCard
            icon={CheckCircle2}
            label="Active courses"
            value={activeCourses.length}
            description="Courses currently available for use."
          />

          <StatCard
            icon={GraduationCap}
            label="Weeks"
            value={totalWeeks}
            description="Learning weeks across Academy courses."
          />

          <StatCard
            icon={FileText}
            label="Content blocks"
            value={totalContentBlocks}
            description={`${totalSessions} sessions currently organized.`}
          />
        </div>

        <ByuReviewQueue />

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => {
              const firstCourse = courses[0];

              if (firstCourse) {
                setManagingCourseId(firstCourse.id);
              } else {
                openCreateForm();
              }
            }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-200 hover:bg-blue-50/30"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-[#003F8E]">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Courses</p>
              <p className="text-xs text-slate-500">Build curriculum</p>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-200 hover:bg-blue-50/30"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-[#003F8E]">
              <Users size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Learners</p>
              <p className="text-xs text-slate-500">Track participation</p>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-200 hover:bg-blue-50/30"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-[#003F8E]">
              <ClipboardCheck size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Assessments</p>
              <p className="text-xs text-slate-500">Evaluate learners</p>
            </div>
          </button>

          <button
            type="button"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-200 hover:bg-blue-50/30"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-[#003F8E]">
              <BarChart3 size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Readiness</p>
              <p className="text-xs text-slate-500">Katel-ready pathway</p>
            </div>
          </button>
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Academy courses
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Courses created and maintained by Academy management.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void refetch()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {loading && !data && (
            <div className="grid gap-4 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              <p className="font-semibold">
                We could not load Academy courses.
              </p>

              <p className="mt-1 text-sm">{error.message}</p>

              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-4 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#003F8E]">
                <BookOpen size={26} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No courses yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Start the Academy by creating the general Katel Course. You can
                then organize it into weeks, sessions, and structured content
                blocks.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477]"
              >
                <Plus size={17} />
                Create Katel Course
              </button>
            </div>
          )}

          {courses.length > 0 && (
            <div className="grid gap-4 lg:grid-cols-2">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEdit={openEditForm}
                  onToggle={(selectedCourse) =>
                    void toggleCourse(selectedCourse)
                  }
                  onManage={(selectedCourse) =>
                    setManagingCourseId(selectedCourse.id)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {showCourseForm && (
        <CourseForm
          course={editingCourse}
          onClose={() => setShowCourseForm(false)}
          onSaved={() => void refetch()}
        />
      )}
    </>
  );
}

function AssessmentBuilder({ course, onClose }: { course: AcademyCourse; onClose: () => void }) {
  const [createAssessment, { loading: creating }] = useMutation(CREATE_ACADEMY_ASSESSMENT_MUTATION);
  const [addQuestion, { loading: adding }] = useMutation(ADD_ASSESSMENT_QUESTION_MUTATION);
  const [publish, { loading: publishing }] = useMutation(PUBLISH_ASSESSMENT_MUTATION);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [title, setTitle] = useState(""); const [type, setType] = useState("COURSE_ASSESSMENT"); const [sessionId, setSessionId] = useState("");
  const [question, setQuestion] = useState(""); const [options, setOptions] = useState(["", "", "", ""]); const [correctIndex, setCorrectIndex] = useState("0"); const [message, setMessage] = useState("");
  const create = async (event: FormEvent) => { event.preventDefault(); try { setMessage(""); const input: any = { courseId: course.id, title, type, maximumScore: 100, passingScore: 50 }; if (type !== "FINAL_EXAM" && sessionId) input.sessionId = sessionId; const result = await createAssessment({ variables: { input } }); setAssessmentId(result.data.createAcademyAssessment.id); setMessage("Assessment created. Add at least one question, then publish it."); } catch (error) { setMessage(error instanceof Error ? error.message : "Assessment could not be created."); } };
  const add = async () => { if (!assessmentId) return; const cleaned = options.map((option) => option.trim()).filter(Boolean); try { setMessage(""); await addQuestion({ variables: { input: { assessmentId, prompt: question, type: "SINGLE_CHOICE", points: 1, options: cleaned, correctOptionIndexes: [Number(correctIndex)] } } }); setQuestion(""); setOptions(["", "", "", ""]); setCorrectIndex("0"); setMessage("Question added. Add another question or publish the assessment."); } catch (error) { setMessage(error instanceof Error ? error.message : "Question could not be added."); } };
  const publishAssessment = async () => { if (!assessmentId) return; try { await publish({ variables: { id: assessmentId } }); onClose(); } catch (error) { setMessage(error instanceof Error ? error.message : "Assessment could not be published."); } };
  const sessions = course.weeks.flatMap((week) => week.sessions.map((session) => ({ ...session, weekTitle: week.title })));
  return <Modal eyebrow={course.code} title="Create an assessment" onClose={onClose}><div className="space-y-5 p-6">{!assessmentId ? <form onSubmit={create} className="space-y-4"><label className="block text-sm font-semibold">Title<input required value={title} onChange={(e)=>setTitle(e.target.value)} className={`${inputClassName} mt-2`} /></label><label className="block text-sm font-semibold">Assessment type<select value={type} onChange={(e)=>setType(e.target.value)} className={`${inputClassName} mt-2`}><option value="COURSE_ASSESSMENT">Course assessment</option><option value="FINAL_EXAM">Final exam</option></select></label>{type !== "FINAL_EXAM" && <label className="block text-sm font-semibold">Optional session<select value={sessionId} onChange={(e)=>setSessionId(e.target.value)} className={`${inputClassName} mt-2`}><option value="">Course-level assessment</option>{sessions.map((session) => <option key={session.id} value={session.id}>{session.weekTitle} — {session.title}</option>)}</select></label>}<p className="text-xs text-slate-500">A final examination belongs to the course, never a session. Only one can be created for this course.</p><button disabled={creating} className="w-full rounded-xl bg-[#003F8E] py-3 font-semibold text-white">{creating ? "Creating…" : "Create assessment"}</button></form> : <div className="space-y-4"><p className="rounded-xl bg-blue-50 p-3 text-sm text-[#003F8E]">{message || "Add questions before publishing."}</p><label className="block text-sm font-semibold">Question<input value={question} onChange={(e)=>setQuestion(e.target.value)} className={`${inputClassName} mt-2`} /></label>{options.map((option, index) => <label key={index} className="flex items-center gap-3 text-sm"><input type="radio" name="correct-option" checked={correctIndex === String(index)} onChange={()=>setCorrectIndex(String(index))} /><input value={option} onChange={(e)=>setOptions(options.map((item, itemIndex)=>itemIndex===index?e.target.value:item))} placeholder={`Option ${index + 1}`} className="flex-1 rounded-lg border px-3 py-2" /></label>)}<div className="flex gap-3"><button type="button" disabled={adding || !question.trim()} onClick={() => void add()} className="rounded-xl border border-[#003F8E] px-4 py-3 font-semibold text-[#003F8E]">{adding ? "Adding…" : "Add question"}</button><button type="button" disabled={publishing} onClick={() => void publishAssessment()} className="rounded-xl bg-[#003F8E] px-4 py-3 font-semibold text-white">{publishing ? "Publishing…" : "Publish assessment"}</button></div></div>}{message && !assessmentId && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{message}</p>}</div></Modal>;
}

function ByuReviewQueue() {
  const { data, loading, refetch } = useQuery(BYU_REVIEW_QUEUE_QUERY, { fetchPolicy: "cache-and-network" });
  const [review] = useMutation(REVIEW_BYU_MUTATION);
  const [error, setError] = useState<string | null>(null);
  const records = data?.byuPathwayReviewQueue ?? [];
  const decide = async (verificationId: string, approved: boolean) => {
    const rejectionReason = approved ? undefined : window.prompt("Why is this proof being rejected?") || "";
    if (!approved && !rejectionReason.trim()) return;
    try { setError(null); await review({ variables: { input: { verificationId, approved, rejectionReason } } }); await refetch(); }
    catch (mutationError) { setError(mutationError instanceof Error ? mutationError.message : "The review decision could not be saved."); }
  };
  return <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-[#003F8E]">BYU Pathway verification</p><h3 className="mt-1 text-xl font-bold text-slate-900">Proof awaiting review</h3></div><span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">{records.length}</span></div>{loading && !data ? <p className="mt-4 text-sm text-slate-500">Loading review queue…</p> : !records.length ? <p className="mt-4 text-sm text-slate-500">No BYU Pathway proof is waiting for review.</p> : <div className="mt-5 space-y-3">{records.map((record: any) => <div key={record.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-slate-900">{record.email}</p><p className="mt-1 text-xs text-slate-500">Proof: {record.proofFileName || "submitted document"}</p></div><div className="flex gap-2"><button type="button" onClick={() => void decide(record.id, false)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700">Reject</button><button type="button" onClick={() => void decide(record.id, true)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">Approve</button></div></div>)}</div>}{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}</section>;
}

function AcademyLearnerDashboard() {
  const { data, loading, error, refetch } = useQuery<MyAcademyCoursesData>(
    MY_ACADEMY_COURSES_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const courses = data?.myAcademyCourses ?? [];
  const [markBlockComplete] = useMutation(MARK_BLOCK_COMPLETE_MUTATION);
  const [actionError, setActionError] = useState<string | null>(null);

  const completeBlock = async (contentBlockId: string) => {
    try {
      setActionError(null);
      await markBlockComplete({ variables: { contentBlockId } });
      await refetch();
    } catch (mutationError) {
      setActionError(mutationError instanceof Error ? mutationError.message : "The learning block could not be marked complete.");
    }
  };

  const assessmentCount = courses.reduce(
    (total, course) =>
      total +
      course.weeks.reduce(
        (weekTotal, week) =>
          weekTotal +
          week.sessions.reduce(
            (sessionTotal, session) =>
              sessionTotal +
              session.contentBlocks.filter(
                (block) => block.type === "QUICK_CHECK",
              ).length,
            0,
          ),
        0,
      ),
    0,
  );

  const sessionCount = courses.reduce(
    (total, course) =>
      total +
      course.weeks.reduce(
        (weekTotal, week) => weekTotal + week.sessions.length,
        0,
      ),
    0,
  );

  const contentBlockCount = courses.reduce(
    (total, course) =>
      total +
      course.weeks.reduce(
        (weekTotal, week) =>
          weekTotal +
          week.sessions.reduce(
            (sessionTotal, session) =>
              sessionTotal + session.contentBlocks.length,
            0,
          ),
        0,
      ),
    0,
  );

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="My courses"
          value={courses.length}
          description="Courses you are currently enrolled in."
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={0}
          description="Completion tracking will be connected to enrollment progress."
        />

        <StatCard
          icon={ClipboardCheck}
          label="Assessments"
          value={assessmentCount}
          description="Quick Checks available within your enrolled courses."
        />

        <StatCard
          icon={GraduationCap}
          label="Readiness"
          value="Not started"
          description="Your path toward Katel readiness."
        />
      </div>

      {loading && !data && (
        <div className="mt-8 space-y-4">
          <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-48 animate-pulse rounded-3xl bg-slate-200" />
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">
            We could not load your Academy courses.
          </p>

          <p className="mt-1 text-sm">{error.message}</p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {actionError && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{actionError}</div>}

      {!loading && !error && courses.length === 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-[#003F8E]">
              <GraduationCap size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Welcome to Katel Capital Academy
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                You do not have an Academy course enrollment yet. Once you are
                enrolled, your courses, weeks, sessions, learning content, and
                assessments will appear here.
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">My learning</h2>

              <p className="mt-1 text-sm text-slate-500">
                Your enrolled Academy courses and their published learning
                content.
              </p>
            </div>

            <div className="space-y-4">
              {courses.map((course) => {
                const courseSessionCount = course.weeks.reduce(
                  (total, week) => total + week.sessions.length,
                  0,
                );

                const courseContentBlockCount = course.weeks.reduce(
                  (total, week) =>
                    total +
                    week.sessions.reduce(
                      (sessionTotal, session) =>
                        sessionTotal + session.contentBlocks.length,
                      0,
                    ),
                  0,
                );

                return (
                  <article
                    key={course.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-blue-50 p-4 text-[#003F8E]">
                          <BookOpen size={25} />
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {course.code}
                          </p>

                          <h3 className="mt-1 text-xl font-bold text-slate-900">
                            {course.title}
                          </h3>

                          {course.description && (
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                              {course.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 lg:min-w-[300px]">
                        <div className="rounded-xl bg-slate-50 p-3 text-center">
                          <p className="text-xs text-slate-500">Weeks</p>
                          <p className="mt-1 font-bold text-slate-900">
                            {course.weeks.length}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3 text-center">
                          <p className="text-xs text-slate-500">Sessions</p>
                          <p className="mt-1 font-bold text-slate-900">
                            {courseSessionCount}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3 text-center">
                          <p className="text-xs text-slate-500">Content</p>
                          <p className="mt-1 font-bold text-slate-900">
                            {courseContentBlockCount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {course.weeks.map((week) => (
                        <div
                          key={week.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-[#003F8E] shadow-sm">
                              {week.order}
                            </div>

                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900">
                                {week.title}
                              </h4>

                              {week.subtitle && (
                                <p className="mt-1 text-xs text-slate-500">
                                  {week.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            {week.sessions.map((session) => (
                              <div
                                key={session.id}
                                className="rounded-xl border border-slate-200 bg-white p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                                    {session.order}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-semibold text-slate-900">
                                      {session.title}
                                    </h5>

                                    {session.subtitle && (
                                      <p className="mt-1 text-xs text-slate-500">
                                        {session.subtitle}
                                      </p>
                                    )}

                                    <div className="mt-3 space-y-2">
                                      {session.contentBlocks.map((block) => (
                                        <div
                                          key={block.id}
                                          className="flex items-start gap-3 rounded-lg bg-slate-50 p-3"
                                        >
                                          <div className="mt-0.5 text-[#003F8E]">
                                            <ContentBlockIcon
                                              type={block.type}
                                            />
                                          </div>

                                          <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-slate-800">
                                              {block.title ||
                                                contentBlockLabel(block.type)}
                                            </p>

                                            {block.type === "TEXT" &&
                                              block.textContent && (
                                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                                  {block.textContent}
                                                </p>
                                              )}

                                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                              {contentBlockLabel(block.type)}
                                            </p>
                                          </div>
                                          <button type="button" onClick={() => void completeBlock(block.id)} className="shrink-0 rounded-lg border border-[#003F8E] px-3 py-2 text-xs font-semibold text-[#003F8E] hover:bg-blue-50">Complete</button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <LearnerAssessments courseId={course.id} />
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function LearnerAssessments({ courseId }: { courseId: string }) {
  const { data, loading, refetch } = useQuery(MY_ACADEMY_ASSESSMENTS_QUERY, { variables: { courseId }, fetchPolicy: "cache-and-network" });
  const [start] = useMutation(START_ACADEMY_ASSESSMENT_MUTATION);
  const [submit] = useMutation(SUBMIT_ACADEMY_ASSESSMENT_MUTATION);
  const [attempt, setAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const assessments = data?.myAcademyAssessments ?? [];
  const begin = async (assessmentId: string) => {
    try { setFeedback(null); const result = await start({ variables: { assessmentId } }); setAttempt(result.data.startAcademyAssessment); setAnswers({}); }
    catch (error) { setFeedback(error instanceof Error ? error.message : "The assessment could not be started."); }
  };
  const finish = async () => {
    if (!attempt) return;
    try { const result = await submit({ variables: { input: { attemptId: attempt.id, answers: Object.entries(answers).map(([questionId, optionId]) => ({ questionId, optionIds: optionId ? [optionId] : [] })) } } }); const response = result.data.submitAcademyAssessment; setFeedback(`${response.passed ? "Passed" : "Not passed"}: ${Math.round(response.percentage)}%.${attempt.assessmentType === "FINAL_EXAM" && !response.passed ? " You may register again using the configured re-enrollment fee." : ""}`); setAttempt(null); await refetch(); }
    catch (error) { setFeedback(error instanceof Error ? error.message : "The assessment could not be submitted."); }
  };
  if (loading && !data) return <p className="mt-5 text-sm text-slate-500">Loading assessments…</p>;
  if (!assessments.length) return null;
  return <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5"><h4 className="font-bold text-slate-900">Course assessments</h4><p className="mt-1 text-sm text-slate-500">Assessment results are saved against your enrollment. Passing the final examination completes the course.</p>{feedback && <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-[#003F8E]">{feedback}</p>}{!attempt ? <div className="mt-4 grid gap-3 md:grid-cols-2">{assessments.map((assessment: any) => <div key={assessment.id} className="rounded-xl bg-white p-4 shadow-sm"><p className="font-semibold text-slate-900">{assessment.title}</p><p className="mt-1 text-xs font-bold uppercase text-slate-500">{assessment.type.replaceAll("_", " ")} · Pass {assessment.passingScore ?? 50}%</p><button type="button" onClick={() => void begin(assessment.id)} className="mt-4 rounded-lg bg-[#003F8E] px-3 py-2 text-sm font-semibold text-white">Start assessment</button></div>)}</div> : <div className="mt-4 space-y-5">{attempt.questions.map((question: any) => <fieldset key={question.id} className="rounded-xl bg-white p-4"><legend className="font-semibold text-slate-900">{question.prompt}</legend><div className="mt-3 space-y-2">{question.options.map((option: any) => <label key={option.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"><input type="radio" name={question.id} checked={answers[question.id] === option.id} onChange={() => setAnswers({ ...answers, [question.id]: option.id })} />{option.text}</label>)}</div></fieldset>)}<div className="flex gap-3"><button type="button" onClick={() => setAttempt(null)} className="rounded-lg border px-4 py-2 text-sm font-semibold">Cancel</button><button type="button" onClick={() => void finish()} className="rounded-lg bg-[#003F8E] px-4 py-2 text-sm font-semibold text-white">Submit assessment</button></div></div>}</section>;
}

export default function AcademyPortalLayout() {
  const { user, hasPermission } = useAuth();

  const isManager =
    user?.role === "ACADEMY_MANAGER" || hasPermission("academy.manage");

  return (
    <PortalDashboard
      portal="academy"
      heading={isManager ? "Academy Management" : "Katel Capital Academy"}
      description={
        isManager
          ? "Manage courses, learning content, assessments, learners, and the pathway from Academy completion to Katel readiness."
          : "Learn, complete your courses, build your professional readiness, and progress toward the Katel talent pathway."
      }
    >
      {isManager ? <AcademyManagerDashboard /> : <AcademyLearnerDashboard />}
    </PortalDashboard>
  );
}
