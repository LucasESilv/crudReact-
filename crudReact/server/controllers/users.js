import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios"; // Aqui estamos selecionando todos os usuários da tabela 'usuarios'

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao consultar usuários:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data); // Se a consulta for bem-sucedida, retorna os dados dos usuários
  });
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM usuarios WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro ao consultar usuário:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0)
      res.status(404).json({ error: "Usuário não encontrado" });

    return res.status(200).json(data[0]); // Retorna apenas o primeiro resultado encontrado
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`,`data_nascimento`, `idade`, `rua`, `bairro`, `estado`, `biografia`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.data_nascimento,
    req.body.idade,
    req.body.rua,
    req.body.bairro,
    req.body.estado,
    req.body.biografia,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `data_nascimento` = ?, `idade` = ?, `rua` = ?, `bairro` = ?, `estado` = ?, `biografia` = ? WHERE `id` = ?";

    const { nome, data_nascimento, idade, rua, bairro, estado, biografia } = req.body;
    const {id}= req.params;
        
    const values = [nome, data_nascimento, idade, rua, bairro, estado, biografia, id];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ error: "Erro interno do servidor", details: err.message });
     }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
