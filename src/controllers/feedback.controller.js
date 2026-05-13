import feedBackModel from "../models/feedback.model";

export const createFeedBack = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "empty text",
      });
    }

    const userFeedback = await feedBackModel.create({
      text,
      user: req.user.id,
    });

    return res.status(201).json({
      data: userFeedback.text,
      message: "feedBack added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "api error",
    });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedBackModel.find({ user: req.user.id });
    return res.status(200).json({
      data: feedbacks,
      message: "all feedBacks",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "api error",
    });
  }
};

export const getAllFeedbacksAdmin = async (req, res) => {
  try {
    const feedbacks = await feedBackModel
      .find()
      .populate("user", "username email role");

    return res.status(200).json({
      data: feedbacks,
      message: "all feedbacks",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "api error",
    });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);

    const { upatedText } = req.body;

    const pevFeedBack = await feedBackModel.findByIdAndUpdate(id, {
      text: upatedText,
    });

    return res.status(201).json({
      data: upatedText,
      message: "feedback is updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "api error",
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id:", id);

    const feedback = await feedBackModel.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      message: "feedBack text is deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "api error",
    });
  }
};
