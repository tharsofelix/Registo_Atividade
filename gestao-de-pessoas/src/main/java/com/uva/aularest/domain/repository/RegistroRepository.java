package com.uva.aularest.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uva.aularest.domain.model.Registro;

public interface RegistroRepository extends JpaRepository<Registro, Integer>{

	List<Registro> findByAtividadeContaining(String atividade);

	List<Registro> findByCategoria(Integer categoria);

}
