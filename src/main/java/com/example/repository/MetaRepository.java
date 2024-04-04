package com.example.repository;
import com.example.entities.Meta;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MetaRepository {
    @Autowired
    private MetaCRUDRepository metaCRUDRepository;

    public List<Meta> getAllMetas(){
        return metaCRUDRepository.findAll();
    }

    public Meta save(Meta meta) {
        if (meta == null) {
            throw new IllegalArgumentException("El objeto Meta no puede ser nulo.");
        }
        return metaCRUDRepository.save(meta);
    }

    public Meta getMetaById(Long id){
        if (id == null) {
            throw new IllegalArgumentException("El id no puede ser nulo.");
        }
        return metaCRUDRepository.findById(id).orElse(null);
    }
    
}  
