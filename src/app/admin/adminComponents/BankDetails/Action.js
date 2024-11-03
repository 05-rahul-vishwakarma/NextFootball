"use server";

import ErrorReport from "@/app/helpers/ErrorReport";
import { connect } from "@/app/modals/dbConfig";
import { ADMIN } from "@/app/modals/modal";
import { revalidatePath } from "next/cache";

export async function editBank(prevState, formData) {
  try {
    await connect();

    let BankName = formData?.get("BankName") || "";
    let AccNumber = formData?.get("AccNumber") || "";
    let AccHolderName = formData?.get("AccHolderName") || "";
    let Ifsc = formData?.get("Ifsc") || "";

    if (!BankName || !AccNumber || !AccHolderName || !Ifsc) {
      throw new Error("Every field is required");
    }

    let isUpdated = await ADMIN.findOneAndUpdate(
      { _id: "6602ad529ec6624c93d770ce" }, // Use the appropriate _id or filter
      {
        $set: {
          "BankDetails.BankName": BankName,
          "BankDetails.AccNumber": AccNumber,
          "BankDetails.AccHolderName": AccHolderName,
          "BankDetails.Ifsc": Ifsc,
        },
      },
      {
        upsert: true, // Creates a new document if no matching document is found
        new: true,    // Returns the updated document
      }
    );

    if (!isUpdated) throw new Error("Something went wrong with the data");

    revalidatePath("/admin/betsettlement");

    return {
      message: "Bank details updated successfully",
    };
  } catch (error) {
    if (
      error?.code === 500 ||
      error?.status === 500 ||
      !error?.code ||
      !error?.status
    ) {
      ErrorReport(error);
    }
    return {
      message: error?.message || JSON.stringify(error),
    };
  }
}
