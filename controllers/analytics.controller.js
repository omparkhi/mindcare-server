import UserModel from "../models/user.model.js";
import SurveyModel from "../models/survey.model.js";

import MentalHealthReport from "../models/report.model.js";

export async function getAnalytics(req, res) {
  try {
    // Count total registered users
    const userCount = await UserModel.countDocuments();

    // Count total surveys submitted
    const surveyCount = await MentalHealthReport.countDocuments();

    // Aggregate averages from scores and userInputs fields
    const aggregateStats = await MentalHealthReport.aggregate([
      {
        $group: {
          _id: null,
          avg_stress: { $avg: "$scores.stress" },
          avg_anxiety: { $avg: "$scores.anxiety" },
          avg_sleepQuality: { $avg: "$scores.sleepQuality" },
          avg_emotionalWellBeing: { $avg: "$scores.emotionalWellBeing" },
          avg_age: {
            $avg: {
              $toDouble: "$userInputs.age",
            },
          },
          // You can add more fields from userInputs as needed if numeric
        },
      },
    ]);

    res.status(200).json({
      userCount,
      surveyCount,
      stats: aggregateStats[0] || {},
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics data." });
  }
}

// export async function getAnalytics(req, res) {
//   try {
//     // Count total registered users
//     const userCount = await UserModel.countDocuments();

//     // Count total surveys submitted
//     const surveyCount = await SurveyModel.countDocuments();

//     // Aggregate averages for specified survey fields
//     const aggregateStats = await SurveyModel.aggregate([
//       {
//         $group: {
//           _id: null,
//           avg_academic_pressure: { $avg: "$survey.academic_pressure" },
//           avg_work_pressure: { $avg: "$survey.work_pressure" },
//           avg_cgpa: { $avg: "$survey.cgpa" },
//           avg_study_satisfaction: { $avg: "$survey.study_satisfaction" },
//           avg_job_satisfaction: { $avg: "$survey.job_satisfaction" },
//           avg_financial_stress: { $avg: "$survey.financial_stress" },
//           avg_age: { $avg: "$survey.age" },
//           avg_work_study_hours: { $avg: "$survey.work_study_hours" },
//         },
//       },
//     ]);

//     res.status(200).json({
//       userCount,
//       surveyCount,
//       stats: aggregateStats[0] || {},
//     });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ message: "Failed to fetch analytics data." });
//   }
// }
