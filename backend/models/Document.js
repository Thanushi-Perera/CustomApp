import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    DocType: {
        type: String,
        required: true,
    },
    JobNumber: {
        type: String,
        required: true,
    },
    BL_No: {
      type: String,
      default: null,
    },
    Consignee: {
      type: String,
    },
    GrossWeight: {
      type: String,
    },
    PortofDischarge: {
      type: String,
    },
    PortofLoading: {
      type: String,
    },
    Shipper: {
      type: String,
    },
    Port_of_discharge: {
      type: String,
    },
    Port_of_landing: {
      type: String,
    },
    Voyage_No: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
