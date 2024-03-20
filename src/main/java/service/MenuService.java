package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Menu;
import com.example.repository.MenuRepository;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    public Menu getView(String v){
        return menuRepository.getView(v);
    }
}
