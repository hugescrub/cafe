package hugescrub.cafe.menu.security.services;

import hugescrub.cafe.menu.dto.MenuDto;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.repository.ItemRepository;
import hugescrub.cafe.menu.repository.MenuRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public MenuService(MenuRepository menuRepository, ItemRepository itemRepository) {
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
    }

    public void build(MenuDto menuDto) {
        Menu menu = new Menu();
        menu.setType(menuDto.getType());
        menu.setTitle(menuDto.getTitle());
        menu.setAvailableFrom(menuDto.getAvailableFrom());
        menu.setAvailableUntil(menuDto.getAvailableUntil());
        menu.setActive(true);
        menu.setImage(menuDto.getImage());
        menuRepository.save(menu);
        log.info("New menu added.\n" + menu);
    }

    public void update(MenuDto menuDto) {
        // get menu and item objects
        Menu menu = menuRepository.findByTitle(menuDto.getTitle());

        // set new fields for existing menu
        menu.setType(menuDto.getType());
        menu.setAvailableFrom(menuDto.getAvailableFrom());
        menu.setAvailableUntil(menuDto.getAvailableUntil());
        menu.setImage(menuDto.getImage());

        // save updated menu
        menuRepository.save(menu);
        log.info("Menu updated: " + menu.getTitle() + "\n" + menu);
    }

    public void addItem(String itemName, String menuTitle) throws DataIntegrityViolationException {
        // get menu and item objects
        Menu menu = menuRepository.findByTitle(menuTitle);
        Item item = itemRepository.findByName(itemName);

        // add a new item for existing menu
        menu.getItems().add(item);
        menuRepository.save(menu);
        log.info("An item with id: '" + item.getId() +
                "'. Was successfully added to the menu with id: '" + menu.getId() + "'.");
    }
}
