-- --------------------------------------------------------
-- Estrutura da tabela `itinerarios`
-- --------------------------------------------------------

/*
========================================================
ESTRUTURA DA TABELA ITINERARIOS
========================================================

CREATE TABLE itinerarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    origem VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    tipo ENUM('ida', 'volta') NOT NULL,
    horario TIME NOT NULL,
    dias_semana VARCHAR(100) DEFAULT NULL,
    via TEXT DEFAULT NULL,
    rota TEXT DEFAULT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_titulo (titulo),
    INDEX idx_horario (horario),
    INDEX idx_origem_destino (origem, destino)
);

========================================================
*/
-- INSERTS - ITINERÁRIO OUTLET
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '07:40:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '11:40:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '12:00:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '12:30:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '13:00:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '14:10:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '15:00:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '15:50:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '16:40:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '19:10:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Rodoviária', 'Outlet Catarina', 'ida', '20:10:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '08:20:00', 'Dias úteis', 'Via Aeroporto', NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '10:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '11:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '13:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '14:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '15:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'Rodoviária', 'volta', '17:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'Rodoviária', 'volta', '21:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'Rodoviária', 'volta', '21:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'Rodoviária', 'volta', '21:30:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('OUTLET', 'Outlet Catarina', 'São João Novo', 'volta', '22:30:00', 'Dias úteis', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - ITINERÁRIO OUTLET/SABOÓ
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '05:50:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '07:30:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '08:20:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '10:50:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '13:20:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '18:20:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '20:50:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Rodoviária', 'Outlet Catarina', 'ida', '21:40:00', 'Dias úteis', 'Saboó', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Livio Tagliassachi, Estrada do Morro do Saboó, Rodovia Castelo Branco', '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'São João Novo', 'volta', '09:10:00', 'Dias úteis', 'Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'São João Novo', 'volta', '12:30:00', 'Dias úteis', 'Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'São João Novo', 'volta', '15:50:00', 'Dias úteis', 'Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'São João Novo', 'volta', '16:40:00', 'Dias úteis', 'Aeroporto/Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'São João Novo', 'volta', '17:30:00', 'Dias úteis', 'Aeroporto/Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'Rodoviária', 'volta', '19:10:00', 'Dias úteis', 'Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'Rodoviária', 'volta', '20:20:00', 'Dias úteis', 'Saboó', NULL, '2022-11-27'),
('OUTLET/SABOÓ', 'Outlet Catarina', 'São João Novo', 'volta', '21:40:00', 'Dias úteis', 'Saboó', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - ITINERÁRIO SABOÓ
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '08:50:00', 'Segunda a Sexta', 'Acácias/Mombaca', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Lívio Tagliassachi, Estrada do Morro do Saboó, Estrada de Moreiras (Acácias), Retorno na represa, Estrada do Morro do Saboó, Viaduto Ewaldo F do Amaral, Rua das Primaveras do Mombaça', '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '12:30:00', 'Segunda a Sexta', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '17:50:00', 'Segunda a Sexta', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '19:30:00', 'Segunda a Sexta', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '13:40:00', 'Segunda a Sexta', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '16:00:00', 'Segunda a Sexta', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '18:40:00', 'Segunda a Sexta', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '09:00:00', 'Sábado', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '10:30:00', 'Sábado', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '12:50:00', 'Sábado', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '17:40:00', 'Sábado', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '10:00:00', 'Sábado', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '11:30:00', 'Sábado', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '13:50:00', 'Sábado', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '09:30:00', 'Domingos e Feriados', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '14:30:00', 'Domingos e Feriados', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Rodoviária', 'Saboó', 'ida', '19:00:00', 'Domingos e Feriados', 'Acácias/Mombaca', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '10:30:00', 'Domingos e Feriados', 'Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ', 'Saboó', 'Rodoviária', 'volta', '15:30:00', 'Domingos e Feriados', 'Mombaca/Acácias', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - ITINERÁRIO SABOÓ/CACHOEIRA
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SABOÓ/CACHOEIRA', 'Rodoviária', 'Saboó', 'ida', '08:50:00', 'Segunda a Sexta', 'Acácias/Cachoeira/Mombaca', 'Av. John Kennedy, Av. Três de Maio, Av. Brasil, Av. Varanguera, Rodovia Lívio Tagliassachi, Estrada do Morro do Saboó, Estrada de Moreiras (Acácias), Retorno na represa, Estrada do Morro do Saboó, Viaduto Ewaldo F do Amaral, Rua da Praça, Estrada da Cachoeira, Rua das Primaveras do Mombaça', '2022-11-27'),
('SABOÓ/CACHOEIRA', 'Rodoviária', 'Saboó', 'ida', '14:45:00', 'Segunda a Sexta', 'Acácias/Mombaca/Cachoeira', NULL, '2022-11-27'),
('SABOÓ/CACHOEIRA', 'Saboó', 'Rodoviária', 'volta', '05:15:00', 'Segunda a Sexta', 'Cachoeira/Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ/CACHOEIRA', 'Saboó', 'Rodoviária', 'volta', '10:10:00', 'Segunda a Sexta', 'Cachoeira/Mombaca/Acácias', NULL, '2022-11-27'),
('SABOÓ/CACHOEIRA', 'Saboó', 'Rodoviária', 'volta', '16:00:00', 'Segunda a Sexta', 'Cachoeira/Mombaca/Acácias', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - ITINERÁRIO SÃO JOÃO NOVO
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '04:30:00', 'Dias úteis', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rodovia Raposo Tavares, Rua Sergipe, Rodovia Raposo Tavares, Rua Luiz Mateus Mailasqui, Rua Leôncio de Toledo, Rua Inoc Capareli, Av. Getúlio Ribeiro Santos, Rua Profª Célia Asse Jacob, Rua Luiz Mateus Mailasqui, Estrada de Itapevi, Rua Eugenio Benedito Pedrosa, Rua José Benedito Rodrigues, Rua Giuseppe Garzella, Rua Faustina Maria das Dores, Estrada de Itapevi', '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '05:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '05:30:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '06:30:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '07:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '09:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '10:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '10:50:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '11:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '13:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '14:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '15:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '16:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '17:30:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '18:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '19:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '20:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '21:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'Rodoviária', 'São João Novo', 'ida', '23:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '05:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '06:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '06:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '08:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '09:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '10:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '10:50:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '11:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '12:30:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '13:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '14:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '15:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '15:50:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '16:40:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '18:20:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '19:10:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '20:00:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Outlet Catarina', 'volta', '20:50:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '22:30:00', 'Dias úteis', NULL, NULL, '2022-11-27'),
('SÃO JOÃO NOVO', 'São João Novo', 'Rodoviária', 'volta', '23:20:00', 'Dias úteis', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - GUAÇU (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '04:40:00', 'Segunda a Sexta', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Paulino Hermilio de Campos, Rua Santa Quitéria, Av. Brasil, Av. Varanguera, Rua Ébano, Rua dos Carvalhos, Rua das Acácias, Rua Eng. Rosalina Salveti, Rua Jamila Abumanssur Mana, Rodovia Lívio Tagliassachi, Rua Salvador de Oliveira Santos, Estrada do Candor, Rua Bem Te Vi', '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '05:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '06:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '09:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '10:20:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '11:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '13:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '15:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '17:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '20:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '05:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '06:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '07:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '08:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '09:20:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '10:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '12:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '12:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '13:20:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '14:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '16:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '17:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '18:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '19:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '20:20:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '22:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '23:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - GUAÇU (Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '04:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '05:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '06:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '09:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '10:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '13:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '14:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '15:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '17:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '20:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '21:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '22:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '05:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '06:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '07:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '08:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '09:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '10:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '12:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '13:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '14:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '16:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '17:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '18:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '19:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '20:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '21:40:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '23:00:00', 'Sábado', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - GUAÇU (Domingos e Feriados)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '07:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '09:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '11:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '13:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '15:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '17:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '19:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Rodoviária', 'Guaçu', 'ida', '21:20:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '07:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '09:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '11:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '13:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '15:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '17:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '19:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('GUAÇU', 'Guaçu', 'Rodoviária', 'volta', '21:40:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - GUAÇU/CANDOR (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '07:40:00', 'Segunda a Sexta', 'Até Candor', 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Paulino Hermilio de Campos, Rua Santa Quitéria, Av. Brasil, Av. Varanguera, Rua Ébano, Rua dos Carvalhos, Rua das Acácias, Rua Eng. Rosalina Salveti, Rua Jamila Abumanssur Mana, Rodovia Lívio Tagliassachi, Rua Salvador de Oliveira Santos, Estrada do Candor, Rua Bem Te Vi, Rua Erlindo José da Silva (Candor)', '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '12:00:00', 'Segunda a Sexta', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '14:20:00', 'Segunda a Sexta', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '16:40:00', 'Segunda a Sexta', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '18:40:00', 'Segunda a Sexta', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '21:40:00', 'Segunda a Sexta', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '22:50:00', 'Segunda a Sexta', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '06:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '08:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '12:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '12:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '14:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '17:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '19:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '22:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '23:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - GUAÇU/CANDOR (Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '07:40:00', 'Sábado', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '11:40:00', 'Sábado', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '16:40:00', 'Sábado', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Rodoviária', 'Guaçu', 'ida', '18:40:00', 'Sábado', 'Até Candor', NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '08:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '12:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '17:00:00', 'Sábado', NULL, NULL, '2022-11-27'),
('GUAÇU/CANDOR', 'Guaçu', 'Rodoviária', 'volta', '19:00:00', 'Sábado', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - SANTO ANTONIO (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '06:10:00', 'Segunda a Sexta', NULL, 'Av. John Kennedy, Av. Três de Maio, Rua José Gomide de Castro, Rua Júlio Xavier Ferreira, Rua Maestro Porfirio Tavares, Rua Antonio dos Santos Sobrinho, Rua José Gomide de Castro, Rua Santos Dumont, Av. Três de Maio, Rua Valter di Filipo, Rua Sabatini Alceste, Rua São José, Rua dos Lírios, Rua Íris, Rua Ernesto Lima, Rua Rotary Club, Rua Lions Club, Rua Paes Leme, Av. Anhanguera, Av. Brasil, Av. Tiradentes, Av. John Kennedy', '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '07:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '08:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '09:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '10:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '12:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '13:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '14:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '16:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '17:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '18:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '19:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '20:20:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '06:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '07:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '08:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '09:45:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '11:05:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '12:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '13:45:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '15:05:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '16:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '17:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '18:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '19:25:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '20:45:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - SANTO ANTONIO (Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '06:10:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '08:10:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '10:30:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '11:50:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '13:10:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '15:10:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '17:10:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '19:20:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '20:50:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '06:25:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '08:25:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '10:45:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '12:05:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '13:25:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '15:25:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '17:25:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '19:35:00', 'Sábado', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '21:05:00', 'Sábado', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - SANTO ANTONIO (Domingos e Feriados)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '07:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '09:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '10:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '12:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '13:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '14:50:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '16:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Rodoviária', 'Santo Antonio', 'ida', '19:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '07:15:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '09:15:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '10:45:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '12:15:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '13:45:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '15:05:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '16:45:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('SANTO ANTONIO', 'Santo Antonio', 'Rodoviária', 'volta', '19:45:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - PAISAGEM COLONIAL (Segunda a Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '05:00:00', 'Segunda a Sábado', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rodovia Quintino de Lima, Rua Martin Afonso de Souza, Rua Dom João VI', '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '06:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '08:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '08:50:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '11:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '13:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '15:15:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '16:15:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '18:35:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '04:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '05:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '06:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '08:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '09:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '11:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '13:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '15:45:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '16:45:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '18:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - PAISAGEM COLONIAL (Domingos e Feriados)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '05:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '09:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '12:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '13:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '17:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Rodoviária', 'Paisagem Colonial', 'ida', '19:00:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '05:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '09:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '12:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '13:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '17:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27'),
('PAISAGEM COLONIAL', 'Paisagem Colonial', 'Rodoviária', 'volta', '19:30:00', 'Domingos e Feriados', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - CARMO (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('CARMO', 'Rodoviária', 'Carmo', 'ida', '06:10:00', 'Segunda a Sexta', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rua Sergipe, Rodovia Raposo Tavares, Rua Luiz Mateus Mailasqui, Rua Profª Célia Asse Jacob, Av. Getúlio Ribeiro Santos, Rodovia Raposo Tavares, Rua do Lago Caeté, Estrada Municipal do Carmo, Rua Anselmo Martinez, Rua Nossa Srª do Carmo, Rua Santa Clara', '2022-11-27'),
('CARMO', 'Rodoviária', 'Carmo', 'ida', '08:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Rodoviária', 'Carmo', 'ida', '10:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Rodoviária', 'Carmo', 'ida', '12:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Rodoviária', 'Carmo', 'ida', '14:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Rodoviária', 'Carmo', 'ida', '16:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Rodoviária', 'Carmo', 'ida', '18:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '05:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '06:15:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '09:10:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '11:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '15:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '17:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '19:00:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('CARMO', 'Carmo', 'Rodoviária', 'volta', '19:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - VARGEM GRANDE (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '05:00:00', 'Segunda a Sexta', 'Mailasqui', 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rodovia Raposo Tavares, Rua Sergipe, Rodovia Raposo Tavares, Rua Luiz Mateus Mailasqui, Rua Osvaldo Mischiatti, Rua Leôncio de Toledo, Rua Antonio Ferreira de Almeida, Rua Alberto Silva Albuquerque, Rua Jorge de Araújo, Rua Salvador Giuseppe Ceoloni, Rua Antenor Ferreira Campos, Rua Nove, Rua Argemiro de Barros, Rua Antonio Ferreira de Almeida, Rua Giusepe Primiani, Rua Leôncio de Toledo, Rua Inoc Capareli, Av. Getúlio Ribeiro Santos, Rua Profª Célia Asse Jacob, Rodovia Raposo Tavares', '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '06:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '07:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '08:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '09:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '10:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '11:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '12:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '13:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '15:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '16:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '17:10:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '19:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '20:00:00', 'Segunda a Sexta', 'Mailasqui', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - VARGEM GRANDE (Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '05:00:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '07:00:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '10:00:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '11:10:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '13:00:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '16:00:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '19:40:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '21:20:00', 'Sábado', 'Mailasqui', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - VARGEM GRANDE (Domingos e Feriados)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '06:00:00', 'Domingos e Feriados', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '11:00:00', 'Domingos e Feriados', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '19:30:00', 'Domingos e Feriados', 'Mailasqui', NULL, '2022-11-27'),
('VARGEM GRANDE', 'Rodoviária', 'Vargem Grande', 'ida', '21:20:00', 'Domingos e Feriados', 'Mailasqui', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - SOROCAMIRIM/PAVÃO via Clínicas (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '07:10:00', 'Segunda a Sexta', 'Clínicas', 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rodovia Raposo Tavares, Rua Sergipe, Rodovia Raposo Tavares, Rua Durval Vilaça, Estrada do Vinho, Estrada dos Moraes (Sorocamirim), Estrada do Vinho, Rua Sorocabana, Rua Benedito Silvino de Camargo, Rua Capitulina dos Santos, Rua Ruben C. Palmer, Rua Benedito Silvino de Camargo, Estrada das Clinicas, Estrada do Capim Fino', '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '09:00:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '10:45:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '13:10:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '14:20:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '16:45:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '17:20:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '19:20:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '21:40:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '22:40:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27'),
('SOROCAMIRIM/PAVÃO', 'Rodoviária', 'Sorocamirim/Pavão', 'ida', '23:20:00', 'Segunda a Sexta', 'Clínicas', NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - PARQUE ALIANÇA/VILA AMARAL (Segunda a Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '05:20:00', 'Segunda a Sábado', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rua das Papoulas, Av. Madre Silva, Rua das Açucenas, Tv. dos Miosotis, Rua Amor Perfeito, Rua Turmalina, Rua dos Diamantes, Rua Turmalina, Rua Rubi, Rua Esmeralda, Rua do Ouro, Rua Primeiro Sargento Aparecido Pereira, Rodovia Quintino de Lima', '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '06:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '07:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '07:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '08:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '09:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '11:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '12:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '13:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '15:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '16:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '17:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '18:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '19:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '20:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('PARQUE ALIANÇA/VILA AMARAL', 'Rodoviária', 'Parque Aliança', 'ida', '22:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - CANGUERA NORMAL (Segunda a Sábado)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '05:00:00', 'Segunda a Sábado', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rodovia Quintino de Lima', '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '05:25:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '06:10:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '06:50:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '07:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '08:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '09:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '10:10:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '11:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '11:50:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '12:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '13:30:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '14:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '15:10:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '16:00:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '16:50:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '17:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '18:10:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '18:40:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27'),
('CANGUERA', 'Rodoviária', 'Canguera', 'ida', '19:20:00', 'Segunda a Sábado', NULL, NULL, '2022-11-27');

-- --------------------------------------------------------
-- INSERTS - MOSTEIRO NORMAL (Segunda a Sexta)
-- --------------------------------------------------------
INSERT INTO `itinerarios` (`titulo`, `origem`, `destino`, `tipo`, `horario`, `dias_semana`, `via`, `rota`, `data_inicio`) VALUES
('MOSTEIRO', 'Rodoviária', 'Mosteiro', 'ida', '09:10:00', 'Segunda a Sexta', NULL, 'Av. John Kennedy, Av. Antonino Dias Bastos, Rua Sotero de Souza, Rua Santa Cruz, Rodovia Raposo Tavares, Rua Sergipe, Rodovia Raposo Tavares, Av. São Manoel, Rua Santa Rosalina, Rua Santa Augusta, Rua Pio XII, Rua José Ghissardi, Rua Geovane Paolo II, Rua João Paulo I, Rua Santa Augusta, Rua Santa Maria, Rua São Sebastião, Rua Santa Madalena, Rua Santa Pedrina, Rua Santa Emilia', '2022-11-27'),
('MOSTEIRO', 'Rodoviária', 'Mosteiro', 'ida', '11:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('MOSTEIRO', 'Rodoviária', 'Mosteiro', 'ida', '16:15:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('MOSTEIRO', 'Rodoviária', 'Mosteiro', 'ida', '18:50:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('MOSTEIRO', 'Rodoviária', 'Mosteiro', 'ida', '19:30:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27'),
('MOSTEIRO', 'Rodoviária', 'Mosteiro', 'ida', '22:40:00', 'Segunda a Sexta', NULL, NULL, '2022-11-27');
