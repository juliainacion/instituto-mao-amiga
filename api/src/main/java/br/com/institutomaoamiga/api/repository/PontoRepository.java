package br.com.institutomaoamiga.api.repository;
import br.com.institutomaoamiga.api.entity.Ponto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.UUID;
public interface PontoRepository extends JpaRepository<Ponto, UUID> {
 @Query("select p from Ponto p where :filtro is null or :filtro = '' or lower(p.nome) like lower(concat('%', :filtro, '%')) or lower(p.bairro) like lower(concat('%', :filtro, '%'))")
 Page<Ponto> filtrar(@Param("filtro") String filtro, Pageable pageable);
}
