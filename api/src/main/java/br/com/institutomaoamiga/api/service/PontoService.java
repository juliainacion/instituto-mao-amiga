package br.com.institutomaoamiga.api.service;
import br.com.institutomaoamiga.api.dto.*; import br.com.institutomaoamiga.api.entity.Ponto; import br.com.institutomaoamiga.api.repository.PontoRepository;
import org.springframework.data.domain.Page; import org.springframework.data.domain.Pageable; import org.springframework.http.HttpStatus; import org.springframework.stereotype.Service; import org.springframework.web.server.ResponseStatusException; import java.util.UUID;
@Service public class PontoService {
 private final PontoRepository repository; public PontoService(PontoRepository repository){this.repository=repository;}
 public Page<PontoResponseDTO> filtrar(String filtro,Pageable pageable){return repository.filtrar(filtro,pageable).map(PontoResponseDTO::fromEntity);}
 public PontoResponseDTO buscarPorId(UUID id){return repository.findById(id).map(PontoResponseDTO::fromEntity).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Ponto não encontrado"));}
 public PontoResponseDTO cadastrar(PontoRequestDTO d){return PontoResponseDTO.fromEntity(repository.save(new Ponto(d.nome().trim(),d.endereco().trim(),d.bairro().trim(),d.horario().trim(),d.tipo().trim().toLowerCase())));}
 public PontoResponseDTO editar(UUID id,PontoRequestDTO d){Ponto p=repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Ponto não encontrado"));p.setNome(d.nome().trim());p.setEndereco(d.endereco().trim());p.setBairro(d.bairro().trim());p.setHorario(d.horario().trim());p.setTipo(d.tipo().trim().toLowerCase());return PontoResponseDTO.fromEntity(repository.save(p));}
 public void excluir(UUID id){if(!repository.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Ponto não encontrado");repository.deleteById(id);}
}
