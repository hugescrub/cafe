package hugescrub.cafe.menu.security.services;

import hugescrub.cafe.menu.dto.MenuDto;
import hugescrub.cafe.menu.models.Menu;
import hugescrub.cafe.menu.repository.MenuRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MenuService {

    private final MenuRepository menuRepository;

    @Autowired
    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public void build (MenuDto menuDto){
        Menu menu = new Menu();
        menu.setType(menuDto.getType());
        menu.setTitle(menuDto.getTitle());
        menu.setAvailableFrom(menuDto.getAvailableFrom());
        menu.setAvailableUntil(menuDto.getAvailableUntil());
        menuRepository.save(menu);
        log.info("New menu added.\n" + menu);
    }
}
