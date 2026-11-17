package br.com.institutomaoamiga.api.controller;

import br.com.institutomaoamiga.api.dto.*;
import br.com.institutomaoamiga.api.service.PontoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pontos")
@CrossOrigin(origins = "*")
public class PontoController {

    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    @GetMapping("/filtro")
    public Page<PontoResponseDTO> filtrar(
            @RequestParam(required = false) String filtro,
            @PageableDefault(size = 10, sort = "nome", direction = Sort.Direction.ASC) Pageable pageable) {
        return service.filtrar(filtro, pageable);
    }

    @GetMapping
    public java.util.List<PontoResponseDTO> listar() {
        return service.filtrar("", Pageable.unpaged()).getContent();
    }

    @GetMapping("/{id}")
    public PontoResponseDTO buscar(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PontoResponseDTO cadastrar(@Valid @RequestBody PontoRequestDTO dto) {
        return service.cadastrar(dto);
    }

    @PutMapping("/{id}")
    public PontoResponseDTO editar(@PathVariable UUID id, @Valid @RequestBody PontoRequestDTO dto) {
        return service.editar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }
}