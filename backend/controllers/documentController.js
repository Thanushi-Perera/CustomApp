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

const analyzeDocuments2 = (documents) => {
    const excludedFields = ["createdAt", "updatedAt", "__v", "_id", "DocType"];
    let totalMatchingFields = 0;
    let totalUnmatchingFields = 0;
    let analysedFields = [];

    documents.forEach((doc1) => {
        Object.keys(doc1._doc).forEach((key) => {
            if (!excludedFields.includes(key) && !analysedFields.includes(key)) {
                let isMatching = true;
                documents.forEach((doc2) => {
                    if (doc2._doc[key] && doc1._doc[key] !== doc2._doc[key]) {
                        isMatching = false;
                    }
                })
                if (isMatching) {
                    totalMatchingFields++;
                } else {
                    totalUnmatchingFields++;
                }
                analysedFields.push(key);
            }
        })
    })

    return { totalMatchingFields, totalUnmatchingFields };
}

const generateStatus = (totalMatchingFields, totalUnmatchingFields) => {
    const totalFields = totalMatchingFields + totalUnmatchingFields;
    const percentage = (totalMatchingFields / totalFields) * 100;
    const status = percentage >= 80 ? "Matching" : percentage >= 40 ? "Partially matching" : "Not matching";
    return status;
}

export const analyzeDocs = async (req, res) => {
  const requiredDocumentTypes = [
    "BL",
    "DOF",
    "DOB",
    "IVF",
    "IVB",
    "MFF",
    "MFB",
  ];

  const id = req.params.id;
  try {
    const documents = await Document.find({ JobNumber: id });
    if (!documents.length) {
      res.status(404).json({
        success: false,
        message: "No documents found for the given job number",
      });
      return;
    }

    const documentTypes = documents.map((doc) => doc.DocType);
    const missingDocumentTypes = requiredDocumentTypes.filter(
      (docType) => !documentTypes.includes(docType)
    );
    if (missingDocumentTypes.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing documents: ${missingDocumentTypes.join(", ")}`,
      });
      return;
    }

    const { totalMatchingFields, totalUnmatchingFields } =
      analyzeDocuments2(documents);
    console.log(totalMatchingFields, totalUnmatchingFields);

    const status = generateStatus(totalMatchingFields, totalUnmatchingFields);
    res.status(200).json({
        success: true,
        message: "Successfully analyzed the documents",
        data: {
            totalMatchingFields,
            totalUnmatchingFields,
            status,
        },
    })


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
