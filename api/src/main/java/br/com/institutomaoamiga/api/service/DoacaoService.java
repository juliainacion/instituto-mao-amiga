package br.com.institutomaoamiga.api.service;
import br.com.institutomaoamiga.api.dto.*;
import br.com.institutomaoamiga.api.entity.Doacao;
import br.com.institutomaoamiga.api.repository.DoacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.UUID;
@Service
public class DoacaoService {
 private final DoacaoRepository repository;
 public DoacaoService(DoacaoRepository repository){this.repository=repository;}
 public Page<DoacaoResponseDTO> filtrar(String filtro,Pageable pageable){return repository.filtrar(filtro,pageable).map(DoacaoResponseDTO::fromEntity);}
 public DoacaoResponseDTO buscar(UUID id){return repository.findById(id).map(DoacaoResponseDTO::fromEntity).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Doação não encontrada"));}
 public DoacaoResponseDTO cadastrar(DoacaoRequestDTO dto){Doacao d=new Doacao(dto.tipoItem().trim(),dto.quantidade(),dto.pontoDestino().trim(),LocalDateTime.now());return DoacaoResponseDTO.fromEntity(repository.save(d));}
 public DoacaoResponseDTO editar(UUID id,DoacaoRequestDTO dto){Doacao d=repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Doação não encontrada"));d.setTipoItem(dto.tipoItem().trim());d.setQuantidade(dto.quantidade());d.setPontoDestino(dto.pontoDestino().trim());return DoacaoResponseDTO.fromEntity(repository.save(d));}
 public void excluir(UUID id){if(!repository.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Doação não encontrada");repository.deleteById(id);}
}
