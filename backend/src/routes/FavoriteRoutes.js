const router = require("express").Router();
const FavoriteController = require("../controllers/FavoriteController");

// Middleware
const VerifyToken = require("../middlewares/virifyToken");

// Todas as rotas de favoritos exigem autenticação
router.use(VerifyToken);

// Adicionar favorito
router.post("/", FavoriteController.addFavorite);

// Remover favorito
router.delete(
  "/favorites/:itinerario_id",
  FavoriteController.removeFavorite
);

// Listar favoritos
router.get(
  "/favorites",
  FavoriteController.getFavorites
);

// Verificar favorito
router.get(
  "/favorites/check/:itinerario_id",
  FavoriteController.checkFavorite
);

module.exports = router;