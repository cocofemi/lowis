"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock } from "lucide-react";
import { motion, AnimatePresence, percent } from "framer-motion";

import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FileText,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
  CourseWithProgressItem,
  useMemberCourseProgress,
} from "@/hooks/use-member-progress";
import EditorJsRenderer from "@/components/editorRenderer";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  RESUME_COURSE,
  RETAKE_COURSE,
  UPDATE_COURSE_PROGRESS,
} from "@/app/graphql/queries/members/members.queries";
import { toast } from "sonner";
import { SUBMIT_SCENARIO } from "@/app/graphql/queries/scenarios/scenarios.queries";
import {
  COMPLETE_COURSE,
  COURSE_PROGRESS_STATUS,
} from "@/app/graphql/queries/course/course.queries";
import { ISSUE_CERTIFICATE } from "@/app/graphql/queries/certificate/certificate.queries";
import { Confetti } from "@/components/confetti";
import { ScenarioOverlay } from "@/components/ScenarioOverlay";

interface CourseViewClientProps {
  courseId: string;
  organisationId: string;
}

interface SubmissonResponse {
  id: string;
  aiScore: number;
  aiFeedback: string;
}

interface Status {
  userCourseProgressStatus: {
    status: string;
    score: number;
  };
}

export default function CourseViewClient({
  courseId,
  organisationId,
}: CourseViewClientProps) {
  const router = useRouter();
  const { data, loading } = useMemberCourseProgress(organisationId);
  const [updateCourseProgress] = useMutation(UPDATE_COURSE_PROGRESS);
  const [submitScenario] = useMutation<{
    submitScenarioAnswer: SubmissonResponse;
  }>(SUBMIT_SCENARIO);

  const [completeCourse] = useMutation(COMPLETE_COURSE);
  const [issueCertificate] = useMutation(ISSUE_CERTIFICATE);

  const [fetchFinalStatus] = useLazyQuery<Status>(COURSE_PROGRESS_STATUS, {
    fetchPolicy: "network-only",
  });

  const [retakeCourse, { loading: retakeLoding }] = useMutation(RETAKE_COURSE);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [scenarioAnswer, setScenarioAnswer] = useState("");
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("lessons");
  const [lockedLessons, setLockedLessons] = useState<number[]>([]);
  const [hasInitializedProgress, setHasInitializedProgress] = useState(false);

  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [showCompletionPanel, setShowCompletionPanel] = useState(false);
  const [finalStatus, setFinalStatus] = useState<string>("");
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [isReviewingPreviousLesson, setIsReviewingPreviousLesson] =
    useState(false);

  const [lessonQuizCompleted, setLessonQuizCompleted] = useState<{
    [lessonId: string]: boolean;
  }>({});

  const [startCourse, setStartCourse] =
    useState<CourseWithProgressItem | null>();

  useEffect(() => {
    if (data) {
      const course = data.find((e) => e?.course?.id === courseId);

      if (!course) return;
      setStartCourse({
        course: {
          id: course?.course?.id,
          title: course?.course?.title,
          description: course?.course?.description,
          lessons: course?.course?.lessons.map((l) => ({
            id: l?.id,
            title: l?.title,
            textContent: l?.textContent,
            assessments: l?.assessments.map((q) => ({
              question: q?.question,
              options: q?.options,
              correctAnswer: q?.correctAnswer,
              explanation: q?.explanation,
            })),
          })),
          scenarios: course?.course?.scenarios,
        },
        progress: {
          id: course?.progress?.id,
          lastLessonId: course?.progress?.lastLessonId,
          completedLessons: course?.progress?.completedLessons,
          score: course?.progress?.score,
          status: course?.progress?.status,
          percentage: course?.progress?.percentage,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (!data || hasInitializedProgress) return;

    const course = data.find((e) => e?.course?.id === courseId);
    if (!course) return;

    const lessons = course.course.lessons;
    const completed = course.progress?.completedLessons ?? [];
    const lastLessonId = course.progress?.lastLessonId;
    const score = course.progress?.score; // score for last question or scenario depending on your model

    // --- STATE 3: Finished all lessons ---
    if (completed.length === lessons.length) {
      setActiveTab("scenarios");
      setHasInitializedProgress(true);
      return;
    }

    // Lesson index of lastLessonId
    const lastIndex = lessons.findIndex((l) => l.id === lastLessonId);

    // --- STATE 1: No meaningful progress ---
    const firstTime =
      completed.length === 0 ||
      score === null ||
      lastIndex === -1 ||
      !completed.includes(lastLessonId);
    setHasInitializedProgress(true);

    if (firstTime) {
      // Start at lesson 0
      setCurrentLessonIndex(0);
      setCurrentQuizIndex(0);
      setShowQuizResults(false);
      setQuizAnswers({});
      return;
    }

    // --- STATE 2: Resume at next lesson ---
    const nextIndex = Math.min(lastIndex + 1, lessons.length - 1);

    setCurrentLessonIndex(nextIndex);
    setCurrentQuizIndex(0);
    setShowQuizResults(false);
    setQuizAnswers({});
    setLockedLessons([...Array(nextIndex).keys()]);
    setHasInitializedProgress(true); // optional
  }, [data, hasInitializedProgress, courseId]);

  useEffect(() => {
    setQuestionAnswered(false);
  }, [currentQuizIndex, currentLessonIndex]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading course...</span>
      </div>
    );
  }

  const currentLesson = startCourse?.course?.lessons?.[currentLessonIndex];
  const currentScenario = startCourse?.course?.scenarios;
  const totalItems = startCourse?.course?.lessons?.length
    ? startCourse?.course?.lessons.length + 1
    : 1;

  const completedItems = startCourse?.progress?.completedLessons?.length || 0;

  const progress = (completedItems / totalItems) * 100;

  const allLessonsCompleted =
    startCourse?.course?.lessons.length === completedLessons.length;

  const isCurrentLessonQuizCompleted =
    lessonQuizCompleted[currentLesson?.id] === true;

  const markScenarioComplete = async () => {
    //Submit scenario for assessment
    setIsLoading(true);
    try {
      const scenarioRes = await submitScenario({
        variables: {
          input: {
            scenarioId: startCourse?.course?.scenarios?.id,
            answer: scenarioAnswer,
          },
        },
      });
      // Get feedback from submission
      const aiFeedback =
        scenarioRes?.data?.submitScenarioAnswer?.aiFeedback ?? "";

      //complete the course
      await completeCourse({
        variables: {
          input: {
            courseId: courseId,
            scenarioId: startCourse?.course?.scenarios?.id,
          },
        },
      });
      // Refresh progress to get updated status
      const { data } = await fetchFinalStatus({
        variables: {
          courseId,
          businessId: organisationId,
        },
      });

      console.log("Final status", data);

      const progress = data?.userCourseProgressStatus;
      const passed = progress?.status === "passed";

      console.log("Status", progress?.status);

      if (passed) {
        await issueCertificate({
          variables: {
            input: {
              businessId: organisationId,
              courseId,
            },
          },
        });
        setFeedback(aiFeedback);
        setFinalStatus(progress?.status);
        setFinalScore(progress?.score ?? null);
        setShowConfetti(passed);
        setShowCompletionPanel(true);
      } else if (progress?.status === "failed") {
        setFeedback(aiFeedback);
        setFinalStatus(progress?.status);
        setFinalScore(progress?.score ?? null);
        setShowCompletionPanel(true);
      }
    } catch (error) {
      console.log("Something went wrong", error);
      setIsLoading(false);
      toast.warning("There was a problem issuing certificates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseProgressUpdate = async (
    lastLessonId: string,
    lessonId: string,
    score?: number
  ) => {
    setIsSubmittingQuiz(true);
    try {
      await updateCourseProgress({
        variables: {
          input: {
            courseId: startCourse?.course?.id,
            score,
            lastLessonId,
            lessonId,
            percentage: progress,
          },
        },
      });
      // refetch();
      console.log("Success");
      setIsSubmittingQuiz(false);
    } catch (error) {
      setIsSubmittingQuiz(false);
      console.log("There was a problem updating user progress.");
      toast.warning("There was a problem saving your progress.");
    }
  };

  const handleRetakeCourse = async () => {
    try {
      await retakeCourse({
        variables: {
          courseId: courseId,
          businessId: organisationId,
        },
        fetchPolicy: "no-cache",
      });

      setCurrentLessonIndex(0);
      setCurrentQuizIndex(0);
      setQuestionAnswered(false);
      setShowQuizResults(false);
      setCompletedLessons([]);
      setLessonQuizCompleted({});
      setIsReviewingPreviousLesson(false);

      window.location.reload();
    } catch (error) {
      console.log("There was a problem starting course");
    }
  };

  const nextLesson = () => {
    const lessons = startCourse.course.lessons;
    const isLastLesson = currentLessonIndex === lessons.length - 1;

    // Allow progress if:
    // - lesson is completed, or
    // - user is reviewing previous lesson
    const canMoveForward =
      isCurrentLessonQuizCompleted || isReviewingPreviousLesson;

    if (!canMoveForward) return;

    // Leave review mode
    setIsReviewingPreviousLesson(false);

    // If last lesson → go to scenario tab
    if (isLastLesson) {
      setActiveTab("scenarios");
      setTimeout(() => {
        document
          .querySelector(".scenario-top-anchor")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 5);
      return;
    }

    // Lock current lesson
    setLockedLessons((prev) => [...new Set([...prev, currentLessonIndex])]);

    // Move to next lesson (SINGLE update)
    setCurrentLessonIndex((prev) => prev + 1);

    // Reset quiz UI for the NEXT lesson only
    const nextLessonId = lessons[currentLessonIndex + 1].id;

    if (!isReviewingPreviousLesson) {
      setLessonQuizCompleted((prev) => ({
        ...prev,
        [currentLesson.id]: true,
      }));
    }

    setCurrentQuizIndex(0);
    setShowQuizResults(false);
    setQuizAnswers({});
    setQuestionAnswered(false);

    setTimeout(() => {
      document
        .querySelector(".lesson-top-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 5);
  };
  const prevLesson = () => {
    if (currentLessonIndex === 0) return;

    setCurrentLessonIndex((prev) => prev - 1);

    // Enter review mode
    setIsReviewingPreviousLesson(true);

    // Reset quiz UI (not progress)
    setCurrentQuizIndex(0);
    setShowQuizResults(false);
    setQuizAnswers({});
    setQuestionAnswered(false);

    setTimeout(() => {
      document
        .querySelector(".lesson-top-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 5);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Course Header */}
      {/* confetti */}
      {showConfetti && <Confetti duration={25000} />}

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Courses</span>
          <ChevronRight className="h-4 w-4" />
          <span>{startCourse?.course?.title}</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{startCourse?.course?.title}</h1>
            <p className="text-muted-foreground mt-2">
              {`${startCourse?.course?.description.substring(0, 250)}...`}
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-400 border-blue-500/20"
          >
            {completedItems} / {totalItems} completed
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Lessons ({startCourse?.course?.lessons.length})
          </TabsTrigger>
          <TabsTrigger value="scenarios" disabled={!allLessonsCompleted}>
            {!allLessonsCompleted && (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
            <FileText className="h-4 w-4" />
            Scenario
          </TabsTrigger>
        </TabsList>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-6">
          <div className="lesson-top-anchor"></div>

          <Card className="bg-card border-border">
            <div className="p-6 space-y-6">
              {/* Lesson Navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lesson {currentLessonIndex + 1} of{" "}
                    {startCourse?.course?.lessons.length}
                  </p>
                </div>
                {isCurrentLessonQuizCompleted && (
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-400 border-green-500/20"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>

              {isReviewingPreviousLesson && (
                <Badge className="mb-3 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  Reviewing Lesson
                </Badge>
              )}

              {/* Lesson Summary */}
              <div className="space-y-4">
                <EditorJsRenderer data={currentLesson?.textContent} />

                {/* Quick Check Quiz */}
                {/* -------------------- QUICK CHECK BLOCK WITH ANIMATIONS -------------------- */}

                {!isReviewingPreviousLesson ? (
                  <>
                    <div
                      className="pt-6 border-t border-border"
                      key={`lesson-${currentLesson?.id}`}
                    >
                      <h3 className="font-semibold mb-4">Quick Check</h3>

                      {(() => {
                        const quiz =
                          currentLesson?.assessments?.[currentQuizIndex];
                        if (!quiz) return null;

                        const quizId = `${currentLesson.id}-q-${currentQuizIndex}`;
                        const isLastQuestion =
                          currentQuizIndex ===
                          currentLesson.assessments.length - 1;

                        return (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={
                                quizId +
                                (showQuizResults ? "-results" : "-question")
                              }
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.25 }}
                              className="space-y-4"
                            >
                              {/* Question text */}
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.05 }}
                                className="font-medium"
                              >
                                {quiz.question}
                              </motion.p>

                              {/* Options */}
                              <motion.div
                                layout
                                transition={{ duration: 0.25 }}
                              >
                                <RadioGroup
                                  value={quizAnswers[quizId] ?? ""}
                                  onValueChange={(value) =>
                                    setQuizAnswers((prev) => ({
                                      ...prev,
                                      [quizId]: value,
                                    }))
                                  }
                                  className="space-y-3"
                                  disabled={
                                    showQuizResults ||
                                    isCurrentLessonQuizCompleted
                                  }
                                >
                                  {quiz.options.map((option, optIndex) => {
                                    const optionId = `${quizId}-opt-${optIndex}`;
                                    const isCorrect =
                                      optIndex === quiz.correctAnswer;
                                    const isSelected =
                                      quizAnswers[quizId] === String(optIndex);
                                    // setSelectedAnswer(isSelected)
                                    return (
                                      <motion.div
                                        key={optionId}
                                        layout
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                                          showQuizResults
                                            ? isCorrect
                                              ? "bg-green-500/10 border-green-500/20"
                                              : isSelected
                                                ? "bg-red-500/10 border-red-500/20"
                                                : "bg-card border-border"
                                            : "bg-card border-border hover:border-blue-500/30"
                                        }`}
                                      >
                                        <RadioGroupItem
                                          value={String(optIndex)}
                                          id={optionId}
                                          disabled={showQuizResults}
                                        />

                                        <div className="flex-1">
                                          <Label
                                            htmlFor={optionId}
                                            className="text-sm cursor-pointer"
                                          >
                                            {option}
                                          </Label>

                                          {/* Animated explanation */}
                                          <AnimatePresence>
                                            {showQuizResults && isCorrect && (
                                              <motion.p
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-xs text-muted-foreground mt-1"
                                              >
                                                {quiz.explanation}
                                              </motion.p>
                                            )}
                                          </AnimatePresence>
                                        </div>

                                        {showQuizResults && isCorrect && (
                                          <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                              type: "spring",
                                              stiffness: 260,
                                              damping: 15,
                                            }}
                                          >
                                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                                          </motion.div>
                                        )}
                                      </motion.div>
                                    );
                                  })}
                                </RadioGroup>
                              </motion.div>

                              {/* Submit button */}
                              {!showQuizResults &&
                                !isReviewingPreviousLesson &&
                                !isCurrentLessonQuizCompleted && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                  >
                                    {!isReviewingPreviousLesson &&
                                      !showQuizResults && (
                                        <Button
                                          className="mt-4 cursor-pointer"
                                          disabled={
                                            !quizAnswers[quizId] ||
                                            isSubmittingQuiz
                                          }
                                          onClick={async () => {
                                            const isCorrect =
                                              Number(quizAnswers[quizId]) ===
                                              quiz.correctAnswer;

                                            setIsSubmittingQuiz(true);

                                            await handleCourseProgressUpdate(
                                              currentLesson?.id,
                                              currentLesson?.id,
                                              isCorrect ? 5 : 0
                                            );
                                            setIsSubmittingQuiz(false);
                                            setQuestionAnswered(true);
                                            setShowQuizResults(true);

                                            // If this is the last question, mark lesson completed
                                            if (isLastQuestion) {
                                              setLessonQuizCompleted(
                                                (prev) => ({
                                                  ...prev,
                                                  [currentLesson.id]: true,
                                                })
                                              );
                                            }
                                          }}
                                        >
                                          {isSubmittingQuiz
                                            ? "Submitting answer..."
                                            : "Submit Answer"}
                                        </Button>
                                      )}
                                  </motion.div>
                                )}

                              {/* Navigation buttons after results */}
                              {!isReviewingPreviousLesson && (
                                <>
                                  {" "}
                                  {showQuizResults && (
                                    <motion.div
                                      layout
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.25 }}
                                      className="flex justify-between mt-4"
                                    >
                                      <Button
                                        variant="outline"
                                        disabled={
                                          currentQuizIndex === 0 ||
                                          lessonQuizCompleted[
                                            currentLesson?.id
                                          ] === true
                                        }
                                        onClick={() => {
                                          setShowQuizResults(false);
                                          setCurrentQuizIndex(
                                            (prev) => prev - 1
                                          );
                                        }}
                                      >
                                        Previous
                                      </Button>

                                      {!isLastQuestion && (
                                        <Button
                                          className="cursor-pointer"
                                          disabled={
                                            !questionAnswered || // instead of lessonQuizCompleted
                                            !showQuizResults ||
                                            isSubmittingQuiz
                                          }
                                          onClick={() => {
                                            setShowQuizResults(false);
                                            setCurrentQuizIndex(
                                              (prev) => prev + 1
                                            );
                                          }}
                                        >
                                          Next Question
                                        </Button>
                                      )}
                                    </motion.div>
                                  )}
                                </>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        );
                      })()}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    You are reviewing a previously completed lesson. Quiz
                    answers are locked.
                  </p>
                )}
              </div>

              {/* Lesson Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-border">
                {/* PREVIOUS BUTTON */}
                {currentLessonIndex != 0 ? (
                  <Button
                    variant="outline"
                    onClick={prevLesson}
                    disabled={
                      currentLessonIndex === 0 || // can't go back from lesson 0
                      lockedLessons.includes(currentLessonIndex) // locked by nextLesson()
                    }
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="invisible"
                    aria-hidden="true"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                )}

                {/* NEXT OR SCENARIO BUTTON */}
                {currentLessonIndex ===
                startCourse?.course?.lessons.length - 1 ? (
                  /* LAST LESSON → SHOW START SCENARIO */
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      // complete final lesson BEFORE switching
                      setLessonQuizCompleted((prev) => ({
                        ...prev,
                        [currentLesson.id]: true,
                      }));
                      setCompletedLessons((prev) => [
                        ...new Set([...prev, currentLesson.id]),
                      ]);
                      setLockedLessons((prev) => [...prev, currentLessonIndex]);

                      setActiveTab("scenarios"); // open scenario
                      setTimeout(() => {
                        const scenarioCard = document.querySelector(
                          ".scenario-top-anchor"
                        );
                        scenarioCard?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }, 10);
                    }}
                    disabled={!isCurrentLessonQuizCompleted} // must finish quiz
                  >
                    Start Scenario
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      nextLesson();
                    }}
                    disabled={
                      !isCurrentLessonQuizCompleted &&
                      !isReviewingPreviousLesson
                    }
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>

              {!isCurrentLessonQuizCompleted && !isReviewingPreviousLesson && (
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  Complete all quick checks to unlock the next lesson.
                </p>
              )}
            </div>
            {!allLessonsCompleted && (
              <div className="text-sm text-muted-foreground flex items-center gap-2 py-2">
                <Lock className="h-4 w-4 ms-2" />
                Complete all lessons to unlock the scenario.
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Scenarios Tab */}
        <div className="scenario-top-anchor"></div>
        <TabsContent value="scenarios" className="space-y-6">
          <Card className="bg-card border-border">
            <div className="p-6 space-y-6">
              {/* Scenario Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h2 className="text-2xl font-bold">
                    {currentScenario?.title}
                  </h2>
                </div>
              </div>

              {/* Scenario Situation */}
              <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-4">
                <EditorJsRenderer data={currentScenario?.instructions} />
              </div>

              {/* Scenario Question */}
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="scenario-answer"
                    className="text-base font-semibold"
                  >
                    How would you respond to this situation?
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Think through the situation and provide your detailed
                    response below.
                  </p>
                  <Textarea
                    id="scenario-answer"
                    placeholder="Type your response here..."
                    value={scenarioAnswer}
                    onChange={(e) => setScenarioAnswer(e.target.value)}
                    className="min-h-[200px] bg-background"
                  />
                </div>

                {feedback != "" && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="gap-3 p-4 rounded-lg border transition-colors bg-green-500/10 border-green-500/20"
                  >
                    <label className="text-base font-semibold">Feedback</label>
                    <p>{feedback}</p>
                  </motion.div>
                )}

                {showCompletionPanel && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 mt-6 rounded-xl border bg-background shadow-sm space-y-4"
                  >
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {finalStatus === "passed" ? (
                        <>🎉 Congratulations!</>
                      ) : (
                        <>❌ You did not pass</>
                      )}
                    </h2>

                    <p className="text-muted-foreground text-sm">
                      {finalStatus === "passed"
                        ? "You’ve successfully completed this course."
                        : "You can retake the course to improve your understanding."}
                    </p>

                    {finalScore !== null && (
                      <p className="font-medium text-lg">
                        Final Score: {finalScore.toFixed(0)}%
                      </p>
                    )}

                    <div className="flex gap-3">
                      {finalStatus === "passed" && (
                        <Button
                          onClick={() => router.push("/dashboard/certificate")}
                        >
                          View Certificate
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard")}
                      >
                        Return to Dashboard
                      </Button>

                      <Button
                        disabled={retakeLoding}
                        className="cursor-pointer"
                        variant="ghost"
                        onClick={handleRetakeCourse}
                      >
                        {retakeLoding ? "Retaking course..." : "Retake Course"}
                      </Button>
                    </div>
                  </motion.div>
                )}
                {!showCompletionPanel && (
                  <Button
                    onClick={markScenarioComplete}
                    disabled={!scenarioAnswer.trim() || isLoading}
                    className="w-full cursor-pointer"
                  >
                    {isLoading ? "Submitting response..." : "Submit Response"}
                    {isLoading && <Spinner />}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <ScenarioOverlay open={isLoading} />
    </div>
  );
}
