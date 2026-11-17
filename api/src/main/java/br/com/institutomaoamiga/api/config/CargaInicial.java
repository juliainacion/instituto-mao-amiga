package br.com.institutomaoamiga.api.config;
import br.com.institutomaoamiga.api.entity.Ponto; import br.com.institutomaoamiga.api.repository.PontoRepository; import org.springframework.boot.CommandLineRunner; import org.springframework.context.annotation.Bean; import org.springframework.context.annotation.Configuration; import java.util.List;
@Configuration public class CargaInicial {
 @Bean CommandLineRunner carregarPontos(PontoRepository r){return args->{if(r.count()==0){r.saveAll(List.of(
 new Ponto("Ponto Central - Setor Bueno","Rua T-30, Setor Bueno, Goiânia","Setor Bueno","Seg a Sex, 8h às 17h","coleta"),
 new Ponto("Feira do Cerrado - Campinas","Praça Joaquim Lúcio, Goiânia","Campinas","Sáb, 6h às 11h","coleta"),
 new Ponto("Escola Municipal Vila Nova","Rua 15, Vila Nova, Goiânia","Vila Nova","Seg a Sex, 13h às 17h","coleta"),
 new Ponto("Associação Jardim América","Av. C-4, Jardim América, Goiânia","Jardim América","Seg a Sex, 9h às 16h","coleta"),
 new Ponto("Centro de Distribuição Norte","Av. Perimetral Norte, Goiânia","Finsocial","Seg a Sex, 8h às 17h","distribuição"),
 new Ponto("Paróquia São Paulo Apóstolo","Rua T-48, Setor Bueno, Goiânia","Setor Bueno","Ter e Qui, 14h às 18h","distribuição"),
 new Ponto("Instituto Mão Amiga - Centro","Rua 4, Setor Central, Goiânia","Setor Central","Seg a Sex, 8h às 17h","coleta"),
 new Ponto("Centro Comunitário Jardim Novo Mundo","Av. New York, Goiânia","Jardim Novo Mundo","Seg a Sáb, 9h às 16h","distribuição"),
 new Ponto("Associação Vila Redenção","Rua 1, Vila Redenção, Goiânia","Vila Redenção","Seg a Sex, 8h às 16h","coleta"),
 new Ponto("Centro Social Pedro Ludovico","Av. Circular, Goiânia","Pedro Ludovico","Seg a Sex, 9h às 17h","distribuição"),
 new Ponto("Ponto Solidário Jardim Goiás","Rua  do Parque, Jardim Goiás, Goiânia","Jardim Goiás","Seg a Sex, 8h às 17h","coleta"),
 new Ponto("Igreja São Judas Tadeu","Rua 90, Setor Sul, Goiânia","Setor Sul","Dom, 8h às 12h","distribuição"),
 new Ponto("Centro Comunitário Urias Magalhães","Av. Perimetral, Goiânia","Urias Magalhães","Seg a Sex, 8h às 17h","coleta"),
 new Ponto("Associação Parque Amazônia","Av. Rio Verde, Goiânia","Parque Amazônia","Seg a Sex, 9h às 16h","distribuição"),
 new Ponto("Escola Comunitária Novo Horizonte","Rua NH-2, Goiânia","Novo Horizonte","Seg a Sex, 13h às 17h","coleta"),
 new Ponto("Ponto Solidário Setor Oeste","Rua 9, Setor Oeste, Goiânia","Setor Oeste","Seg a Sex, 8h às 18h","coleta"),
 new Ponto("Centro de Apoio Campinas","Av. 24 de Outubro, Goiânia","Campinas","Seg a Sáb, 8h às 16h","distribuição"),
 new Ponto("Associação Finsocial","Rua VF-15, Goiânia","Finsocial","Seg a Sex, 8h às 17h","coleta"),
 new Ponto("Paróquia Sagrada Família","Rua C-14, Jardim América, Goiânia","Jardim América","Ter e Qui, 14h às 18h","distribuição"),
 new Ponto("Centro de Apoio Vila Canaã","Rua VC-5, Goiânia","Vila Canaã","Seg a Sex, 9h às 17h","coleta"),
 new Ponto("Ponto Solidário Santa Genoveva","Av. São Francisco, Goiânia","Santa Genoveva","Seg a Sex, 8h às 16h","coleta"),
 new Ponto("Associação Balneário Meia Ponte","Rua B-1, Goiânia","Balneário Meia Ponte","Seg a Sex, 9h às 17h","distribuição"),
 new Ponto("Centro Comunitário Jardim Curitiba","Rua JC-10, Goiânia","Jardim Curitiba","Seg a Sáb, 8h às 16h","coleta"),
 new Ponto("Ponto Solidário Setor Universitário","Rua 235, Goiânia","Setor Universitário","Seg a Sex, 8h às 17h","coleta"),
 new Ponto("Associação Residencial Itaipu","Rua RI-4, Goiânia","Residencial Itaipu","Seg a Sex, 9h às 16h","distribuição")
));}};}
}
