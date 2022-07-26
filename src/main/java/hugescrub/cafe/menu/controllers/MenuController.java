package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.payload.response.MessageResponse;
import hugescrub.cafe.menu.repository.MenuRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
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
    public List<Menu> getAllMenus(Authentication authentication) {
        log.info("Accessing endpoint with authorities: " + authentication.getAuthorities());
        return menuRepository.findAll();
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getByTitle(@PathVariable String title) {
        if (menuRepository.existsByTitle(title)) {
            Menu menu = menuRepository.findByTitle(title);
            return ResponseEntity
                    .ok()
                    .body(menu);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Nothing was found with such title."));
        }
    }

    /**
     * Getting only those menus available starting from specific time (Ex. 08:00, 10:00 etc).
     *
     * @param availableFrom request field, String data type is applied since
     *                      LocalTime is not applicable due to serialization problems.
     *
     * @return returns list for all corresponding entries.
     */
    @GetMapping("/available")
    public ResponseEntity<?> getByAvailableFrom(@RequestBody String availableFrom) {
        LocalTime time = LocalTime.parse(new JSONObject(availableFrom).getString("availableFrom"));
        if (menuRepository.existsByAvailableFrom(time)) {
            List<Menu> menuList = menuRepository.findByAvailableFrom(time);
            return ResponseEntity
                    .ok()
                    .body(menuList);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Nothing was found with time provided."));
        }

    }
}
