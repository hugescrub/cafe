package hugescrub.cafe.menu.security.services;

import hugescrub.cafe.menu.dto.ItemDto;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.repository.ItemRepository;
import hugescrub.cafe.menu.repository.MenuRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
public class ItemService {
    private final ItemRepository itemRepository;

    private final MenuRepository menuRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository, MenuRepository menuRepository) {
        this.itemRepository = itemRepository;
        this.menuRepository = menuRepository;
    }

    public void build(ItemDto itemDto) {
        Item item = new Item();
        item.setName(itemDto.getName());
        item.setPrice(itemDto.getPrice());
        item.setItemType(itemDto.getItemType());
        item.setDescription(itemDto.getDescription());
        item.setImage(itemDto.getImage());
        itemRepository.save(item);
        log.info("New item added:\n" + item);
    }

    /**
     * Since Menu & Item have a bidirectional relation, when we remove an item, we also need to remove the relation between them.
     * To remove item completely, we have to remove this item from matching menus first.
     * @param item Is an item we wish to remove.
     */
    public void remove(Item item) {
        // get menu list
        List<Menu> menuList = menuRepository.findAllByItems(item);
        for (Menu menu : menuList) {

            // get menu's itemList
            List<Item> itemList = menu.getItems();
            // remove required item
            itemList.removeIf(requiredItem -> requiredItem.equals(item));
        }
        log.info("Removing item with id: " + item.getId());
        itemRepository.delete(item);
    }
}
