package br.com.institutomaoamiga.api.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
@Entity @Table(name="doacoes")
public class Doacao {
 @Id @GeneratedValue(strategy=GenerationType.UUID) private UUID id;
 @Column(nullable=false) private String tipoItem;
 @Column(nullable=false) private Integer quantidade;
 @Column(nullable=false) private String pontoDestino;
 @Column(nullable=false, updatable=false) private LocalDateTime criadoEm;
 public Doacao() {}
 public Doacao(String tipoItem,Integer quantidade,String pontoDestino,LocalDateTime criadoEm){this.tipoItem=tipoItem;this.quantidade=quantidade;this.pontoDestino=pontoDestino;this.criadoEm=criadoEm;}
 public UUID getId(){return id;} public String getTipoItem(){return tipoItem;} public void setTipoItem(String v){tipoItem=v;}
 public Integer getQuantidade(){return quantidade;} public void setQuantidade(Integer v){quantidade=v;}
 public String getPontoDestino(){return pontoDestino;} public void setPontoDestino(String v){pontoDestino=v;}
 public LocalDateTime getCriadoEm(){return criadoEm;}
}
