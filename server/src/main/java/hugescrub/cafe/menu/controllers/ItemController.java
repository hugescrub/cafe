package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.dto.ItemDto;
import hugescrub.cafe.menu.models.EItem;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.payload.response.MessageResponse;
import hugescrub.cafe.menu.repository.ItemRepository;
import hugescrub.cafe.menu.repository.MenuRepository;
import hugescrub.cafe.menu.security.services.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/items")
public class ItemController {
    private final ItemRepository itemRepository;

    private final MenuRepository menuRepository;

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemRepository itemRepository, ItemService itemService, MenuRepository menuRepository) {
        this.itemRepository = itemRepository;
        this.itemService = itemService;
        this.menuRepository = menuRepository;
    }

    @GetMapping("/all")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getNotAddedItems(@RequestParam(value = "menuTitle") String menuTitle) {
        if (menuRepository.existsByTitle(menuTitle)) {
            Menu menu = menuRepository.findByTitle(menuTitle);
            // get menu items
            List<Item> menuItems = menu.getItems();
            // get all items list, remove matching items and return new list
            List<Item> itemList = itemRepository.findAll();
            log.info("Initial item list" + itemList);
            boolean removeAll = itemList.removeAll(menuItems);
            log.warn("The result of removal is:" + removeAll + "\nPending items: " + itemList);
            return ResponseEntity
                    .ok()
                    .body(itemList);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to send request: menu title not found."));
        }
    }

    @GetMapping
    public ResponseEntity<?> getItemById(@RequestParam(value = "id") Long itemId) {
        if (itemRepository.existsById(itemId)) {
            Item item = itemRepository.findById(itemId).get();
            log.info("Requested item with id: " + itemId);
            return ResponseEntity
                    .ok()
                    .body(item);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Nothing found with id: " + itemId));
        }
    }

    @GetMapping("/{itemType}")
    public ResponseEntity<?> getItemsByType(@PathVariable String itemType) {
        try {
            EItem type = EItem.valueOf(itemType.toUpperCase());
            if (itemRepository.existsByItemType(type)) {
                List<Item> items = itemRepository.findAllByItemType(type);
                log.info("Requested all items with item type: " + itemType);
                return ResponseEntity
                        .ok()
                        .body(items);
            } else {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Nothing found with item type: " + itemType));
            }
        } catch (IllegalArgumentException e) {
            log.warn(e.getMessage());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Illegal item type."));
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> addItem(@RequestBody ItemDto itemDto) {
        if(itemDto.getPrice() <= 0) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Invalid item price."));
        }
        if (!itemRepository.existsByName(itemDto.getName())) {
            itemService.build(itemDto);
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("New item added successfully."));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Item with such name already exists."));
        }
    }

    @DeleteMapping("/remove/{item_id}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> removeItem(@PathVariable Long item_id) {
        if (itemRepository.existsById(item_id)) {
            Item item = itemRepository.findById(item_id).get();
            itemService.remove(item);
            log.info("An item was removed successfully.");
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Successfully removed an item with id: " + item_id));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Unable to remove an item with id: " + item_id + ". Id not found."));
        }
    }
}
