package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.dto.MenuDto;
import hugescrub.cafe.menu.models.EType;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.payload.request.AddItemRequest;
import hugescrub.cafe.menu.payload.response.MenuUpdateResponse;
import hugescrub.cafe.menu.payload.response.MessageResponse;
import hugescrub.cafe.menu.repository.ItemRepository;
import hugescrub.cafe.menu.repository.MenuRepository;
import hugescrub.cafe.menu.security.services.MenuService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    private final ItemRepository itemRepository;

    private final MenuService menuService;

    @Autowired
    public MenuController(MenuRepository menuRepository, MenuService menuService, ItemRepository itemRepository) {
        this.menuRepository = menuRepository;
        this.menuService = menuService;
        this.itemRepository = itemRepository;
    }

    @GetMapping("/all")
    public List<Menu> getAllMenus(Authentication authentication) {
        return menuRepository.findAll();
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getMenuByTitle(@PathVariable String title) {
        if (menuRepository.existsByTitle(title)) {
            Menu menu = menuRepository.findByTitle(title);
            log.info("Requested menu info with title: " + title);
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

    @GetMapping("/active/{active_flag}")
    public List<Menu> getByActiveFlag(@PathVariable Boolean active_flag) {
        return menuRepository.findAllByIsActive(active_flag);
    }

    @GetMapping
    public List<Menu> getAllActiveByType(@RequestParam(value = "type") EType type) {
        return menuRepository.findAllByIsActiveAndType(true, type);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
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
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> updateMenu(@RequestBody MenuDto menuDto) {
        String title = menuDto.getTitle(); // title is never changed

        // fields to be updated
        EType newType = menuDto.getType();
        LocalTime newFrom = menuDto.getAvailableFrom();
        LocalTime newUntil = menuDto.getAvailableUntil();

        if (menuRepository.existsByTitle(title)) {
            menuService.update(menuDto);
            return ResponseEntity
                    .ok()
                    .body(new MenuUpdateResponse(newType, title, newFrom, newUntil));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to update menu: title doesn't exist."));
        }
    }

    @PatchMapping("/addItem")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> addItemToMenu(@RequestBody AddItemRequest request) {
        // item we're adding to menu
        String itemName = request.getItemName();

        // menu to which we're adding an item
        String menuTitle = request.getMenuTitle();

        if (menuRepository.existsByTitle(menuTitle) && itemRepository.existsByName(itemName)) {
            try {
                menuService.addItem(itemName, menuTitle);
                return ResponseEntity
                        .ok()
                        .body(new MessageResponse("New item added to the menu successfully."));
            } catch (DataIntegrityViolationException e) {
                log.warn("Failed to add an item to the menu.");
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Declined: the item is already added to the menu."));
            }
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to add item to menu: either menu title or item name doesn't exist."));
        }
    }

    @PatchMapping("/addItemList/{menuTitle}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> addItemListToMenu(@PathVariable String menuTitle, @RequestBody List<Item> itemList) {
        if (menuRepository.existsByTitle(menuTitle)) {
            menuService.addItemList(itemList, menuTitle);
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Item list added to the menu successfully."));
        } else {
            log.warn("Failed to add an item list to the menu.");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to add item to menu: either menu title or item name doesn't exist."));
        }
    }

    @PatchMapping("/archive/{menuTitle}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> archiveMenu(@PathVariable String menuTitle) {
        if (menuRepository.existsByTitle(menuTitle)) {
            // get menu object and set ACTIVE flag to false
            Menu menu = menuRepository.findByTitle(menuTitle);
            menu.setActive(false);

            // save updated menu
            menuRepository.save(menu);
            log.info("Successfully archived menu with id: " + menu.getId());
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Successfully archived menu: '" + menuTitle + "'."));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to archive menu: title doesn't exist."));
        }
    }

    @PatchMapping("/unarchive/{menuTitle}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> unarchiveMenu(@PathVariable String menuTitle) {
        if (menuRepository.existsByTitle(menuTitle)) {
            // get menu object and set ACTIVE flag to true
            Menu menu = menuRepository.findByTitle(menuTitle);
            menu.setActive(true);

            // save updated menu
            menuRepository.save(menu);
            log.info("Successfully unarchived menu with id: " + menu.getId());
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Successfully unarchived menu: '" + menuTitle + "'."));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to unarchive menu: title doesn't exist."));
        }
    }
}
