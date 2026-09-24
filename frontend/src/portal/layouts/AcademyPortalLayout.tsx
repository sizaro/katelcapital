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
  Pencil,
  Plus,
  RefreshCw,
  Users,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import PortalDashboard from "../PortalDashboard";
import { useAuth } from "../../features/auth/AuthProvider";

const ACADEMY_COURSES_QUERY = gql`
  query AcademyCourses {
    academyCourses {
      id
      code
      title
      description
      isActive
      createdAt
      updatedAt
      modules {
        id
        title
        description
        order
        lessons {
          id
          title
          description
          content
          order
        }
      }
    }
  }
`;

const CREATE_ACADEMY_COURSE_MUTATION = gql`
  mutation CreateAcademyCourse($input: CreateAcademyCourseInput!) {
    createAcademyCourse(input: $input) {
      id
      code
      title
      description
      isActive
      createdAt
      updatedAt
      modules {
        id
        title
        description
        order
        lessons {
          id
          title
          description
          content
          order
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
      isActive
      createdAt
      updatedAt
      modules {
        id
        title
        description
        order
        lessons {
          id
          title
          description
          content
          order
        }
      }
    }
  }
`;

const CREATE_ACADEMY_MODULE_MUTATION = gql`
  mutation CreateAcademyModule(
    $courseId: ID!
    $input: CreateAcademyModuleInput!
  ) {
    createAcademyModule(courseId: $courseId, input: $input) {
      id
      title
      description
      order
      lessons {
        id
        title
        description
        content
        order
      }
    }
  }
`;

const UPDATE_ACADEMY_MODULE_MUTATION = gql`
  mutation UpdateAcademyModule($id: ID!, $input: UpdateAcademyModuleInput!) {
    updateAcademyModule(id: $id, input: $input) {
      id
      title
      description
      order
      lessons {
        id
        title
        description
        content
        order
      }
    }
  }
`;

const CREATE_ACADEMY_LESSON_MUTATION = gql`
  mutation CreateAcademyLesson(
    $moduleId: ID!
    $input: CreateAcademyLessonInput!
  ) {
    createAcademyLesson(moduleId: $moduleId, input: $input) {
      id
      title
      description
      content
      order
    }
  }
`;

const UPDATE_ACADEMY_LESSON_MUTATION = gql`
  mutation UpdateAcademyLesson($id: ID!, $input: UpdateAcademyLessonInput!) {
    updateAcademyLesson(id: $id, input: $input) {
      id
      title
      description
      content
      order
    }
  }
`;

type AcademyLesson = {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  order: number;
};

type AcademyModule = {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  lessons: AcademyLesson[];
};

type AcademyCourse = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  modules: AcademyModule[];
};

type AcademyCoursesData = {
  academyCourses: AcademyCourse[];
};

type CreateAcademyCourseData = {
  createAcademyCourse: AcademyCourse;
};

type UpdateAcademyCourseData = {
  updateAcademyCourse: AcademyCourse;
};

type CreateAcademyModuleData = {
  createAcademyModule: AcademyModule;
};

type UpdateAcademyModuleData = {
  updateAcademyModule: AcademyModule;
};

type CreateAcademyLessonData = {
  createAcademyLesson: AcademyLesson;
};

