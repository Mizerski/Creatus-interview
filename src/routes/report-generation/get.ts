import { Router } from "express";

import { requireLevelFive } from "@/middlewares/report-generation/verify-level";
import { verifyToken } from "@/middlewares/report-generation/verify-token";
import { UserModel } from "@/models/users/user-model";
import { createPDF } from "@/utils/pdf/create";
import RoutePaths from "@/routes/users/paths";

const router = Router();

router.get(
  RoutePaths.ReportGeneration,
  verifyToken,
  requireLevelFive,
  async (_request, response) => {
    try {
      const users = await UserModel.find({});

      let content = "Lista de Usuários:\n\n";
      users.forEach((user, index) => {
        content += `
        ${index + 1}. 
        ${user.name} -
         ${user.email}\n - 
         Nível: ${user.level}\n\n`;
      });

      const pdfBuffer = await createPDF(content);

      response.setHeader("Content-Type", "application/pdf");

      response.send(pdfBuffer);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
      response.status(500).send("Erro ao gerar o PDF");
    }
  }
);

export default router;
