package hugescrub.cafe.menu.security.services;

import hugescrub.cafe.menu.dto.ItemDto;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public void build (ItemDto itemDto){
        Item item = new Item();
        item.setName(itemDto.getName());
        item.setPrice(itemDto.getPrice());
        item.setItemType(itemDto.getItemType());
        itemRepository.save(item);
        log.info("New item added:\n" + item);
    }
}
