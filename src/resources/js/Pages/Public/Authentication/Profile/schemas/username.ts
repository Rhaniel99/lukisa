// schemas/username.ts
import { z } from "zod";
const usernameSchema = z.string().min(3).max(255).regex(/^[a-zA-Z0-9._]+$/, "Use apenas letras, números, ponto (.) ou underline (_), sem espaços");
export default usernameSchema;
