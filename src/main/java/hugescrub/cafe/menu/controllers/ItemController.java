package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.dto.ItemDto;
import hugescrub.cafe.menu.models.EItem;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.payload.response.MessageResponse;
import hugescrub.cafe.menu.repository.ItemRepository;
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

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemRepository itemRepository, ItemService itemService) {
        this.itemRepository = itemRepository;
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{itemType}")
    public ResponseEntity<?> getItemsByTitle(@PathVariable String itemType) {
        if (itemRepository.existsByItemType(EItem.valueOf(itemType))) {
            List<Item> items = itemRepository.findAllByItemType(EItem.valueOf(itemType));
            return ResponseEntity
                    .ok()
                    .body(items);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Nothing found with item type: " + itemType));
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> addItem(@RequestBody ItemDto itemDto) {
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