type UpdateAcademyLessonData = {
  updateAcademyLesson: AcademyLesson;
};

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
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
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

    try {
      if (isEditing && course) {
        await updateCourse({
          variables: {
            id: course.id,
            input: {
              title: title.trim(),
              description: description.trim() || null,
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

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
            placeholder="Katel Course"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
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
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
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

function ModuleForm({
  course,
  academyModule,
  onClose,
  onSaved,
}: {
  course: AcademyCourse;
  academyModule?: AcademyModule | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(academyModule);

  const [title, setTitle] = useState(academyModule?.title ?? "");
  const [description, setDescription] = useState(
    academyModule?.description ?? "",
  );
  const [order, setOrder] = useState(
    String(academyModule?.order ?? course.modules.length + 1),
  );
  const [formError, setFormError] = useState("");

  const [createModule, { loading: creating }] =
    useMutation<CreateAcademyModuleData>(CREATE_ACADEMY_MODULE_MUTATION);

  const [updateModule, { loading: updating }] =
    useMutation<UpdateAcademyModuleData>(UPDATE_ACADEMY_MODULE_MUTATION);

  const saving = creating || updating;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const numericOrder = Number(order);

    if (!title.trim()) {
      setFormError("Module title is required.");
      return;
    }

    if (!Number.isInteger(numericOrder) || numericOrder < 1) {
      setFormError("Module order must be a whole number starting at 1.");
      return;
    }

    try {
      if (isEditing && academyModule) {
        await updateModule({
          variables: {
            id: academyModule.id,
            input: {
              title: title.trim(),
              description: description.trim() || null,
              order: numericOrder,
              isActive: true,
            },
          },
        });
      } else {
        await createModule({
          variables: {
            courseId: course.id,
            input: {
              title: title.trim(),
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
          : "The module could not be saved.",
      );
    }
  };

  return (
    <Modal
      eyebrow={course.title}
      title={isEditing ? "Edit module" : "Add module"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-5 p-6">
        <div>
          <label
            htmlFor="academy-module-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Module title
          </label>

          <input
            id="academy-module-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Career Foundation"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="academy-module-order"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Module order
          </label>

          <input
            id="academy-module-order"
            type="number"
            min="1"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            This determines where the module appears in the course.
          </p>
        </div>

        <div>
          <label
            htmlFor="academy-module-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="academy-module-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="What will learners learn in this module?"
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
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
                {isEditing ? "Save module" : "Add module"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function LessonForm({
  academyModule,
  lesson,
  onClose,
  onSaved,
}: {
  academyModule: AcademyModule;
  lesson?: AcademyLesson | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(lesson);

  const [title, setTitle] = useState(lesson?.title ?? "");
  const [description, setDescription] = useState(lesson?.description ?? "");
  const [content, setContent] = useState(lesson?.content ?? "");
  const [order, setOrder] = useState(
    String(lesson?.order ?? academyModule.lessons.length + 1),
  );
  const [formError, setFormError] = useState("");

  const [createLesson, { loading: creating }] =
    useMutation<CreateAcademyLessonData>(CREATE_ACADEMY_LESSON_MUTATION);

  const [updateLesson, { loading: updating }] =
    useMutation<UpdateAcademyLessonData>(UPDATE_ACADEMY_LESSON_MUTATION);

  const saving = creating || updating;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const numericOrder = Number(order);

    if (!title.trim()) {
      setFormError("Lesson title is required.");
      return;
    }

    if (!Number.isInteger(numericOrder) || numericOrder < 1) {
      setFormError("Lesson order must be a whole number starting at 1.");
      return;
    }

    try {
      if (isEditing && lesson) {
        await updateLesson({
          variables: {
            id: lesson.id,
            input: {
              title: title.trim(),
              description: description.trim() || null,
              content: content.trim() || null,
              order: numericOrder,
              isActive: true,
            },
          },
        });
      } else {
        await createLesson({
          variables: {
            moduleId: academyModule.id,
            input: {
              title: title.trim(),
              description: description.trim() || null,
              content: content.trim() || null,
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
          : "The lesson could not be saved.",
      );
    }
  };

  return (
    <Modal
      eyebrow={academyModule.title}
      title={isEditing ? "Edit lesson" : "Add lesson"}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-5 p-6">
        <div>
          <label
            htmlFor="academy-lesson-title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Lesson title
          </label>

          <input
            id="academy-lesson-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Understanding Your Career Direction"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="academy-lesson-order"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Lesson order
          </label>

          <input
            id="academy-lesson-order"
            type="number"
            min="1"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="academy-lesson-description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="academy-lesson-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            placeholder="Briefly describe this lesson."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="academy-lesson-content"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Lesson content
          </label>

          <textarea
            id="academy-lesson-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={10}
            placeholder="Enter the lesson content that learners will read and study."
            className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#003F8E] focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            For now, lesson content is plain text. We can introduce richer
            learning content later.
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
                {isEditing ? "Save lesson" : "Add lesson"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
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
  const lessonCount = course.modules.reduce(
    (total: number, academyModule: AcademyModule) =>
      total + academyModule.lessons.length,
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

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Modules</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {course.modules.length}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Lessons</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{lessonCount}</p>
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
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(),
  );

  const [showModuleForm, setShowModuleForm] = useState(false);
  const [editingModule, setEditingModule] = useState<AcademyModule | null>(
    null,
  );

  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedModule, setSelectedModule] = useState<AcademyModule | null>(
    null,
  );
  const [editingLesson, setEditingLesson] = useState<AcademyLesson | null>(
    null,
  );

  const toggleExpanded = (moduleId: string) => {
    setExpandedModules((current) => {
      const next = new Set(current);

      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }

      return next;
    });
  };

  const openCreateModule = () => {
    setEditingModule(null);
    setShowModuleForm(true);
  };

  const openEditModule = (academyModule: AcademyModule) => {
    setEditingModule(academyModule);
    setShowModuleForm(true);
  };

  const openCreateLesson = (academyModule: AcademyModule) => {
    setSelectedModule(academyModule);
    setEditingLesson(null);
    setShowLessonForm(true);

    setExpandedModules((current) => {
      const next = new Set(current);
      next.add(academyModule.id);
      return next;
    });
  };

  const openEditLesson = (
    academyModule: AcademyModule,
    lesson: AcademyLesson,
  ) => {
    setSelectedModule(academyModule);
    setEditingLesson(lesson);
    setShowLessonForm(true);
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

              <button
                type="button"
                onClick={openCreateModule}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477]"
              >
                <Plus size={18} />
                Add module
              </button>
            </div>
          </div>

          <div className="p-6">
            {course.modules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#003F8E]">
                  <BookOpen size={26} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No modules yet
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Start building this course by adding its first module. Modules
                  can then contain individual lessons.
                </p>

                <button
                  type="button"
                  onClick={openCreateModule}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#003F8E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003477]"
                >
                  <Plus size={17} />
                  Add first module
                </button>
              </div>
            )}

            {course.modules.length > 0 && (
              <div className="space-y-4">
                {course.modules.map((academyModule: AcademyModule) => {
                  const expanded = expandedModules.has(academyModule.id);

                  return (
                    <article
                      key={academyModule.id}
                      className="overflow-hidden rounded-2xl border border-slate-200"
                    >
                      <div className="flex flex-col gap-4 bg-white p-5 md:flex-row md:items-center md:justify-between">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(academyModule.id)}
                          className="flex min-w-0 items-center gap-4 text-left"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-[#003F8E]">
                            {academyModule.order}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {expanded ? (
                                <ChevronDown size={17} className="shrink-0" />
                              ) : (
                                <ChevronRight size={17} className="shrink-0" />
                              )}

                              <h3 className="truncate font-bold text-slate-900">
                                {academyModule.title}
                              </h3>
                            </div>

                            <p className="mt-1 pl-6 text-xs text-slate-500">
                              {academyModule.lessons.length}{" "}
                              {academyModule.lessons.length === 1
                                ? "lesson"
                                : "lessons"}
                              {academyModule.description
                                ? ` · ${academyModule.description}`
                                : ""}
                            </p>
                          </div>
                        </button>

                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => openCreateLesson(academyModule)}
                            className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-[#003F8E] hover:bg-blue-100"
                          >
                            <Plus size={16} />
                            Lesson
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditModule(academyModule)}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>
                        </div>
                      </div>

                      {expanded && (
                        <div className="border-t border-slate-200 bg-slate-50 p-5">
                          {academyModule.lessons.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
                              <FileText
                                size={24}
                                className="mx-auto text-slate-400"
                              />

                              <p className="mt-2 text-sm font-semibold text-slate-700">
                                No lessons in this module
                              </p>

                              <button
                                type="button"
                                onClick={() => openCreateLesson(academyModule)}
                                className="mt-3 text-sm font-semibold text-[#003F8E] hover:underline"
                              >
                                Add the first lesson
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {academyModule.lessons.map(
                                (lesson: AcademyLesson) => (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
                                  >
                                    <div className="flex min-w-0 items-center gap-3">
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                                        {lesson.order}
                                      </div>

                                      <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                          {lesson.title}
                                        </p>

                                        {lesson.description && (
                                          <p className="mt-1 truncate text-xs text-slate-500">
                                            {lesson.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        openEditLesson(academyModule, lesson)
                                      }
                                      className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-[#003F8E]"
                                      aria-label={`Edit ${lesson.title}`}
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
        </div>
      </section>

      {showModuleForm && (
        <ModuleForm
          course={course}
          academyModule={editingModule}
          onClose={() => setShowModuleForm(false)}
          onSaved={onChanged}
        />
      )}

      {showLessonForm && selectedModule && (
        <LessonForm
          academyModule={selectedModule}
          lesson={editingLesson}
          onClose={() => setShowLessonForm(false)}
          onSaved={onChanged}
        />
      )}
    </>
  );
}

function AcademyManagerDashboard() {
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
  const activeCourses = courses.filter(
    (course: AcademyCourse) => course.isActive,
  );

  const totalModules = courses.reduce(
    (total: number, course: AcademyCourse) => total + course.modules.length,
    0,
  );

  const totalLessons = courses.reduce(
    (total: number, course: AcademyCourse) =>
      total +
      course.modules.reduce(
        (moduleTotal: number, academyModule: AcademyModule) =>
          moduleTotal + academyModule.lessons.length,
        0,
      ),
    0,
  );

  const managingCourse =
    courses.find((course: AcademyCourse) => course.id === managingCourseId) ??
    null;

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
              Create courses, organize modules and lessons, manage learners, and
              prepare graduates for the Katel professional pathway.
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
            icon={FileText}
            label="Modules"
            value={totalModules}
            description="Learning modules across Academy courses."
          />

          <StatCard
            icon={GraduationCap}
            label="Lessons"
            value={totalLessons}
            description="Lessons organized inside modules."
          />
        </div>

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
                then add career-development-style modules and lessons.
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
              {courses.map((course: AcademyCourse) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEdit={openEditForm}
                  onToggle={(selectedCourse: AcademyCourse) =>
                    void toggleCourse(selectedCourse)
                  }
                  onManage={(selectedCourse: AcademyCourse) =>
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

function AcademyLearnerDashboard() {
  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="My courses"
          value={0}
          description="Courses you are currently enrolled in."
        />

        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={0}
          description="Courses you have successfully completed."
        />

        <StatCard
          icon={ClipboardCheck}
          label="Assessments"
          value={0}
          description="Assessments waiting for your attention."
        />

        <StatCard
          icon={GraduationCap}
          label="Readiness"
          value="Not started"
          description="Your path toward Katel readiness."
        />
      </div>

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
              Your learning journey will appear here. Once you are enrolled, you
              will be able to access your courses, work through lessons,
              complete assessments, and progress toward Katel readiness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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
