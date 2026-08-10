const UserFavoriteRoute = require("../models/UserFavoriteRoute");
const Itinerario = require("../models/Bus_schedules");

module.exports = class FavoriteController {
  // =========================================================
  // ADICIONAR FAVORITO
  // POST /favorite-routes/
  // =========================================================

  static async addFavorite(req, res) {
    try {
      const userId = req.user.id;
      const { itinerario_id } = req.body;

      if (!itinerario_id) {
        return res.status(422).json({
          message: "O itinerário é obrigatório.",
        });
      }

      // Verifica se o itinerário existe
      const itinerario = await Itinerario.findByPk(itinerario_id);

      if (!itinerario) {
        return res.status(404).json({
          message: "Itinerário não encontrado.",
        });
      }

      // Verifica se já está favoritado
      const existingFavorite = await UserFavoriteRoute.findOne({
        where: {
          user_id: userId,
          itinerario_id,
        },
      });

      if (existingFavorite) {
        return res.status(409).json({
          message: "Essa rota já está nos favoritos.",
        });
      }

      // Cria o favorito
      const favorite = await UserFavoriteRoute.create({
        user_id: userId,
        itinerario_id,
      });

      return res.status(201).json({
        message: "Rota adicionada aos favoritos.",
        favorite: {
          id: favorite.id,
          itinerario_id: favorite.itinerario_id,
        },
      });
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);

      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }

  // =========================================================
  // REMOVER FAVORITO
  // DELETE /favorite-routes/favorites/:itinerario_id
  // =========================================================

  static async removeFavorite(req, res) {
    try {
      const userId = req.user.id;
      const { itinerario_id } = req.params;

      if (!itinerario_id) {
        return res.status(422).json({
          message: "O itinerário é obrigatório.",
        });
      }

      // Procura somente o favorito pertencente ao usuário logado
      const favorite = await UserFavoriteRoute.findOne({
        where: {
          user_id: userId,
          itinerario_id,
        },
      });

      if (!favorite) {
        return res.status(404).json({
          message: "Essa rota não está nos seus favoritos.",
        });
      }

      await favorite.destroy();

      return res.status(200).json({
        message: "Rota removida dos favoritos.",
      });
    } catch (error) {
      console.error("Erro ao remover favorito:", error);

      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }

  // =========================================================
  // LISTAR FAVORITOS
  // GET /favorite-routes/favorites
  // =========================================================

  static async getFavorites(req, res) {
    try {
      const userId = req.user.id;

      const favorites = await UserFavoriteRoute.findAll({
        where: {
          user_id: userId,
        },

        include: [
          {
            model: Itinerario,
            as: "itinerario",
          },
        ],

        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        favorites,
      });
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);

      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }

  // =========================================================
  // VERIFICAR SE É FAVORITO
  // GET /favorite-routes/favorites/check/:itinerario_id
  // =========================================================

  static async checkFavorite(req, res) {
    try {
      const userId = req.user.id;
      const { itinerario_id } = req.params;

      const favorite = await UserFavoriteRoute.findOne({
        where: {
          user_id: userId,
          itinerario_id,
        },
      });

      return res.status(200).json({
        isFavorite: !!favorite,
      });
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);

      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }
};
