import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleError = {
  successCreate: () => toast.success("Contact Created!"),
  sucessEdit: () => toast.success("Contact Edited!"),
  successDelete: () => toast.success("Contact Deleted!"),
  errorCreate: () => toast.error("Error Editing Contact"),
  errorEdit: () => toast.error("Error Editing Contact"),
  errorDelete: () => toast.error("Error Deleting Contact"),
};
