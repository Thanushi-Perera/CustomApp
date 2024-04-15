import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  const newDocument = new Document(req.body);

  try {
    const savedDocument = await newDocument.save();
    res.status(200).json({
      success: true,
      message: "Successfully saved the new Document",
      data: savedDocument,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to save the new Document",
    });
  }
};

export const getSingleDocument = async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully get the document",
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find the document",
    });
  }
};

export const getDocumentsOfJob = async (req, res) => {
    const id = req.params.id;
    try {
      const documents = await Document.find({ JobNumber: id });
      res.status(200).json({
        success: true,
        message: "Successfully get the documents related to specific job number",
        data: documents,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to find the documents related to specific job number",
      });
    }
  };

export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({});
    res.status(200).json({
      success: true,
      message: "Successfully get all documents",
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find documents",
    });
  }
};
