import { Router } from "express";

import { authenticateUser } from "@/services/user/authenticate-user";

import RoutePaths from "./paths";

const router = Router();

router.post(RoutePaths.AuthenticateUser, async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).send("Email e senha são obrigatórios");
  }

  const authResult = await authenticateUser(email, password);

  if (authResult.success) {
    response.send({ token: authResult.token, message: "Usuário autenticado" });
  } else {
    response.status(401).send({ message: authResult.message });
  }
});

export default router;
