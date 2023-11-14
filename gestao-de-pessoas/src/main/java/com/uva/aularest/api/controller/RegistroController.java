package com.uva.aularest.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.uva.aularest.domain.model.Registro;
import com.uva.aularest.domain.repository.RegistroRepository;

@RestController
public class RegistroController {
	
 @Autowired
 private RegistroRepository registroRepository;
	
 @GetMapping("/registros")
 public List<Registro> listar() {
  return registroRepository.findAll();
 } 
 
 @CrossOrigin
 @RequestMapping(value = "/registros/filter", method = RequestMethod.GET)	
 public List<Registro> listarPorAtividade(@RequestParam(name = "atividade", required = false) String atividade) {

 	return registroRepository.findByAtividadeContaining(atividade);
 }
 
 @CrossOrigin
 @RequestMapping(value = "/registros/categoria", method = RequestMethod.GET)	
 public List<Registro> listarPorCategoria(@RequestParam(name = "categoria", required = false) Integer categoria) {
	 return registroRepository.findByCategoria(categoria);
 }
 
 @CrossOrigin
 @GetMapping("/registros/{registroId}")
 public ResponseEntity<Registro> consultar (@PathVariable Integer registroId) {
  Optional<Registro> registro = registroRepository.findById(registroId);
  
  if (registro.isPresent()) {
   return ResponseEntity.ok(registro.get());
  
  }
  
  return ResponseEntity.notFound().build();
 } 

 @CrossOrigin
 @PostMapping("/registros")
 @ResponseStatus(HttpStatus.CREATED)
 public Registro incluir(@RequestBody Registro registro) {
  return registroRepository.save(registro);
 }

 @CrossOrigin
 @PutMapping("/registros/{registroId}")
 public ResponseEntity<Registro> alterar (@PathVariable Integer registroId, @RequestBody Registro registro) {
  if(!registroRepository.existsById(registroId)) {
   return ResponseEntity.notFound().build();
   
  }
  
  registro.setCodigo(registroId);
  registro = registroRepository.save(registro);
  return ResponseEntity.ok(registro);
 }
	
 @CrossOrigin
 @DeleteMapping("/registros/{registroId}")
 public ResponseEntity<Registro> excluir (@PathVariable Integer registroId) {
  if(!registroRepository.existsById(registroId)) {
   return ResponseEntity.notFound().build();
   
  }
  
  registroRepository.deleteById(registroId);
  return ResponseEntity.noContent().build();
  
 }
	
}