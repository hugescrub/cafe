package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.repository.MenuRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuRepository menuRepository;

    @Autowired
    public MenuController(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @GetMapping("/all")
    public List<Menu> getMenus(Authentication authentication) {
        log.info("Accessing endpoint with authorities: " + authentication.getAuthorities());
        return menuRepository.findAll();
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getByTitle(@PathVariable String title) {
        Menu menu = menuRepository.findByTitle(title);
        return ResponseEntity
                .ok()
                .body(menu);
    }
}
