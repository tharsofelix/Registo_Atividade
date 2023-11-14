package com.uva.aularest.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Registro{
	
 @Id
 @GeneratedValue(strategy=GenerationType.IDENTITY)
 private Integer codigo;
	
 @Column(name ="supervisor")
 private String supervisor;
 
 @Column(name ="atividade")
 private String atividade;
 
 @Column(name ="responsavel")
 private String responsavel;
 

 @Column(name ="categoria")
 private Integer categoria;
	
 @Column(name ="tem_orcamento")
 private String temOrcamento;
	
 @Column(name ="prazo_horas")
 private Integer prazo;
	
 @Column(name ="orcamento")
 private Float orcamento;
	
 @Column(name ="data_inicio")
 private String dataInicio;
 
 @Column(name ="data_conclusao")
 private String dataConclusao;
 
 @Column(name ="descricao")
 private String descricao;
	
 public Registro(){
  super();
 }

 public Registro(Integer codigo, String supervisor, String atividade, String responsavel , Integer categoria, String temOrcamento, Integer prazo,
   Float orcamento, String dataInicio,String dataConclusao, String descricao) {
  super();
  this.codigo = codigo;
  this.supervisor = supervisor;
  this.atividade = atividade;
  this.responsavel = responsavel;
  this.categoria = categoria;
  this.temOrcamento = temOrcamento;
  this.prazo = prazo;
  this.orcamento = orcamento;
  this.dataInicio = dataInicio;
  this.dataConclusao = dataConclusao;
  this.descricao = descricao;
 }

 public Registro(String supervisor, String atividade, String responsavel, Integer categoria, String temOrcamento, Integer prazo, Float orcamento,
   String dataInicio,String dataConclusao, String descricao) {
  super();
  this.supervisor = supervisor;
  this.atividade = atividade;
  this.responsavel = responsavel;
  this.categoria = categoria;
  this.temOrcamento = temOrcamento;
  this.prazo = prazo;
  this.orcamento = orcamento;
  this.dataInicio = dataInicio;
  this.dataConclusao = dataConclusao;
  this.descricao = descricao;
 }

 public Integer getCodigo() {
  return codigo;
 }

 public void setCodigo(Integer codigo) {
  this.codigo = codigo;
 }

 public String getSupervisor() {
  return supervisor;
 }

 public void setSupervisor(String supervisor) {
  this.supervisor = supervisor;
 }

 public String getAtividade() {
  return atividade;
 }

 public void setAtividade(String atividade) {
  this.atividade = atividade;
 }
 public String getResponsavel() {
  return responsavel;
 }

 public void setResponsavel(String responsavel) {
  this.responsavel = responsavel;
 }

 public Integer getCategoria() {
  return categoria;
 }

 public void setCategoria(Integer categoria) {
  this.categoria = categoria;
 }

 public String getTemOrcamento() {
  return temOrcamento;
 }

 public void setTemOrcamento(String temOrcamento) {
  this.temOrcamento = temOrcamento;
 }

 public Integer getPrazo() {
  return prazo;
 }

 public void setPrazo(Integer prazo) {
  this.prazo = prazo;
 }

 public Float getOrcamento() {
  return orcamento;
 }

 public void setOrcamento(Float orcamento) {
  this.orcamento = orcamento;
 }

 public String getDataInicio() {
  return dataInicio;
 }

 public void setDataInicio(String dataInicio) {
  this.dataInicio = dataInicio;
 }
 public String getDataConclusao() {
  return dataConclusao;
 }

 public void setDataConclusao(String dataConclusao) {
  this.dataConclusao = dataConclusao;
 }
	 
 public String getDescricao() {
  return descricao;
 }

 public void setDescricao(String descricao) {
  this.descricao = descricao;
 }

 @Override
 public String toString() {
  return "Registro [codigo=" + codigo + ", supervisor=" + supervisor + ", atividade=" + atividade + ", responsavel=" + responsavel + ",  categoria=" + categoria + ", temOrcamento="
    + temOrcamento + ", prazo=" + prazo + ", orcamento=" + orcamento + ", dataInicio=" + dataInicio  + ", dataConclusao=" + dataConclusao 
    + ", descricao=" + descricao + "]";
 }
	
	
}