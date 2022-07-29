package hugescrub.cafe.menu.controllers;

import hugescrub.cafe.menu.dto.ItemDto;
import hugescrub.cafe.menu.models.EItem;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.payload.response.MessageResponse;
import hugescrub.cafe.menu.repository.ItemRepository;
import hugescrub.cafe.menu.repository.MenuRepository;
import hugescrub.cafe.menu.security.services.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/items")
public class ItemController {

    private final MenuRepository menuRepository;

    private final ItemRepository itemRepository;

    private final ItemService itemService;

    @Autowired
    public ItemController(MenuRepository menuRepository, ItemRepository itemRepository, ItemService itemService) {
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public List<Item> getItems(){
        return itemRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem (@RequestBody ItemDto itemDto){
        if (!itemRepository.existsByName(itemDto.getName())){
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

    @GetMapping("/{itemType}")
    public ResponseEntity<?> getItemsByTitle(@PathVariable String itemType){
        if(itemRepository.existsByItemType(EItem.valueOf(itemType))){
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
}
