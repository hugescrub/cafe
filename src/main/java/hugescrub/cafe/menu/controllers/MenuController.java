package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.dto.MenuDto;
import hugescrub.cafe.menu.models.EType;
import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.payload.response.MenuUpdateResponse;
import hugescrub.cafe.menu.payload.response.MessageResponse;
import hugescrub.cafe.menu.repository.MenuRepository;
import hugescrub.cafe.menu.security.services.MenuService;
import lombok.extern.slf4j.Slf4j;
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
    private final MenuService menuService;

    @Autowired
    public MenuController(MenuRepository menuRepository, MenuService menuService) {
        this.menuRepository = menuRepository;
        this.menuService = menuService;
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
     * Getting only those menus available between specific time (Ex. 08:00, 10:00 etc).
     *
     * @param menuDto request DTO.
     *
     * @return returns list for all corresponding entries.
     */
    @GetMapping("/available")
    public ResponseEntity<?> getByTimeAvailable(@RequestBody MenuDto menuDto) {
        try {
            List<Menu> menuList = menuRepository.findByAvailableFromGreaterThanEqualAndAvailableUntilLessThanEqual(menuDto.getAvailableFrom(), menuDto.getAvailableUntil());
            log.info("Queried menu list:\n" + menuList.toString());
            return ResponseEntity
                    .ok()
                    .body(menuList);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Nothing was found with time provided."));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMenu(@RequestBody MenuDto menuDto) {
        if (!menuRepository.existsByTitle(menuDto.getTitle())) {
            menuService.build(menuDto);
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("New menu added successfully."));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body("Menu with such title already exists.");
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateMenu(@RequestBody MenuDto menuDto) {

        String title = menuDto.getTitle(); // title is never changed
        // fields to be updated
        EType newType = menuDto.getType();
        LocalTime newFrom = menuDto.getAvailableFrom();
        LocalTime newUntil = menuDto.getAvailableUntil();

        if (menuRepository.existsByTitle(title)){
            menuService.update(menuDto);
            return ResponseEntity
                    .ok()
                    .body(new MenuUpdateResponse(newType, title, newFrom, newUntil));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to update menu: title doesn't exist." ));
        }
    }
}
