interface PerformanceReview extends PerformanceReviewBase {
  id: number;
}

interface PerformanceReviews {
  [key: number]: PerformanceReview;
}

interface PerformanceReviewBase {
  rating: number;
  comment: string;
  employeeId: number;
  reviewerId: number;
}

export { PerformanceReview, PerformanceReviews, PerformanceReviewBase };
