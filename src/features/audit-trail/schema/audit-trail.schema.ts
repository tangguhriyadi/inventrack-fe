import * as yup from "yup";
import ActionLog from "../../../enums/user-log.enum";

export const auditTrailSchema = yup.object({
  id: yup.string().required(),
  user_id: yup.string().required(),
  user_name: yup.string().required(),
  action: yup.string().oneOf(Object.values(ActionLog)).required(),
  created_at: yup.date().required(),
  inventory: yup.string().optional(),
  inventory_id: yup.string().optional(),
});

export type AuditTrailSchema = yup.InferType<typeof auditTrailSchema>;
